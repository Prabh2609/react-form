import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    background:#edeef1;
    width:100%;
    color:#7f838a;
    height:40vh;
    padding-top:6%;
    box-sizing :border-box;
    @media (max-width:768px){
        height:20vh;
        
    }
`
const HomePage = styled.p`
    max-width:500px;
    text-decoration:underline;
    color:#579eee;
    cursor:pointer;
    margin:0px auto;
    margin-bottom:12px;
    &:hover{
        color:#4e8ed6;
    }
`
const Info = styled.span`

`
const Image = styled.img`
    position:relative;
    top:6px;
    height:24px;
`
export const  Footer:React.FC=():JSX.Element=> {
  return (
      <FooterContainer>
          
          <HomePage>Render Home page</HomePage>
            <Info>Jobs Powered by <Image src='https://jobs.lever.co/img/lever-logo-full.svg'/></Info>
            
      </FooterContainer>
  );
}

