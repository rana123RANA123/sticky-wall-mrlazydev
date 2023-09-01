import { Button, Col, ColorPicker, DatePicker, Divider, Form, Input, Row, Typography, message } from 'antd'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { firestore } from '../../../config/firebase'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useAuthContext } from '../../../contexts/AuthContext'
const { Title } = Typography

const initialState = { title: "", date: "", list: "", color: "", description: "" }

export default function MakeSticky() {

  const {user} = useAuthContext()

  const [state, setState] = useState(initialState)
  const [color, setColor] = useState("")
  // const [lover, setLover] = useState({})
  // const [user, setUser] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const todayDate = dayjs().format("YYYY-MM-DD");

  const navigate = useNavigate()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const handleDate = (_, date) => setState(s => ({ ...s, date }))


  // const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // const uid = user.uid
  //     setUser(user)
  //     //  console.log("User uid is : ",uid)
  //     //   console.log("lover user uid is : ",uid)
  //   } else {
  //     console.log("user not found")
  //   }
  // });

  const handleMakeStickyWall = async (e) => {
    e.preventDefault()
    let { title, date, list, color, description } = state

    if (!title) { return message.error("Please enter title") }

    // const primary = state.color

    // const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {

    //     if(uid){
    //       setLover(uid)
    //       // console.log("Lover user uid",uid)
    //     }
    //     else{
    //       console.log("User not found")
    //     }
    //   }
    // });

    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         setLover(user)
    //     } else {
    //       message.error("user uid not found")
    //     }
    // })
    // console.log("User uid is" )
    // console.log("User full is", user)
    // console.log("lover uid is", user)


    const todo = {
      title, date, list, color, description,
      // dateCreated:  new Date().getTime(),
      dateCreated: serverTimestamp(),
      today: todayDate,
      createdBy: {
        fullName: user.fullName,
        email: user.email,
        uid: user.uid,
      },
        // uid: user,
        id: Math.random().toString(36).slice(2)
      }
    
    console.log("Color Value is is : ", color)

    // console.log("New Sticky Wall", todo)
    setIsProcessing(true)
    try {
        await setDoc(doc(firestore, "stickynotes", todo.id), todo);
        message.success("A new sticky added successfully")
      navigate('/')
      } catch(e) {
        console.error("Error adding sticky: ", e);
        message.error("Error in Adding Sticky")
      }
    setIsProcessing(false)

    }


    // console.log("Lover Uid is", lover)



    return (



      <div className='makeSticky' style={{ margin: "auto" }}>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card p-3 p-md-4">
                <Title level={2} className='m-0 text-center fw-bold'>Add Sticky-Wall</Title>

                <Divider />
                <form>
                  <Form layout="vertical">
                    <Row gutter={16}>
                      <Col xs={24} lg={12}>
                        <Form.Item label="Title">
                          <Input placeholder='Input your title' name='title' onChange={handleChange} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} lg={12}>
                        <Form.Item label="Date">
                          <DatePicker className='w-100' name='date' onChange={handleDate} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} lg={12}>
                        <Form.Item label="List">
                          {/* <Input placeholder='Input your List' name='list' onChange={handleChange} /> */}
                          <select className="form-select" onChange={handleChange} name='list' >
                            <option selected disabled hidden>Choose List</option>
                            <option style={{ color: "red", fontWeight: "bolder" }}>Personal</option>
                            <option style={{ color: "blue", fontWeight: "bolder" }}>Work</option>
                            <option style={{ color: "yellow", fontWeight: "bolder" }}>List 1</option>
                            {/* <option>List 2</option>
                        <option>List 3</option> */}
                          </select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} lg={12}>
                        <Form.Item label="Color">
                          <Input type='color' placeholder='Color' name='color' onChange={handleChange} />
                          {/* <select class="form-select" onChange={handleChange} name='color' >
                          <option selected disabled hidden>Choose Color</option>
                          <option style={{color: "blue", fontWeight:"bolder"}}>primary</option>
                          <option style={{color: "grey", fontWeight:"bolder"}}>secondary</option>
                          <option style={{color: "red", fontWeight:"bolder"}}>danger</option>
                          <option style={{color: "black", fontWeight:"bolder"}}>light</option>
                          <option style={{color: "black", fontWeight:"bolder"}}>dark</option>
                        </select> */}
                          {/* (e) => setColour(e.target.value)  */}
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item label="Description">
                          <Input.TextArea placeholder='Input your description' name='description' onChange={handleChange} />
                        </Form.Item>
                      </Col>

                      <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }} >
                        <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleMakeStickyWall}>Add Sticky</Button>
                      </Col>
                    </Row>
                  </Form>
                </form>
              </div>
            </div>
          </div>
        </div>














      </div>
    )
  }
