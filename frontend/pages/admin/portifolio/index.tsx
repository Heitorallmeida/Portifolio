"use client"

import { ChangeEvent, FormEvent, useState } from "react";

const CreatePortifolio = ()=>{
    const [file,setFile] = useState<File | undefined>();
    const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        console.log(file)
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch(`http://localhost:3001/files`, {method: 'post', body: formData}).catch(()=>console.log('deu erro'))
    };
    return (
    <form onSubmit={handleSubmit}>
        <input 
            name='file' 
            type='file' 
            required 
            onChange={(e: ChangeEvent<HTMLInputElement>)=>{
                if(e.target.files){
                    setFile(e.target.files[0]);
                }
            }}
        />
        <button type="submit">Enviar</button>
    </form>
    )
}

export default CreatePortifolio;