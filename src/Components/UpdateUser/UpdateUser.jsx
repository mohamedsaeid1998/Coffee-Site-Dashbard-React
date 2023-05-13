import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { productContext } from '../../Context/ProductsContext'
import styles from "./UpdateUser.module.css"
import swal from 'sweetalert';
import { Helmet } from 'react-helmet'

export default function UpdateUser() {
  let {headers,UpdateUserDetails}=useContext(productContext)
  let {id} = useParams()
  const [userDetails, setUserDetails] = useState(null)

useEffect(()=>{
  getUserDetails(id)
},[])

  async function getUserDetails(id){
    let response = await axios.get(`https://coffee-2pwn.onrender.com/api/v1/Users/${id}`,
    {
      headers:headers
    })
    .catch((error)=>error)
    setUserDetails(response.data.data)

  
  }

  useEffect(()=>{
    if(userDetails===null){
      return 
    }
    active()
  },[userDetails])

async function updateUser(id,name,email,phone){
let response = await UpdateUserDetails(id,name,email,phone)
if(response.status === 200){
  swal("Good job!", "User Details has been updated", "success");
}

  }


  function active(){
    const form = document.querySelector("form");

    form.addEventListener("submit",(e)=>{
      e.preventDefault()
      const name = document.querySelector("#name");
      const email = document.querySelector("#email");
      const phone = document.querySelector("#phone");
      updateUser(id,name.value,email.value,phone.value)
    })
  }
  return <>
             <Helmet>
        <title>Update User</title>
        </Helmet>
<div className="main" >
      <div className="content-header d-flex justify-content-between align-content-center p-4">
        <Link to={"/users"}>
        <button className="btn btn-danger">Go to Users</button>

        </Link>

        <h2 className="content-title text-center">Update User</h2>

        <Link to={"/dashboard"}>
        <button className="btn btn-success">Go to DashBoard</button>
        </Link>
      </div>
     {userDetails?<div className='d-flex justify-content-center align-content-center'>
    <form className='w-50'>
      <div className="row mb-4">
        <div className="col-xl-12 col-lg-12">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">Name</label>
              <input  type="text" defaultValue={userDetails.name} placeholder="Type here" className="form-control" id="name"  required="" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">Email</label>
              <input  type="email" defaultValue={userDetails.email} placeholder="Type here" className="form-control" id="email" required=""/>
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="form-label">Phone</label>
              <input   type="tel" defaultValue={userDetails.phone} placeholder="Type here" className="form-control" id="phone" required=""/>
              </div>

                <div className='d-flex justify-content-center align-items-center'>
                <button onSubmit={()=>active()} className="btn btn-primary ">Publish now</button> 
                </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    </div>
     :null} 

  </div>
  </>
}
