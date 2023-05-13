import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { productContext } from '../../Context/ProductsContext'
import swal from 'sweetalert';
import { Helmet } from 'react-helmet';
import styles from "./UpdateCategory.module.css"
import FormData from 'form-data'

export default function UpdateCategory() {
let navigate = useNavigate()
  let {updateCategory}=useContext(productContext)
  let {id} = useParams()

  useEffect(()=>{
    getProductDetails(id)
  },[])

  
  
  
  const [Product, setProduct] = useState(null)
  async function getProductDetails(id){
    let {data} = await axios.get(`https://coffee-2pwn.onrender.com/api/v1/categories/${id}`).catch((error)=>error)
    setProduct(data.data)

    
  }
  
  const [imageFile, setImageFile] = useState(null);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

  }

  useEffect(()=>{
    if(imageFile===null){
      return 
    }
    active()
  },[imageFile])


  async function catchProductDetails(name){

    const formData = new FormData();
    formData.append('image',imageFile);
    formData.append('name', name);

    let response = await updateCategory(id,formData)
    if(response.status === 200){
      navigate("/categories")
      swal("Good job!", "Category details has been updated", "success");
    }

}





function active(){
  const form = document.querySelector("form");
  form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const name = document.querySelector("#product_title");
    catchProductDetails(name.value)
  })
}
  return <>
           <Helmet>
        <title>Update Category</title>
        </Helmet>
<div className="main" >
      <div className="content-header d-flex justify-content-between align-content-center p-4">
        <Link to={"/categories"}>
        <button className="btn btn-danger">Go to categories</button>

        </Link>

        <h2 className="content-title text-center">Update category</h2>

        <Link to={"/dashboard"}>
        <button className="btn btn-success">Go to DashBoard</button>
        </Link>
      </div>
      {Product?<div className='d-flex justify-content-center align-content-center'>
    <form className='w-50'>
      <div className="row mb-4">
        <div className="col-xl-12 col-lg-12">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <div className="mb-4">
                <label htmlFor="product_title" className="form-label">Product title</label>
              <input defaultValue={Product.name} type="text" placeholder="Type here" className="form-control" id="product_title"  required="" />
              </div>
              <div className="mb-4">
                <label className="form-label">Images</label>
                <input className="form-control" defaultValue={Product.image} type="text" placeholder="Inter Image URL"/>
                <input className="form-control mt-3"  onChange={handleImageChange} type="file" id="image" required/>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                <button onSubmit={()=>active()} className="btn btn-primary ">Publish now</button> 
                </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    </div>:null}

  </div>
  </>
}
