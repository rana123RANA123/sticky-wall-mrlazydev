import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, DatePicker, Divider, Form, Input, Row, Typography, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
// import dayjs from 'dayjs'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firestore } from '../../../config/firebase'
import dayjs from 'dayjs'

const { Title } = Typography

const initialState = { title: "", location: "", date: "", status: "", description: "" }

export default function Updatetodo() {


  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const handleDate = (_, date) => setState(s => ({ ...s, date }))

  console.log(params.id)
  // console.log("state",state)
  // console.log("setIsProcessing",setIsProcessing)


  const getDocument = useCallback(async () => {


    const docRef = doc(firestore, "stickynotes", params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const todo = docSnap.data()
      // console.log("Todo Edit Data : ", todo)
      setState(todo)
    } else {
      // docSnap.data() will be undefined in this case
      message.error("Todo not found")
    }
  }, [params.id])

  console.log("Todo state Data : ", state)

  useEffect(() => {
    getDocument()
  }, [getDocument])

  const handleUpdateSticky = async (e) => {
    e.preventDefault()
    let { title, date, list, color, description } = state

    if (!title) { return message.error("Please enter title") }


    const todo = {
      ...state,
      title, date, list, color, description,
      dateModified: new Date().getTime(),
    }

    setIsProcessing(true)
    try {
      await setDoc(doc(firestore, "stickynotes", todo.id), todo);
      message.success("Todo updated successfully")
      navigate("/")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setIsProcessing(false)
  }
  return (
    <div className='makeSticky' style={{ margin: "auto" }}>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card p-3 p-md-4">
              <Title level={2} className='m-0 text-center fw-bold'>Update Sticky-Wall</Title>

              <Divider />
              <form>
                <Form layout="vertical">
                  <Row gutter={16}>
                    <Col xs={24} lg={8}>
                      <Form.Item label="Title">
                        <Input placeholder='Input your title' name='title' value={state.title} onChange={handleChange} />
                      </Form.Item>
                    </Col>
                    {/* <Col xs={24} lg={12}>
                      <Form.Item label="Date">
                        <DatePicker className='w-100' value={state.date ? dayjs(state.date) : ""} onChange={handleDate} />
                      </Form.Item>
                    </Col> */}
                    <Col xs={24} lg={8}>
                      <Form.Item label="List">
                        {/* <Input placeholder='Input your List' name='list' onChange={handleChange} /> */}
                        <select className="form-select" onChange={handleChange} value={state.list} name='list' >
                          <option selected disabled hidden>Choose List</option>
                          <option>Personal</option>
                          <option>Work</option>
                          <option>List 1</option>
                          {/* <option>List 2</option>
                        <option>List 3</option> */}
                        </select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} lg={8}>
                      <Form.Item label="Color">
                        {/* <ColorPicker />; */}
                        {/* <Input placeholder='Input your Color' name='color' onChange={handleChange} /> */}
                        <select className="form-select" onChange={handleChange} value={state.color} name='color' >
                          <option selected disabled hidden>Choose Color</option>
                          <option>primary</option>
                          <option>secondary</option>
                          <option>danger</option>
                          <option>light</option>
                          <option>dark</option>
                        </select>
                        {/* (e) => setColour(e.target.value)  */}
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item label="Description">
                        <Input.TextArea placeholder='Input your description' value={state.description}name='description' onChange={handleChange} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }} >
                      <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleUpdateSticky}>Update Sticky</Button>
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
