import React, { useState } from 'react'
import '../../scss/login.scss'
import '../../App.scss'
import { Button, Divider, Form, Input, Typography, message } from 'antd'
import { useNavigate } from 'react-router-dom'
// import { useAuthContext } from '../../contexts/AuthContext'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../config/firebase'
// import { collection, query, where } from 'firebase/firestore'

const { Title } = Typography

export default function Forget() {


    // const citiesRef = collection(firestore, "register");
    // const q = query(citiesRef, where("uid", "==", state.uid, 'email', '==', state.email));

    const navigate = useNavigate()

    // const { readUserProfile } = useAuthContext()
    const [state, setState] = useState({ email: "" })
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleForget = e => {
        e.preventDefault()

        let { email } = state

        setIsProcessing(true)
        sendPasswordResetEmail(auth, email)
            .then(() => {
                message.success("Forgot Password Successfully")
                navigate('http://localhost:3000/auth/login')
            })
            .catch((error) => {
                message.error("Error in Forgot-Password")
                // ..
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }

    return (
        <div className='auth'>
            <div className="container mt-5">
                <div className="row mt-4">
                    <div className="col">
                        <div className="card p-3 p-md-4">
                            <Title level={2} className='m-0 text-center'>Forgot-Password</Title>

                            <Divider />

                            <Form layout="vertical">
                                <Form.Item label="Email">
                                    <Input placeholder='Input your email' name='email' onChange={handleChange} />
                                </Form.Item>
                                <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleForget}>Submit</Button>
                            </Form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
