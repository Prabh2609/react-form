import React from 'react';
import styled from 'styled-components';
import { ActionButton } from './ActionButton';
import { Row } from './Row';

const Container = styled.div`
    width:100%;
    min-height:100vh;
    padding-bottom:50px;
    background-color:#f9f9f9;
    box-sizing:border-box;
    font:normal 400 16px/1.8 Lato;
    color:#515357;
`

const FormContainer = styled.form`
    width:50%;
    margin-left:auto;
    margin-right:auto;
`
const Heading = styled.h4`
    color:#515357;
    letter-spacing:1px;
    font:normal 700 16px/1.4 Lato;
    text-transform:uppercase;
    text-align:left;
    padding-top:50px;
    padding-bottom:30px;
    width:fit-content;
`
const Partition = styled.hr`
    border:.5px solid #e3e4e6;
    font:normal 400 16px/1.8 Lato;
    color:#515357;
    padding:0px;
    margin-top:50px;
`
const Description = styled.p`
    text-align:left;

`

const gender=['Select ...' ,'Male','Female','Decline to self identify']
const race=['Select ...','Hispanic or Latino','White (Not Hispanic or Latino)','Black or African American (Not Hispanic or Latino)','Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)','Asian (Not Hispanic or Latino)','American Indian or Alaska Native (Not Hispanic or Latino)','Two or More Races (Not Hispanic or Latino)']
const vet=['Select ... ','I am a veteran','I am not a verteran','Decline to self identify']

export const Form=()=> {
  return (
    <Container>
        <FormContainer>
            <Heading>Submit your application</Heading>
            
            <Row content='Resume/CV' required={true} inputType='file'/>
            <Row content='Full name' required={true} inputType='text'/>
            <Row content='Email' inputType='email' required={true}/>
            <Row content='Phone' inputType='tel' required={true}/>
            <Row content='Current Company' inputType='text'/>

            <Heading>Links</Heading>

            <Row content='LinkedIn URL ' inputType='url'/>
            <Row content='Twitter URL' inputType='url'/>
            <Row content='Github URL' inputType='url'/>
            <Row content='Portfolio URL' inputType='url'/>
            <Row content='Other Website' inputType='url'/>

            <Heading>Preferred Pronouns</Heading>
                <Row content='If youd like, please share your pronouns with us.' inputType='full-width' placeholder='Type Your Response'/>
            
            <Heading>Additional Information</Heading>
            <Row inputType='text-area' placeholder='Add a cover letter or anything else you want to share'/>

            <Partition/>
            
            <Description>
                Our company values diversity. To ensure that we comply with reporting requirements and to learn more about how
                we can increase diversity in our candidate pool, we invite you to voluntarily provide demographic information in
                a confidential survey at the end of this application. Providing this information is optional. It will not be
                accessible or used in the hiring process, and has no effect on your opportunity for employment.
            </Description>

            <Row content='Gender' inputType='select' values={gender}/>
            <Row content='Race' inputType='select' values={race}/>
            <Row content='Veteran Status' inputType='select' values={vet}/>
            <ActionButton/>
        </FormContainer>
    </Container>
  );
}
