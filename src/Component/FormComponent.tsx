import React, { useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';

interface Props{
    type:string;
    label:string;
    style?:string;
    placeholder?:string;
    register?:UseFormRegister<FieldValues>;
    error?:{[key: string]: any};
    
}

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
    width:250px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    height:45px;
    text-transform:uppercase;
`
const Icon = styled.i`
    color:#515357;
    margin-right:13px;
`

const Column = styled.div`
    width:70%;
    display:flex;
    flex-direction:column;
    text-align:left;
    box-sizing:border-box;
    @media (max-width:768px){
        width:-webkit-fill-available;
    }
`
const Error = styled.p`
    color:red;
    float:right;
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
    width:95%;
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
    @media (max-width:768px){
        width:-webkit-fill-available;
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
const ResumeInput=styled.input`
    width:250px;
    opacity:0;
    height:45px;
    position:absolute;
    left:0px;
    cursor:pointer;
`
const checkRequired =(label:string):boolean=>{
    switch(label){
        case 'Full Name':
        case 'Resume/CV':
        case 'Email':
                return true;
    }
    return false;
}

const getValidation = (label:string)=>{
    var obj: {[key: string]: any} = {};
    switch(label){
        case 'Full Name':
            obj.required = true;
            obj.minLength = 10;
            obj.pattern = /[a-zA-Z][a-zA-Z ]+/
            return obj;
        case 'Email':
            obj.required = true;
            obj.pattern=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            return obj;
        case 'Phone':
            obj.pattern=/(\+[\d]{1,5}|0)[7-9]\d{9}$/
            obj.required=true
            return obj;
        case 'LinkedIn URL' :
            obj.pattern=/((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/
            return obj;
            
        default : return obj;
    }
}


const toPascalCase = (sentence:string) => sentence
   .split(' ')
   .map(word => word[0]
   .toUpperCase()
   .concat(word.slice(1)))
   .join('');

export const FormComponent:React.FC<Props> = ({type,label,style,placeholder,register,error}):JSX.Element=> {
    const Row = styled.div`
    display:flex;
    width:100%;
    margin-left:auto;
    margin-right:auto;
    margin-top:16px;
    margin-bottom:28px;
    box-sizing:border-box;
    ${style}
    @media (max-width:768px){
        flex-direction:column;
    }
`   
    
    const [resumeLabel,setResumeLabel] = useState('Attach Resume/CV')
    const [resumeError,setResumeError] = useState('null')

    const onInputChange=(e:React.FormEvent<HTMLInputElement>)=>{
        if(e.currentTarget.files && e.currentTarget.files[0]){
            if(e.currentTarget.files[0].size > 5*1024*1024)
                setResumeError('File size should be less than 5MB')
            else if(e.currentTarget.files[0].type != 'application/pdf')
                setResumeError('Only pdf format is supported')
            else{
                setResumeError('null')
            }
            setResumeLabel(e.currentTarget.files[0].name)
        }else{
            setResumeError('This File is required')
        }
    }
    return( 
        
        <Row>
            <Content>
                {label}
                {checkRequired(label)?<Required>✱</Required>:null}
            </Content>
            {
                label==='Resume/CV'?
                <Column>
                    <FileUploadWrapper>
                        <UploadButton disabled><Icon className='fas fa-paperclip'/>{resumeLabel}</UploadButton>
                        <ResumeInput onInput={(e)=>onInputChange(e)} type='file' accept='application/pdf'  {...register?{...register('Resume')}:null} />
                        
                    </FileUploadWrapper>
                        {
                            resumeError != 'null' && <Error>{resumeError}</Error>
                        }
                        
                </Column>
                :
                <Column>         
                    <Input { ...register?{...register(toPascalCase(label),getValidation(label))}:null } type={type} placeholder={placeholder} />
                    {error?error[toPascalCase(label)]?.type === 'required' && <Error>This Field is required</Error>:null}
                    {error?error[toPascalCase(label)]?.type === 'pattern' && <Error>{label==='Phone'?`Invalid Phone number,Add country code`:`Invalid ${label}`}</Error>:null}
                    {error?error[toPascalCase(label)]?.type === 'minLength' && <Error>Value cant be less than 10 characters</Error>:null}
                </Column>
            }
            
        </Row>
  );
}

