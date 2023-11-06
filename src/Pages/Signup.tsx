import React from 'react'
import FormContainer from '../components/FormContainer'
import {Form, Button} from 'react-bootstrap'

const Signup = () => {
  return (
    <FormContainer>
        <h1>Login</h1>
    <Form>
      <Form.Group className="my-3" controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="firstName" placeholder="Enter your first name" />
      </Form.Group>

      <Form.Group className="my-3" controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="lastName" placeholder="Enter your last name" />
      </Form.Group>

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

export default Signup
