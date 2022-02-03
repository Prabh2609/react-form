import React from 'react';
import { Form } from '../Component/Form';
import Header from '../Component/Header';
import { JobDescription } from '../Component/JobDescription';

export const HomePage:React.FC=():JSX.Element=>{
    return(
        <>
            <Header/>
            <JobDescription/>
            <Form/>
        </>
        
    )
}