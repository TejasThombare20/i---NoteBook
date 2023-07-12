import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


function BasicExample(props) {
  const [credential, setCredential] = useState({ name: "", email: "", password: "", confirmPassword: "", })
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const { email, name, password } = credential;
    const response = await axios.post(`http://localhost:5001/api/auth/createuser`, 
      JSON.stringify({name, email, password}), {
      headers: {
        Accept: '*/*',
        "Content-Type": "application/json; charset=UTF-8",
        
      },
     
    });

    // const json = await response.json();
    // console.log(json)
    const authtoken = response.data.authtoken
     localStorage.setItem('token',authtoken)
     navigate("/login")
     props.showAlert("you have signUp successfully","success")
  }



const onChange = (e) => {
  setCredential({ ...credential, [e.target.name]: e.target.value })

}
return (
  <>
  <h2 className="mt-3">create an account to continue with the iNotenbook</h2>
  <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3">
      <Form.Label htmlFor='name'>Name</Form.Label>
      <Form.Control id='name' type="text" name='name' value={credential.name} onChange={onChange} placeholder="Enter name" />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label htmlFor='email '>Email address</Form.Label>
      <Form.Control id='email' type="email" name='email' value={credential.email} onChange={onChange} placeholder="Enter email" />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label htmlFor='password'>Password</Form.Label>
      <Form.Control id='password' type="password" name='password' value={credential.password} onChange={onChange} placeholder="Password" />
      <Form.Text className="text-muted">
        password length must be at least 8 characters
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label htmlFor='confirmPassword'>Confirm Password</Form.Label>
      <Form.Control id='confirmPassword' type="password" name='confirmPassword' value={credential.confirmPassword} onChange={onChange} placeholder=" confirm Password" />
      <Form.Text className="text-muted">
      both password must be same
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  </>
);
}


export default BasicExample;

