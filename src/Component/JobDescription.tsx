import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width:70%;
    height:fint-content;
    font-family: 'Lato', sans-serif;
    line-height:1.4;
    text-align:left;
    padding:50px;
    margin-top:25px;
    margin-left:auto;
    margin-right:auto;
`
const Heading = styled.h2`
    font-size:36px;
    color:#515357;
    text-align:left;
`
const Description = styled.p`
    color:#808080;
`
export const JobDescription:React.FC=():JSX.Element=>{
    return(
        <Container>
            <Heading>
                Full-Stack Engineer
            </Heading>
            <Description>
            REMOTE OPTIONAL /PRODUCT – ENGINEERING /FULL-TIME
            </Description>
        </Container>
    )
}