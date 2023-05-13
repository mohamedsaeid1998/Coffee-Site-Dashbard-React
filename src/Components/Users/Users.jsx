import React, { useContext, useEffect, useState } from 'react'
import { productContext } from '../../Context/ProductsContext'
import axios from 'axios'
import styles from "./Users.module.css"
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import { Helmet } from 'react-helmet'
import ReactPaginate from 'react-paginate';


export default function Users() {
  let {headers,deleteUser} = useContext(productContext)
  const [load, setLoad] = useState(false)

  useEffect(()=>{
    getUsers()

  },[])

  const [User, setUser] = useState(null)
  const [page, setPage] = useState(null)


  async function getUsers(page){
    setLoad(true)
      let response= await axios.get(`https://coffee-2pwn.onrender.com/api/v1/Users?page=${page}`,
      {
          headers:headers
      })
      setUser(response.data)
      setLoad(false)

  }

  async function handlePageClick(data){
    let page = data.selected+1

    setPage(page)
    getUsers(page)
  }

  async function deleteUserDetails(id){
    let response = await deleteUser(id)
    if(response.status === 200){
        swal("Good job!", "The product has been successfully deleted", "success");
        getUsers(page)
    }

  }


return <>
             <Helmet>
        <title>Users</title>
        </Helmet>
    <div className="main">
            <div className="details w-100">
            <div className="recentOrders ">
                    <div className="cardHeader">
                        <h2>Users</h2>
                    </div>
                    {User?<div>

                        
                        {load?<div className='text-center'><i className='fas fa-spinner fa-spin fa-4x text-black-50' ></i></div>:<table>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>User</td>
                                <td>Update</td>
                                <td>Delete</td>
                            </tr>
                        </thead>

                        <tbody>

                            {User?.result?.map((user,index)=><tr key={index} >
                                <td >{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.role==="user"?<span className="status pending text-capitalize fs-5 ">{user.role}</span>:<span className="status return text-capitalize fs-5 ">{user.role}</span>}</td>
                                <Link to={`/updateUser/${user._id}`}>
                                <td><span className="btn btn-primary btn-sm ">Update </span></td>
                                </Link>

                                <td><span onClick={()=>deleteUserDetails(user._id)} className="btn btn-danger btn-sm">Delete </span></td>

                            </tr>)}
                        </tbody>



                    </table>}
                    <ReactPaginate 
        previousLabel="< previous"
        nextLabel="next >"
        pageCount={User.pages}
        onPageChange={handlePageClick}
        renderOnZeroPageCount={null}
        containerClassName='pagination align-items-center text-center  mt-3'
        pageClassName='page-item '
        pageLinkClassName='page-link '
        previousLinkClassName='page-link '
        nextLinkClassName='page-link '
        previousClassName='page-item'
        nextClassName='page-item'
        activeClassName='active'
      />
                    </div>: null}
                </div>
            </div>
            </div>
</>
}