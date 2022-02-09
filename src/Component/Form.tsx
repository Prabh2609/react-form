import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { FormComponent } from './FormComponent';
import ReCAPTCHA from 'react-google-recaptcha';
import { addDoc, collection, doc, documentId, setDoc } from 'firebase/firestore';
import { db, storage } from '../Utils/Firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { UUID } from 'uuid-generator-ts';


const Row = styled.div`
    display:flex;
    width:100%;
    margin-left:auto;
    margin-right:auto;
    margin-top:16px;
    margin-bottom:16px;
    box-sizing:border-box;
    @media (max-width:768px){
        flex-direction:column;
    }
`

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

const Column = styled.div`
    width:70%;
    flex-direction:column;
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
    box-sizing:border-box;
    @media (max-width:768px){
        width:90%;
    }
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


const TextArea = styled.textarea`
    line-height:1.8;
    width:-webkit-fill-available;
    min-height:120px;
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
@media (max-width:768px){
    width:-webkit-fill-available;
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
const RecaptchaContainer=styled.div`
    width:fit-content;
    margin:32px auto;
    display:block;
    height:120px;
`

const gender=['Male','Female','Decline to self identify']
const race=['Hispanic or Latino','White (Not Hispanic or Latino)','Black or African American (Not Hispanic or Latino)','Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)','Asian (Not Hispanic or Latino)','American Indian or Alaska Native (Not Hispanic or Latino)','Two or More Races (Not Hispanic or Latino)']
const vet=['I am a veteran','I am not a verteran','Decline to self identify']

const rowCustomStyle = `flex-direction:column;& div{width:-webkit-fill-available;}  `



export const Form=()=> {

    const {register,handleSubmit,formState:{errors}} = useForm();
    
    const [captchaVerify,setCaptchaVerify] = useState(false);
    const [raceDescription,setRaceDescription] = useState(false);

    const addData=(data:{[x: string]: any})=>{
        
        if(data.Resume && data.Resume[0]){
            if(data.resume[0].size>5*1024*1024){
                alert('File Size is too large')
                return;
            }
        }else{
            return;
        }
        

        const storageRef=ref(storage,new UUID().getDashFreeUUID())
        const uploadTask = uploadBytesResumable(storageRef,data.Resume[0])
        
        uploadTask.on('state_changed',
            (snapshot)=>{
                const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                console.log("upload is "+progress+"% done")
                switch(snapshot.state){
                    case 'paused':console.log('upload paused')
                                break;
                    case 'running':console.log('upload is running')
                                break
                        
                }
            },
            (error)=>{
                console.log('something went wrong')
                console.log(error)
            },()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    data.Resume=downloadURL;
                    addDoc(collection(db,'candidates'),data)
                        .then(()=>{
                            alert('added to database')
                            
                        }).catch((e)=>{
                            alert("error"+e)
                            const deleteRef = ref(storage,downloadURL)
                            deleteObject(deleteRef)
                        })
                    
                    });
            }
        )
    }



  return (
    <Container>
        <FormContainer onSubmit={handleSubmit((data)=>{
            if(Object.keys(errors).length == 0){                
                addData(data)
            }
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
                        <option value=''>Select ... </option>
                        {gender.map(item=><option value={item}>{item}</option>)}
                    </DropDown>
                    {errors?.Gender && <Error>Select Gender Value</Error>}
                </Column>
            </Row>
            <Row>
                <Content>Race <Info className='fas fa-info-circle'  onClick={()=>setRaceDescription(!raceDescription)} /> </Content>
                <Column>
                    <DropDown {...register('Race')}>
                        <option value=''>Select ...</option>
                        {race.map(item=><option value={item}>{item}</option>)}
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
                        <option value=''>Select ... </option>
                        {vet.map(item=><option value={item}>{item}</option>)}
                    </DropDown>
                    
                </Column>
            </Row>

            <RecaptchaContainer>
                <ReCAPTCHA
                    sitekey='6LdWHmUeAAAAAPyHlfKyffhTuD8HUy3uZ_cmZkEX'
                    onChange={()=>setCaptchaVerify(true)}
                    onErrored={()=>setCaptchaVerify(false)}
                />
                {
                    Object.keys(errors).length>0 && !captchaVerify && <Error>Please Select Captcha</Error>    
                }
                
            </RecaptchaContainer>
            

            
        <Button type='submit'>Submit Application</Button>
        </FormContainer>
    </Container>
  );
}