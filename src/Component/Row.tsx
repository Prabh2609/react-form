import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import { Validation } from '../Utils/Validation';

const RowContainer = styled.div`
    display:flex;
    width:100%;
    flex-wrap:wrap;
    margin-left:auto;
    margin-right:auto;
    margin-top:16px;
    margin-bottom:16px;
    box-sizing:border-box;
`
const Content = styled.p`
    font:normal 400 16px/1.8 Lato;
    line-height:1.4px;
    color:#515357;
    position:relative;
    min-width:30%;
    text-align:left;
`
const Input = styled.input`
    line-height:1.8;
    margin-top:6px;
    min-width:65%;
    margin-bottom:6px;
    border-radius:3px;
    border-width:1px;
    border-color:#e2e2e2;
    color:#515357;
    font:normal 400 16px/1.8 Lato;
    border-style:solid;
    padding:4px 4px 4px 15px;
    &:focus{
        outline:none;
        border-color:#7f838a;
    }
`
const Required = styled.span`
    display: inline-block;
    color: #ff794f;
    margin-left: 4px;
    padding-bottom: 0px;
    position: absolute;
    top:-12px;
    font:normal 400 9px/1.8 Lato;
`
const TextArea = styled.textarea`
line-height:1.8;
margin-top:6px;
margin-bottom:6px;
width:100%;
border-radius:3px;
border-width:1px;
border-color:#e2e2e2;
color:#515357;
font:normal 400 16px/1.8 Lato;
border-style:solid;
padding:4px 4px 4px 15px;
&:focus{
    outline:none;
    border-color:#7f838a;
}
`
const FileUploadWrapper = styled.div`
    position:relative;
    float:left;
`
const UploadButton = styled.button`
    border:1px solid #e2e2e2;
    outline:none;
    cursor:pointer;
    color:#515357;
    background-color:#e2e2e2;
    font:normal 400 16px/1.8 Lato;
    letter-spacing:2px;
    line-height:1.3;
    padding:8px 15px;
    text-transform:uppercase;
`
const DropDown=styled.select`
line-height:1.8;
width:65%;
border-radius:3px;
border-width:1px;
border-color:#e2e2e2;
color:#515357;
font:normal 400 16px/1.8 Lato;
border-style:solid;
padding:4px 15px 4px 15px;
background:#e2e2e2;
&:focus{
    outline:none;
    border-color:#7f838a;
}
`
const Icon = styled.i`
    color:#515357;
    margin-left:13px;
    margin-right:13px;
`
interface Props{
    content?:string;
    inputType?:string;
    required?:boolean;
    placeholder?:string;
    values?:string[];
    name?:string;
    register?:UseFormRegister<FieldValues>;
}

const getInput=(inputType?:string,placeholder?:string,required?:boolean,values?:string[],register?:UseFormRegister<FieldValues>,name?:string)=>{
    switch(inputType){
        case 'text':
        case 'email':
        case 'tel':
        case 'url':
            return <Input type={inputType} required={required}  {...register? {...register(`${name}`,getValidation(name,required))}:null }/>
        case 'full-width':
            return <Input type='text' placeholder={placeholder} style={{width:'100%'}}/>
        case 'text-area':
            return <TextArea placeholder={placeholder}/>
        case 'select':
            return <DropDown>
                    {
                        values?.map(item=><option>{item}</option>)
                    }
                </DropDown>
        case 'file':
            return <FileUploadWrapper>
                <UploadButton onClick={()=>alert('hi')}><Icon className='fas fa-paperclip'/>Attach Resume/CV</UploadButton>
                <Input required={required} type='file' accept='application/pdf' style={{width:'92%',cursor:'pointer',opacity:0,position:'absolute',top:'-5px',left:'0px'}}/>
                
            </FileUploadWrapper> 
        default : return null
    }
}

const getValidation=(name?:string,required?:boolean)=>{
    var obj: {[key: string]: any} = {};
    obj.required=required
    switch(name){
        case 'full-name':
                obj.minLength=10
                break;
            
    }
    return obj;
}

export const Row:React.FC<Props>=({content,inputType,required,placeholder,values,register,name}):JSX.Element=> {
    const obj = getValidation(name,required);
    return (
        <RowContainer>
            {content?<Content>
                {content}
                {
                    required?<Required>✱</Required>:null
                }
                
            </Content>:null
            }
            
            {console.log(getValidation(name,required))}
            {
                getInput(inputType,placeholder,required,values,register,name)
                
            }
            
        </RowContainer>
    );
}
