import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import { Helmet } from 'react-helmet';
import * as Yup from "yup"
import { useFormik } from 'formik';
import { productContext } from '../../Context/ProductsContext'
import axios from 'axios'
import FormData from 'form-data'

export default function AddProduct() {
let navigate = useNavigate()
let {displayProduct,headers}= useContext(productContext)

const [imageFile, setImageFile] = useState(null);

const handleImageChange = (event) => {
  const file = event.target.files[0];
  setImageFile(file);

};

const [Loading, setLoading] = useState(false)


useEffect(()=>{
  getCategory()
  getBrand()
  getMachine()
},[])


const [category, setCategory] = useState(null)

async function getCategory(page){
    let response = await displayProduct("categories",page)

    setCategory(response.data)
}

const [brand, setBrand] = useState(null)

async function getBrand(page){
    let response = await displayProduct("brands",page)

    setBrand(response.data)
}

const [machine, setMachine] = useState(null)

async function getMachine(page){
    let response = await displayProduct("machines",page)

    setMachine(response.data)

}



  let validation =Yup.object({
    name:Yup.string().required("Product Name is required").min(3,"Product Name minLength is 3").max(50,"Product Name maxLength is 50"),
    price:Yup.string().required("price is required").max(10000,"price maxLength is 10000"),
    priceAfterDiscount:Yup.string().required("priceAfterDiscount is required").max(10000,"priceAfterDiscount maxLength is 10000"),
    countryOfOrigin:Yup.string().required("countryOfOrigin is required").min(3,"countryOfOrigin minLength is 3").max(100,"countryOfOrigin maxLength is 100"),
    quantity:Yup.string().required("quantity is required").min(1,"quantity minLength is 1").max(200,"quantity maxLength is 200"),
    description:Yup.string().required("description is required").min(20,"description minLength is 20").max(10000,"description maxLength is 10000"),
})

async function handelRegister (values){

  let category = document.querySelector("#category").value
  let brand = document.querySelector("#brand").value
  let machine = document.querySelector("#machine").value
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('name', values.name);
  formData.append('price', values.price);
  formData.append('priceAfterDiscount', values.priceAfterDiscount);
  formData.append('countryOfOrigin', values.countryOfOrigin);
  formData.append('quantity', values.quantity);
  formData.append('description', values.description);
  formData.append('category', category);
  formData.append('brand', brand);
  formData.append('machine', machine);


  setLoading(true)
  let response = await axios.post("https://coffee-2pwn.onrender.com/api/v1/products",formData,{
    headers:headers
  })
  .then((response)=>response)
  .catch((error)=>console.log(error))

  swal("Good job!", "Product added successfully", "success");
  navigate("/products")

}

  let formik =useFormik({
    initialValues:{
        name:"",
        price:"",
        priceAfterDiscount:"",
        countryOfOrigin:"",
        quantity:"",
        description:"",
        image:"",
    },
    validationSchema:validation,
    onSubmit:handelRegister
})



  return <>
        <Helmet>
        <title>Add Product</title>
        </Helmet>
        <div className="main">
      <div className="content-header d-flex justify-content-between align-content-center p-4">
        <Link to={"/products"}>
        <button className="btn btn-danger">Go to products</button>

        </Link>

        <h2 className="content-title">Add Product</h2>

        <Link to={"/dashboard"}>
        <button className="btn btn-success">Go to DashBoard</button>
        </Link>
      </div>
      <div className='d-flex justify-content-center align-content-center'>
    <form className='w-75' onSubmit={formik.handleSubmit}>
      <div className="row mb-4">
        <div className="col-xl-12 col-lg-12">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <div className='d-flex justify-content-between gap-2 overflow-hidden'>



                <div className='category'>
                <label htmlFor="category">Category</label>
            <select id="category" name='category' className="form-select  ">
            {category?.result?.map((category,index)=><option key={index}  value={category._id}>{category.name}</option>
            )}
            </select>
                </div>

                <div className='brand'>
                <label htmlFor="brand"> Brand</label>
            <select id="brand" name='brand' className="form-select  ">
            {brand?.result?.map((brand,index)=><option key={index} value={brand._id}>{brand.name}</option>
            )}
            </select>
                </div>

                <div className='machine '>
                <label htmlFor="machine">Machine</label>
            <select id="machine" name='machine' className="form-select  ">
            {machine?.result?.map((machine,index)=><option key={index} value={machine._id}>{machine.name}</option>
            )}
            </select>
                </div>

              </div>



              <div className="mb-4">
                <label htmlFor="name" className="form-label">Product Name</label>
                <input className='w-100 form-control' type="text" placeholder='type Product Name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name='name' id='name' required/>
                {formik.errors.name && formik.touched.name?<div className='alert alert-danger'>{formik.errors.name}</div> :null}
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="form-label">Price</label>
                <input className='w-100 form-control' type="text" placeholder='type Product price' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.price} name='price' id='price' required/>
                {formik.errors.price && formik.touched.price?<div className='alert alert-danger'>{formik.errors.price}</div> :null}
              </div>
              <div className="mb-4">
                <label htmlFor="priceAfterDiscount" className="form-label">Price After Discount</label>
                <input className='w-100 form-control' type="text" placeholder='type Product priceAfterDiscount' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.priceAfterDiscount} name='priceAfterDiscount' id='priceAfterDiscount' required/>
                {formik.errors.priceAfterDiscount && formik.touched.priceAfterDiscount?<div className='alert alert-danger'>{formik.errors.priceAfterDiscount}</div> :null}
              </div>
              <div className="mb-4">
                <label htmlFor="countryOfOrigin" className="form-label">Country Of Origin</label>
                <input className='w-100 form-control' type="text" placeholder='type Product countryOfOrigin' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.countryOfOrigin} name='countryOfOrigin' id='countryOfOrigin' required/>
                {formik.errors.countryOfOrigin && formik.touched.countryOfOrigin?<div className='alert alert-danger'>{formik.errors.countryOfOrigin}</div> :null}
              </div>
              <div className="mb-4">
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <input className='w-100 form-control' type="text" placeholder='type Product quantity' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.quantity} name='quantity' id='quantity' required/>
                {formik.errors.quantity && formik.touched.quantity?<div className='alert alert-danger'>{formik.errors.quantity}</div> :null}
                </div>
              <div className="mb-4">
                <label htmlFor='description' className="form-label">Description</label>
                <textarea  placeholder="you must type more than 20 character "className="form-control" rows="7" id="description" name='description' onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur}required >
                {formik.errors.description && formik.touched.description?<div className='alert alert-danger'>{formik.errors.description}</div> :null}
                  </textarea>
                  </div>
              <div className="mb-4">
                <label htmlFor="image" className="form-label">Image</label>
                <input className="form-control" type="file" id="image" name='image' onChange={handleImageChange}  required/>
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
