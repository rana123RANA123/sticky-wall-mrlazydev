import React, { useState } from 'react'
import { Button, DatePicker, Divider, Form, Input, Typography, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { createUserWithEmailAndPassword, deleteUser, getAuth } from 'firebase/auth'
import { auth, firestore } from '../../config/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

const { Title } = Typography

export default function Reset() {

  const navigate = useNavigate()

  const { dispatch } = useAuthContext()
  const [state, setState] = useState({ email: "", password: "" })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleReset = e => {
    e.preventDefault()

    let { email, password } = state

    setIsProcessing(true)


    const auth = getAuth();
    const user = auth.currentUser;

    deleteUser(user).then(() => {
      message.success("Your account Reset successfully")
      navigate('/auth/register')
    }).catch((error) => {
      message.error("Something went wrong while Reset password")
    })
    .finally(() => {
    setIsProcessing(false)
  })
}




return (
  <div className='auth mt-5'>
    <div className="container mt-5">
      <div className="row mt-2">
        <div className="col">
          <div className="card p-3 p-md-4">
            <Title level={2} className='m-0 text-center'>Reset-Password</Title>

            <Divider />

            <Form layout="vertical">
              <Form.Item label="Email">
                <Input placeholder='Input your email' name='email' onChange={handleChange} />
              </Form.Item>
              <Form.Item label="Password">
                <Input.Password placeholder='Input your password' name='password' onChange={handleChange} />
              </Form.Item>
              <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleReset}>Reset</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}
