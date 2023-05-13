import React from 'react'
import styles from "./Navigation.module.css"
import { Link } from 'react-router-dom'
import logo from "../../Assets/images/logo.png"


export default function Navigation({logout}) {


  return <>

<div className="navigation">
            <ul className='mx-3'>
                <li >
                        <img src={logo} className=' w-25'  alt="" />
                        <span className="title text-white mx-2  ">Cafena Shop</span>
                </li>

                <li>
                    <Link className='d-flex align-items-center mx-2' to={"/dashBoard"}>
                        <i className="fa-solid fa-house  fs-4"></i>
                        <span className="title ">Dashboard</span>
                    </Link>
                </li>

                <li>
                    <Link className='d-flex align-items-center mx-2' to={"/products"}>
                    <i className="fa-solid fa-bag-shopping fs-4"></i>
                        <span className="title ">Products</span>
                    </Link>
                </li>

                <li>
                    <Link className='d-flex align-items-center mx-1' to={"/addProduct"}>
                    <i className="fa-solid fa-cart-plus fs-4"></i>
                        <span className="title">Add Product</span>
                    </Link>
                </li>

                <li>
                <Link className='d-flex align-items-center mx-1' to={"/categories"}>
                <i className="fa-solid fa-list fs-4"></i>
                        <span className="title">Categories</span>
                    </Link>
                </li>

                <li>
                <Link className='d-flex align-items-center mx-1' to={"/brands"}>
                <i className="fa-solid fa-store fs-4"></i>
                        <span className="title">Brands</span>
                    </Link>
                </li>
                <li>
                <Link className='d-flex align-items-center mx-1' to={"/users"}>
                <i className="fa-solid fa-users fs-4"></i>
                        <span className="title">Users</span>
                    </Link>
                </li>

                <li>
                <Link className='d-flex align-items-center mx-1' onClick={()=>logout()}>
                <i className="fa-solid fa-right-from-bracket fs-4"></i>
                        <span className="title">LogOut</span>
                    </Link>
                </li>


            </ul>
        </div>

</>
}
