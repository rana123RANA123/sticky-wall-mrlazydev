import React, { useState } from 'react'
import '../../scss/login.scss'
import '../../App.scss'
import { Button, Divider, Form, Input, Typography, message } from 'antd'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
// import { collection, query, where } from 'firebase/firestore'

const { Title } = Typography

export default function Login() {

  
  // const citiesRef = collection(firestore, "register");
  // const q = query(citiesRef, where("uid", "==", state.uid, 'email', '==', state.email));

  const navigate = useNavigate()

  const { readUserProfile } = useAuthContext()
  const [state, setState] = useState({ email: "", password: "" })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleLogin = e => {
    e.preventDefault()

    let { email, password } = state

    setIsProcessing(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        readUserProfile(user)
        navigate('/')
        message.success("User Login Successfully")
        setIsProcessing(false)
      })
      .catch(err => {
        message.error("Something went wrong while signing user")
        console.error(err)
        setIsProcessing(false)
      })
      
  }

  return (
    <div className='auth'>
      <div className="container mt-5">
        <div className="row mt-4">
          <div className="col">
            <div className="card p-3 p-md-4">
              <Title level={2} className='m-0 text-center'>Login</Title>

              <Divider />

              <Form layout="vertical">
                <Form.Item label="Email">
                  <Input placeholder='Input your email' name='email' onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Password">
                  <Input.Password placeholder='Input your password' name='password' onChange={handleChange} />
                </Form.Item>

                <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleLogin}>Login</Button>
              </Form>

              <div className="row">
                <div className="col-12 mt-3 px-3">
                  <p className=''> <Link to='/auth/forget'><u className='text-dark fw-bold'>Forget-Password</u></Link></p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 mt-3 px-3">
                  <p className=''> <Link to='/auth/reset'><u className='text-dark fw-bold'>Reset-Password</u></Link></p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 px-3">
                  <p className='text-center'>Need an account? <Link to='/auth/register'><u className='text-dark fw-bold'>Register</u></Link></p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
