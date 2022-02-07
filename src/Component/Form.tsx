import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ActionButton } from './ActionButton';
import { FormComponent } from './FormComponent';


const Row = styled.div`
    display:flex;
    width:100%;
    margin-left:auto;
    margin-right:auto;
    margin-top:16px;
    margin-bottom:16px;
    box-sizing:border-box;
`
const Column = styled.div`
    width:70%;
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
const FlexContainer = styled.div`
    display:flex;
    background-color:red;
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
    }`
const TextArea = styled.textarea`
line-height:1.8;
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
width:95%;
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
const List = styled.ul`
text-align:left;
list-style:none;

`
const ListItem = styled.li`

`
const RaceDescription = styled.div`
color:#555659;
font-size:12px;
`
const Info = styled.i`
display: inline-block;
margin-left: 4px;
cursor:pointer;
padding-bottom: 0px;
position: absolute;
top:-12px;
font:normal 400 12px/1.8 Lato;
`

const gender=['Select ...' ,'Male','Female','Decline to self identify']
const race=['Select ...','Hispanic or Latino','White (Not Hispanic or Latino)','Black or African American (Not Hispanic or Latino)','Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)','Asian (Not Hispanic or Latino)','American Indian or Alaska Native (Not Hispanic or Latino)','Two or More Races (Not Hispanic or Latino)']
const vet=['Select ... ','I am a veteran','I am not a verteran','Decline to self identify']

const rowCustomStyle = `flex-direction:column;& div{width:100%;}`

export const Form=()=> {

    const {register,handleSubmit,watch,formState:{errors}} = useForm();

    const [raceDescription,setRaceDescription] = useState(false);

  return (
    <Container>
        <FormContainer onSubmit={handleSubmit((data)=>{
            console.log(data)
        })}>
            <Heading>Submit your application</Heading>
                <FormComponent type='file' label='Resume/CV' register={register} error={errors}/>
                <FormComponent type='text' label='Full Name' register={register} error={errors}/>
                <FormComponent type='email' label='Email' register={register} error={errors}/>
                <FormComponent type='text' label='Phone' register={register} error={errors}/>
                <FormComponent type='text' label='Current Company' register={register} error={errors}/>
                
            <Heading>Links</Heading>
                <FormComponent type='url' label='LinkedIn URL' register={register} error={errors}/>
                <FormComponent type='url' label='Twitter URL' register={register} error={errors}/>
                <FormComponent type='url' label='GitHub URL' register={register} error={errors}/>
                <FormComponent type='url' label='Portfolio URL'register={register} error={errors}/>
                <FormComponent type='url' label='Other website'register={register} error={errors}/>
            <Heading>Preferred Pronouns</Heading>
                <FormComponent type='text' style={rowCustomStyle} label='If youd like, please share your pronouns with us.' placeholder='Type Your response'/>
            {/* <Row content='Resume/CV' required={true} inputType='file'   /> */}
            
            <Heading>Additional Information</Heading>
                <TextArea placeholder='Add a cover letter or anything else you want to share' {...register('TextArea',{minLength:30})}/>
                {errors?.TextArea?.type==='minLength' && <Error>Min Length should be 30 characters</Error>}
            <Partition/>
            
            <Description><strong>U.S. EQUAL EMPLOYMENT OPPORTUNITY INFORMATION</strong>&ensp;&ensp;(Completion is voluntary and will not subject you to adverse treatment)</Description>
            <br/>

            <Description>
                Our company values diversity. To ensure that we comply with reporting requirements and to learn more about how
                we can increase diversity in our candidate pool, we invite you to voluntarily provide demographic information in
                a confidential survey at the end of this application. Providing this information is optional. It will not be
                accessible or used in the hiring process, and has no effect on your opportunity for employment.
            </Description>
            <Row>
                <Content>Gender</Content>
                <Column>
                    <DropDown {...register('Gender',{required:true})}>
                        {gender.map(item=><option>{item}</option>)}
                    </DropDown>
                    {errors?.Gender?.type==='required' && <Error>Select Gender Value</Error>}
                </Column>
            </Row>
            <Row>
                <Content>Race <Info className='fas fa-info-circle'  onClick={()=>setRaceDescription(!raceDescription)} /> </Content>
                <Column>
                    <DropDown {...register('Race',{required:true})}>
                        {race.map(item=><option>{item}</option>)}
                    </DropDown>
                    {
                        raceDescription?<List>
                        <ListItem>
                            <div>Hispanic or Latino</div>
                            <RaceDescription>
                                A person of Cuban, Mexican, Puerto Rican, South or Central American, or other Spanish culture or origin regardless of race.
                            </RaceDescription>
                        </ListItem>
                        <ListItem>
                            <div>White (Not Hispanic or Latino)</div>
                            <RaceDescription>
                                A person having origins in any of the original peoples of Europe, the Middle East, or North Africa.
                            </RaceDescription>
                        </ListItem>
                        <ListItem>
                            <div>Black or African American (Not Hispanic or Latino)</div>
                            <RaceDescription>
                                A person having origins in any of the black racial groups of Africa.
                            </RaceDescription>
                        </ListItem>
                        <ListItem>
                            <div>Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)</div>
                        <   RaceDescription>A person having origins in any of the peoples of Hawaii, Guam, Samoa, or other Pacific Islands.</RaceDescription>
                        </ListItem>
                        <ListItem>
                            <div>
                            Asian (Not Hispanic or Latino)
                            </div>
                            <RaceDescription>A person having origins in any of the original peoples of the Far East, Southeast Asia, or the Indian Subcontinent, including, for example, Cambodia, China, India, Japan, Korea, Malaysia, Pakistan, the Philippine Islands, Thailand, and Vietnam.</RaceDescription>
                        </ListItem>
                        <ListItem>
                            <div>American Indian or Alaska Native (Not Hispanic or Latino)</div>
                            <RaceDescription>A person having origins in any of the original peoples of North and South America (including Central America), and who maintain tribal affiliation or community attachment.</RaceDescription>
                        </ListItem>
                        <ListItem>
                            <div>Two or More Races (Not Hispanic or Latino)</div>
                            <RaceDescription>All persons who identify with more than one of the above five races.</RaceDescription>
                        </ListItem>
                    </List>:null
                    }
                    

                </Column>
            </Row>
            <Row>
                <Content>Veteran Status</Content>
                <Column>
                    <DropDown {...register('Vet')}>
                        {vet.map(item=><option>{item}</option>)}
                    </DropDown>
                    
                </Column>
            </Row>
{/* 
            
            <Row content='Gender' inputType='select' values={gender}/>
            <Row content='Race' inputType='select' values={race}/>
            <Row content='Veteran Status' inputType='select' values={vet}/> */}
            <ActionButton/>
        </FormContainer>
    </Container>
  );
}
