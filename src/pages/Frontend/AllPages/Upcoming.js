import React, { useEffect, useState } from 'react'
import '../../../App.scss'
// import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../contexts/AuthContext'
// import { signOut } from 'firebase/auth'
import { firestore } from '../../../config/firebase'
// import { message } from 'antd'
// import dayjs from 'dayjs'
// import {HomeOutlined} from '@ant-design/icons'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
// import { Modal, message } from 'antd'
import dayjs from 'dayjs'
// import Sidebar from '../../../components/Sidebar'

export default function Hero() {



    const [allDocuments, setAllDocuments] = useState([])
    const [documents, setDocuments] = useState([])
    const [todo, setTodo] = useState({})

    // const { isAuth, dispatch } = useAuthContext()

    console.log("allDocuments", allDocuments)
    console.log("setTodo", setTodo)

    // const colRef = collection(firestore, "stickynotes")
    // const q = query(colRef, where("list", "==", "Work"))

    // onSnapshot(q, (snapshot) => {
    //     let stickynotes = []
    //     snapshot.docs.forEach((doc) => {
    //         stickynotes.push({ ...doc.data(), id: doc.id})
    //     })
    //     console.log(stickynotes)
    // })

    // Get data from firestore 
    // const getTodos = async () => {
    //     const querySnapshot = await getDocs(collection(firestore, "stickynotes"));
    //     const array = []
    //     querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         let data = doc.data()
    //         array.push(data)
    //     });
    //     setAllDocuments(array)
    //     setDocuments(array)

    // }
    // console.log(getTodos)


    // useEffect(() => {
    //     getTodos()
    // }, [getTodos])

    const todayDate = dayjs(todo.date).format("YYYY-MM-DD");
    console.log("today Date", todayDate)


    const specialTodos = async () => {
        const colRef = collection(firestore, "stickynotes")
        const q = query(colRef, where("date", ">", todayDate))


        onSnapshot(q, (snapshot) => {
            let stickynotes = []
            snapshot.docs.forEach((doc) => {
                stickynotes.push({ ...doc.data(), id: doc.id })
            })
            setAllDocuments(stickynotes)
            setDocuments(stickynotes)
            console.log(stickynotes)
        })


        // const array = []
        // querySnapshot.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     let data = doc.data()
        //     array.push(data)
        // });
        // setAllDocuments(array)
        // setDocuments(array)

    }
    console.log(specialTodos)


    useEffect(() => {
        specialTodos()
    }, [specialTodos])


    return (
        <>

<div className="container">
                <div className="text-center" style={{ display: "flex" }} id='fullpage'>
                    <div className="row">
                        <div className="col mb-5 mt-2 align-items-center justify-content-center d-flex">
                            <div className="row">
                                <div className="col">
                                    <h1 className='text-center'>Upcoming</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="row row-cols-1 row-cols-md-3">
                    {documents.map((todo, i) => {
                        return (
                            <div className="col" key={i}>
                                <div className="card mt-2" style={{ backgroundColor: document.backgroundColor }}>
                                    <div className="card" style={{ height: '260px' }}>
                                        <div style={{ height: '88%',padding:"9px" , backgroundColor:`${todo.color}` }}>
                                            <hp className="card-title"><h4>Title : </h4>{todo.title || "Title"}</hp>
                                            <p className="card-text"><h4>Description : </h4>{todo.description || "Description"}</p>
                                        </div>
                                        <div className='d-flex align-items-end' style={{backgroundColor:`${todo.color}`}}>
                                            <p className='mb-1 ms-2'><h4 style={{display:"inline"}}>Date : </h4>{todo.date === "Invalid Date" ? "Date" : todo.date}</p>
                                            {/* <p className='mb-1 ms-2' style={{ color: '#1677FF' }}>{todo.status}</p> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>


            {/* <main style={{ display: "flex", flexDirection: "column" }}>

                <div className="container text-center" style={{ display: "flex" }} id='fullpage'>
                    <div className="row">
                        <div className="col mb-5 ms-2 mt-2 align-items-center ms-5 justify-content-center d-flex">
                            <div className="row ms-5">
                                <div className="col ms-5">
                                    <h1 className='text-center ms-5'>Upcoming</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row align-items-center justify-content-center d-flex position-relative" id='fullBoxes' style={{ display: "flex", flexWrap: "wrap" }}>
                    <div className="col">
                        <div className="" style={{ display: "flex" }} >
                            <div className="" style={{ display: "flex" }}>
                                {
                                    documents.map((todo, i) => {
                                        return (
                                            <div key={i} id='boxesDiv' className={`box1`} style={{ opacity: "0.5",backgroundColor: `${todo.color}`,  marginLeft: "20px", height: "300px", width: "300px", overflowX: "hidden" }}>
                                                <div className="row">
                                                    <div className="col-12 p-4" style={{ height: "290px" }}>
                                                        <h5 style={{ color: "white" }}> <h3>Title :- </h3> {todo.title}</h5> <br />
                                                        <tr style={{ color: "white" }}> <h3>Description :- </h3> {todo.description}</tr> <br />
                                                        <hr />
                                                        <tr style={{ color: "white" }}> <h6 style={{ display: "inline" }}> <b>Date :- </b> </h6> {todo.date ? todo.date : "Date Not Found"}</tr> <br />
                                                    </div>
                                                    <div className="col-12" style={{ position: "sticky" }}>

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>



                </div>

            </main > */}
        </>
    )
}
