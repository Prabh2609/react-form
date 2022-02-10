import { stringify } from "@firebase/util";
import { readBuilderProgram } from "typescript";
import axios from "axios";


const Server_URL = 'http://localhost:1337/api/';



export const uploadData=async(s:{[k:string]:any})=>{
    
    let data = new FormData()
    data.append('files',s.Resume[0])

    const  upload_resume = await axios({
        method:"POST",
        url:'http://localhost:1337/api/upload',
        data:data
    })
    s.Resume = upload_resume.data[0]
    uploadForm(s)
    
}

const uploadForm=async(d:{[k:string]:any})=>{

    var s: {[key: string]: any} = {};
    s.data = d;
    
    const upload_status = await axios({
        method:"POST",
        url:'http://localhost:1337/api/forms',
        data:s
    })
    if(upload_status.status == 200)
        alert('SUBMITTED SUCCESSFULLY')
    else 
        alert('OOPS !! Something went wrong')
}