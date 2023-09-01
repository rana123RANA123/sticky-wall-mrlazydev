import React, { useEffect, useState } from 'react'
import '../../../App.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../contexts/AuthContext'
// import { signOut } from 'firebase/auth'
import { firestore } from '../../../config/firebase'
// import { message } from 'antd'
// import dayjs from 'dayjs'
// import {HomeOutlined} from '@ant-design/icons'
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { Button, Modal, Space, Tooltip, message } from 'antd'
import dayjs from 'dayjs'
import { DeleteOutlined } from '@ant-design/icons'
// import { DeleteOutlined } from '@ant-design/icons'
// import Sidebar from '../../../components/Sidebar'

export default function Hero(props) {

    const {user} = useAuthContext()
    const [allDocuments, setAllDocuments] = useState([])
    const [documents, setDocuments] = useState([])
    const [todo, setTodo] = useState({})
    const [open, setOpen] = useState(false);

    // const { isAuth, dispatch } = useAuthContext()



    console.log("allDocuments", allDocuments)
    console.log("setTodo", setTodo)

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/makesticky')
    }
    // logout click function 

    // ------------------------------------------------------------------------------------------------

    
    // const specialTodos = async () => {
    //     const colRef = collection(firestore, "stickynotes")
    //     const q = query(colRef, props.query, where("createdBy.uid", "==", user.uid))


    //     onSnapshot(q, (snapshot) => {
    //         let stickynotes = []
    //         snapshot.docs.forEach((doc) => {
    //             stickynotes.push({ ...doc.data(), id: doc.id })
    //         })
    //         setAllDocuments(stickynotes)
    //         setDocuments(stickynotes)
    //         console.log(stickynotes)
    //     })


    //     // const array = []
    //     // querySnapshot.forEach((doc) => {
    //     //     // doc.data() is never undefined for query doc snapshots
    //     //     let data = doc.data()
    //     //     array.push(data)
    //     // });
    //     // setAllDocuments(array)
    //     // setDocuments(array)

    // }
    // console.log(specialTodos)


    // useEffect(() => {
    //     specialTodos()
    // }, [specialTodos])



    // ------------------------------------------------------------------------------------------------

    // Get data from firestore 
    const getTodos = async () => {

        const colRef = collection(firestore, "stickynotes")
        const q = query(colRef, where("createdBy.uid", "==", user.uid))


        // ========================


        // const q = query(collection(firestore, "stickynotes"), where("createdBy.uid", "==", user.uid))
        // const querySnapshot = await getDocs(q);
        // ==========================


        const querySnapshot = await getDocs(collection(firestore, "stickynotes"));
        const array = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let data = doc.data()
            array.push(data)
        });
        setAllDocuments(array)
        setDocuments(array)

    }
    console.log(getTodos)


    useEffect(() => {
        getTodos()
    }, [])



    const handleDelete = async (todo) => {

        try {
            await deleteDoc(doc(firestore, "stickynotes", todo.id));

            let documentsAfterDelete = documents.filter(doc => doc.id !== todo.id)
            setAllDocuments(documentsAfterDelete)
            setDocuments(documentsAfterDelete)

            message.success("Todo deleted successfully")
        } catch (err) {
            console.error(err)
            message.error("something went wrong while deleting todo")
        }
    }


    // const handleEdit = () => {
    //     navigate('/update')
    // }

    return (
        <div class="scrollable-content">

            {/* <div style={{ display: "flex" , flexWrap : "wrap" }}>
                <div
                    style={{}}><Sidebar />
                    </div>
                </div> */}
            {/* <main style={{ display: "flex", flexDirection: "column"}}> */}

            <div className="container">
                <div className="text-center" style={{ display: "flex" }} id='fullpage'>
                    <div className="row">
                        <div className="col mb-5 mt-2 align-items-center justify-content-center d-flex">
                            <div className="row">
                                <div className="col">
                                    <h1 className='text-center'>Sticky-Wall</h1>
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
                                        <div style={{ height: '85%', padding: "9px", backgroundColor: `${todo.color}` }}>
                                            <p className="card-title"><h4>Title : </h4>{todo.title || "Title"}</p>
                                            <p className="card-text"><h4>Description : </h4>{todo.description || "Description"}</p>
                                        </div>
                                        <div className='d-flex align-items-end' style={{ backgroundColor: `${todo.color}` }}>
                                            <button className='btn buttonss btn-success rounded-0' onClick={() => { navigate(`/update/${todo.id}`) }}> Edit</button>
                                            <button className='btn buttonss btn-danger rounded-0' onClick={() => { handleDelete(todo) }} >Delete</button>
                                            {/* <p className='mb-1 ms-2'>{todo.date === "Invalid Date" ? "Date" : todo.date}</p>
                                            <p className='mb-1 ms-2' style={{ color: '#1677FF' }}>{todo.status}</p> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                    <div className="col">
                        <div onClick={handleNavigate} className="card box" style={{ marginTop: "7px" }} id='addNew'>
                            <div className="card-body" style={{ height: '250px' }}>
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                                    <div style={{ fontSize: '48px' }}>+</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            {/* <div className="container" style={{ display: "flex" , flexWrap:"nowrap"}}>

                <div className="row align-items-center justify-content-center d-flex position-relative " id='fullBoxes' style={{ display: "flex", flexWrap: "wrap" }}>
                    <div className="col">
                        <div className="" style={{ display: "flex" , flexWrap:"nowrap"}} >
                            <div className="col-4 box" onClick={handleNavigate}>
                                <h1 className='plus'>+</h1>
                            </div>
                            <div className="col-12" style={{ display: "flex" }}>
                                {
                                    documents.map((todo, i) => {
                                        return (
                                            <div key={i} id='boxesDiv' className={`box1`} onClick={() => setOpen()} style={{ backgroundColor: `${todo.color}`, marginLeft: "20px", height: "300px", width: "300px", overflowX: "hidden" }}>
                                                <div className="row">
                                                    <div className="col-12 p-4" style={{ height: "293px" }}>
                                                        <p style={{ color: "white" }}> <h3>Title :- </h3> {todo.title}</p>
                                                        <p style={{ color: "white" }}> <h3>Description :- </h3> {todo.description}</p> <br />
                                                        <tr style={{ color: "white" }}> {todo.date ? dayjs(todo.date).format("DD/MM/YYYY") : ""}</tr>
                                                    </div>
                                                    <div className="col-12" id='buttons' style={{ position: "absolute" }}>
                                                        <button className='btn buttonss btn-success rounded-0' onClick={() => { navigate(`/update/${todo.id}`) }}> Edit</button>
                                                        <button className='btn buttonss btn-danger rounded-0' onClick={() => { handleDelete(todo) }} >Delete</button>
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
            </div> */}
            {/* </main > */}
        </div>
    )
}
