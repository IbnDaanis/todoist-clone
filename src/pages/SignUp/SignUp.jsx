import React, { useState, useEffect } from 'react'
import {
  AuthContent,
  GoogleSignUp,
  Title,
  AuthQuestion,
  FormItem,
  Input,
  InputLabel,
  Separator,
  AuthForm,
  SubmitButton,
  TodoerLogoContainer,
  AuthPage,
} from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { registerAction, signInAsGuest } from '../../store/actions/userActions'
import { GoogleIcon, todoerLogo } from '../../assets'

export const SignUp = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    userInfo && history.push('/app/today')
  }, [userInfo, history])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.')
      return
    }
    dispatch(registerAction(false, email.trim(), password))
  }

  const handleClick = () => {
    dispatch(signInAsGuest())
  }

  return (
    <AuthPage>
      <AuthContent>
        <TodoerLogoContainer>
          <Link to='/'>
            <img src={todoerLogo} alt='Todoer logo' />
          </Link>
        </TodoerLogoContainer>
        <Title>Sign Up</Title>
        <GoogleSignUp onClick={() => dispatch(registerAction(true))}>
          <GoogleIcon />
          Continue with Google
        </GoogleSignUp>
        <Separator>
          <p>OR</p>
          <div className='line'></div>
        </Separator>
        <AuthForm onSubmit={handleSubmit}>
          <FormItem>
            <InputLabel htmlFor='email'>Email</InputLabel>
            <Input
              type='email'
              id='email'
              name='email'
              title='Enter your email'
              required
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </FormItem>
          <FormItem>
            <InputLabel htmlFor='password'>Password (6 Characters Minimum)</InputLabel>
            <Input
              type='password'
              id='password'
              name='password'
              title='Enter a password'
              minlength='6'
              required
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </FormItem>
          <SubmitButton type='submit'>Sign up with Email</SubmitButton>
          <SubmitButton type='button' onClick={handleClick}>
            Sign in as a guest
          </SubmitButton>
          <Separator>
            <div className='line'></div>
          </Separator>
        </AuthForm>
        <AuthQuestion>
          Already signed up? <Link to='/login'>Go to log in!</Link>
        </AuthQuestion>
      </AuthContent>
    </AuthPage>
  )
}
