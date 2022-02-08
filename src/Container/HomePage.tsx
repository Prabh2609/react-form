import React from 'react';
import { Footer } from '../Component/Footer';
import { Form } from '../Component/Form';
import Header from '../Component/Header';
import { JobDescription } from '../Component/JobDescription';

export const HomePage:React.FC=():JSX.Element=>{
    return(
        <>
            <Header/>
            <JobDescription/>
            <Form/>
            <Footer/>
        </>
        
    )
}