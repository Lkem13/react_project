import { SyntheticEvent, useState } from 'react'
import {Form, Button} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('')
  const navigate = useNavigate();

  const submitHandler = async (e : SyntheticEvent) => {
    e.preventDefault()
    await fetch('https://jsonplaceholder.typicode.com/users',{
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
    })
    navigate('/home')
  }

  return (
    <FormContainer>
        <h1>Login</h1>
    <Form onSubmit={submitHandler}>
      <Form.Group className="my-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" 
        value = {email}
        onChange = {(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="my-3">
        Submit
      </Button>
    </Form>
    </FormContainer>
  )
}

export default Login
