import { useState } from 'react';
import React from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom'
function BasicExample(props) {
    const [credentials ,setCredentials ] = useState({email : "" , password: ""});
     let Navigate = useNavigate();

  const handleSubmit = async(e)=>{
           e.preventDefault();
         
           const response = await axios.post('http://localhost:5001/api/auth/login',
           JSON.stringify({email : credentials.email,password : credentials.password}),
           {headers: {
                       Accept: '*/*',
                      "Content-Type": "application/json",
                  },
                
             
           })
          const json = await response.data;
          console.log(json);

          if(json.success)
          {
            localStorage.setItem( "token" ,json.authtoken)
            props.showAlert("successfully logged in","success")
            Navigate("/home")

          }
          else
          {
            alert("invalid credential");
            props.showAlert("invalid Credential","danger")
           

          }
        }

      const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        }

  return (
    <>
    <h2 className="mt-3">Login to continue to iNotenbook</h2>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="email">Email address</Form.Label>
        <Form.Control id='email' type="email" name='email' value={credentials.email} onChange={onChange} placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label htmlFor='password'>Password</Form.Label>
        <Form.Control id='password' type="password" name='password' value={credentials.password} onChange={onChange}   placeholder="Password" />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </>
  );
}

export default BasicExample;