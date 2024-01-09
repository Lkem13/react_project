import { SyntheticEvent, useState } from 'react'
import FormContainer from '../components/FormContainer'
import {Form, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../app/store'
import { addNewUser, selectAllUsers } from '../features/users/usersSlice'

const Signup = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const canSave = [email, name, username].every(Boolean);
  const users = useSelector(selectAllUsers);
  const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  const onUsernameChanged = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)


  const handleRegister = (e : SyntheticEvent) => {
     // Prevent the default behavior of the submit event (e.g., page reload)
  e.preventDefault();
    const user = users.find((user) => user.email === email);
    if (canSave && user == null) {
      try {
        dispatch(addNewUser({name, email, username}));
        setName('');
        setEmail('');
        setUsername('');
        navigate('/login')
      } catch (err) {
        console.error('Failed to register', err);
      }
    }
  };
  return (
    <section>
            <br/>
            <h2>Register</h2>
            <form>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={onNameChanged}/>
                <label htmlFor="email">Email address:</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={onEmailChanged}/>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={onUsernameChanged}/>
                    <br/>
                <button className="submit" type="button" onClick={handleRegister}>Register</button>
            </form>
            <br/>
        </section>
  )
}

export default Signup
