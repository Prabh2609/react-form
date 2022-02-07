import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    background-color:#4f65f1;
    border-color:#4b60e5;
    color:white;
    font:normal 700 14px/1.4 Lato;
    text-transform:uppercase;
    letter-spacing:2px;
    line-height:1.3;
    padding:10px 15px;
    text-align:center;
    border:1px solid #dcdcdc;
    cursor:pointer;
    outline:none;
    border-radius:3px;
    &:hover{
        background-color:#4b60e5;
    }
`


export const  ActionButton:React.FC=():JSX.Element=> {
  return (
      <Button type='submit'>Submit Application</Button>
  )
}
