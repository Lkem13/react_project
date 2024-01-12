import { SyntheticEvent, useState } from 'react'
import {Form, Button} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import { selectAllUsers } from '../features/users/usersSlice';
import { loginUser } from '../features/users/currentUserSlice';

const Login = () => {

  const [email, setEmail] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [loginState, setLoginState] = useState('')
  const users = useSelector(selectAllUsers);
  const canSave = [email].every(Boolean);
  const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)

  const handleLogin = (e : SyntheticEvent) => {
     // Prevent the default behavior of the submit event (e.g., page reload)
  e.preventDefault();
    const user = users.find((user) => user.email === email);
    if (canSave && user !== undefined) {
      try {
        dispatch(loginUser(user));
        setEmail('');
        setLoginState('');
        navigate('/')
      } catch (err) {
        console.error('Failed to login', err);
      }
    }else{
      setLoginState('Failed to login');
    }
  };

  return (
    <section>
            <h2>Login</h2>
            <form>
                <label htmlFor="email">Email address:</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={onEmailChanged}/>
                <div className='error'>{loginState && 'Email was not found!'}</div>
                <button className="submit" type="button" onClick={handleLogin}>Login</button>
            </form>
            <br/>
        </section>
  )
}

export default Login
