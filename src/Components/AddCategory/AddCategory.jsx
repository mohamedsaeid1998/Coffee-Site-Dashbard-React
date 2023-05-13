import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { productContext } from '../../Context/ProductsContext'
import swal from 'sweetalert';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast'
import * as Yup from "yup"
import styles from "./AddCategory.module.css"

export default function AddCategory() {
let navigate = useNavigate()
  let {headers} = useContext(productContext)

  const [Loading, setLoading] = useState(false)


  const [imageFile, setImageFile] = useState(null);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

  }



  async function handelLogin(values){
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('name', values.title);

    setLoading(true)
  let {data} = await axios.post("https://coffee-2pwn.onrender.com/api/v1/categories",formData,
  {
    headers:headers
  })
  .catch((error)=>{
    toast.error(`${error.response.data.message }`,{ duration: 2000, position: 'bottom-center',className: 'bg-danger text-white'})
    setLoading(false)
  })
  swal("Good job!", "Category added successfully", "success");
    navigate("/categories")



}

let validation =Yup.object({
  title:Yup.string().required("Title is required").min(3,"Title minLength is 3").max(50,"Title maxLength is 50"),
})





let formik =useFormik({
  initialValues:{
    title:"",
    image:"",
  },
  validationSchema:validation,
  onSubmit:handelLogin
})


  return <>
          <Helmet>
        <title>Add Category</title>
        </Helmet>
<div className="main" >
      <div className="content-header d-flex justify-content-between align-content-center p-4">
        <Link to={"/categories"}>
        <button className="btn btn-danger">Go to categories</button>

        </Link>

        <h2 className="content-title">Add category</h2>

        <Link to={"/dashboard"}>
        <button className="btn btn-success">Go to DashBoard</button>
        </Link>
      </div>
      <div className='d-flex justify-content-center align-content-center'>
    <form className='w-50' onSubmit={formik.handleSubmit}>
      <div className="row mb-4">
        <div className="col-xl-12 col-lg-12">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <div className="mb-4">
                <label htmlFor="title" className="form-label">Category title</label>
              <input  type="text" placeholder="Type here" className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.title} name='title' id='title'  required="" />
              {formik.errors.title && formik.touched.title?<div className='alert alert-danger'>{formik.errors.title}</div> :null}
              </div>
              <div className="mb-4">
                <label className="form-label">Images</label>
                <input className="form-control " onChange={handleImageChange} type="file" id="image" name='image'  required/>
                {formik.errors.image && formik.touched.image?<div className='alert alert-danger'>{formik.errors.image}</div> :null}
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                {Loading?<button type="button" className="btn  btn btn-primary"><i className='fas fa-spinner fa-spin'></i></button>:
                <button disabled={!(formik.dirty)} type="submit" className="btn btn-primary">Publish now</button>}
                </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    </div>

  </div>
  </>
}

