import React from 'react'
import {Button, Form} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const Login = () => {
  return (
    <FormContainer>
        <h1>Login</h1>
    <Form>
      <Form.Group className="my-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" />
      </Form.Group>

      <Form.Group className="my-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit" className="my-3">
        Submit
      </Button>
    </Form>
    </FormContainer>
  )
}

export default Login
