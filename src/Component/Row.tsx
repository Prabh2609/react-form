import React from 'react';
import styled from 'styled-components';

const RowContainer = styled.div`
    display:flex;
    justify-content:space-between;
    flex-wrap:wrap;
    margin-left:auto;
    margin-right:auto;
    margin-top:16px;
    margin-bottom:16px;
    box-sizing:border-box;
`
interface Props{
    content?:string;
    inputType?:string;
    required?:boolean;
    placeholder?:string;
    values?:string[];
    
}

const Content = styled.p`
    font:normal 400 16px/1.8 Lato;
    line-height:1.4px;
    color:#515357;
    position:relative;
`
const Input = styled.input`
    line-height:1.8;
    margin-top:6px;
    margin-bottom:6px;
    width:65%;
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
background:#c0c0c0;
&:focus{
    outline:none;
    border-color:#7f838a;
}
`
const getInput=(inputType?:string,placeholder?:string,required?:boolean,values?:string[])=>{
    switch(inputType){
        case 'text':
        case 'email':
        case 'tel':
        case 'url':
            return <Input required={required}/>
        case 'full-width':
            return <Input type='text' placeholder={placeholder} />
        case 'text-area':
            return <TextArea placeholder={placeholder}/>
        case 'select':
            return <DropDown>
                    {
                        values?.map(item=><option>{item}</option>)
                    }
                </DropDown>

    }
}

export const Row:React.FC<Props>=({content,inputType,required,placeholder,values}):JSX.Element=> {
  return (
        <RowContainer>
            {content?<Content>
                {content}
                {
                    required?<Required>✱</Required>:null
                }
                
            </Content>:null
            }
            
            {
                getInput(inputType,placeholder,required,values)
            }
            
            
            
        </RowContainer>
    );
}
