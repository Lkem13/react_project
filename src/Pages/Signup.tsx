import { SyntheticEvent, useState } from 'react'
import FormContainer from '../components/FormContainer'
import {Form, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate();

  const submitHandler = async (e: SyntheticEvent) =>{
    e.preventDefault()

    await fetch('https://jsonplaceholder.typicode.com/users',{
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        username,
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
    })
    //.then((response) => response.json())
    //.then((json) => console.log(json))
    navigate('/login')
  }
  return (
    <FormContainer>
        <h1>Login</h1>
    <Form onSubmit={submitHandler}>
      <Form.Group className="my-3" controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="firstName" placeholder="Enter your first name" 
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="my-3" controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="lastName" placeholder="Enter your last name" 
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="my-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="my-3" controlId="password">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Username" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="my-3">
        Submit
      </Button>
    </Form>
    </FormContainer>
  )
}

export default Signup
