// import React from 'react'
// import { MenuOutlined, SearchOutlined, DoubleRightOutlined, BorderTopOutlined, CalendarOutlined, ContainerOutlined, LogoutOutlined } from '@ant-design/icons'


// export default function Sidebarrr() {
//     return (
//         <div className='sidebar rounded p-2' id='sidebar'>
//             <div className="row" id='menu'>
//                 <div className="col d-flex justify-content-between">
//                     <h5 className="mb-0">
//                         Menu
//                     </h5>
//                     <MenuOutlined style={{ cursor: 'pointer', marginTop: 8, }} />

//                 </div>
//             </div>

//             <div className="row mt-3 ms-2" id='search-row'>
//                 <div className="col search-bar">
//                     <SearchOutlined className='search-icon' />
//                     <input type="search" placeholder='Search' />
//                 </div>
//             </div>
//             <hr id='hr' />
//             <div className="row" id='tasks-row'>
//                 <div className="col ps-4">
//                     <p className='fw-bold tasks'>tasks</p>
//                     <ul>
//                         <li className='mb-3'> <DoubleRightOutlined /> &nbsp; <span >Upcoming</span></li>
//                         <li className='mb-3'> <BorderTopOutlined /> &nbsp; <span >Today</span></li>
//                         <li className='mb-3'> <CalendarOutlined /> &nbsp; <span >Calendar</span></li>
//                         <li className='mb-3'> <ContainerOutlined /> &nbsp; <span >Sticky Wall</span></li>

//                     </ul>
//                 </div>
//             </div>
//             <div className="row" id='list-row'>
//                 <div className="col ps-4 list">
//                     <p className="fw-bold ">Lists</p>
//                     <ul>
//                         <li> <div style={{ width: 10, height: 10, backgroundColor: "red", display: 'inline-block' }}></div> &nbsp; Personal</li>
//                         <li> <div style={{ width: 10, height: 10, backgroundColor: "skyblue", display: 'inline-block' }}></div> &nbsp; Work</li>
//                         <li> <div style={{ width: 10, height: 10, backgroundColor: "yellow", display: 'inline-block' }}></div> &nbsp; List 1</li>
//                     </ul>
//                 </div>
//             </div>
//             <div className='row' id='logout-row'>
//                 <div className='col'>
//                     <LogoutOutlined style={{ position: 'absolute', top: 720, left: 240, }} />
//                     <a style={{ position: 'absolute', top: 715, left: 268, textDecoration: 'none', color: 'black', fontWeight: '500' }} href="" >Sign OUT </a>
//                 </div>
//             </div>
//         </div>
//     )
// }