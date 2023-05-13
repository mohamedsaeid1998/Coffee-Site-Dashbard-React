import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import { productContext } from '../../Context/ProductsContext'
import swal from 'sweetalert';
import { Helmet } from 'react-helmet';
import FormData from 'form-data'

export default function UpdateProduct() {
  let {updateProduct,deleteProduct}=useContext(productContext)
  let {id} = useParams()
  let navigate = useNavigate()
  useEffect(()=>{
    getProductDetails(id)
  },[])

  
  
  
  const [Product, setProduct] = useState(null)
  async function getProductDetails(id){
    let {data} = await axios.get(`https://coffee-2pwn.onrender.com/api/v1/products/${id}`).catch((error)=>error)
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


  async function catchProductDetails(name,price,priceAfterDiscount,quantity,description){

    const formData = new FormData();
    formData.append('image',imageFile);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('priceAfterDiscount',priceAfterDiscount);
    formData.append('quantity',quantity);
    formData.append('description',description);

    let response = await updateProduct(id,formData)
    if(response.status === 200){
      navigate("/products")
      swal("Good job!", "Product details has been updated", "success");
    }

    
}




function active(){
  const form = document.querySelector("form");
  form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const name = document.querySelector("#product_title");
    const price = document.querySelector("#product_price");
    const priceAfterDiscount = document.querySelector("#priceAfterDiscount");
    const quantity = document.querySelector("#quantity");
    const description = document.querySelector("#description");
    catchProductDetails(name.value,price.value,priceAfterDiscount.value, quantity.value,description.value,)
  })
}

return <>
           <Helmet>
        <title>Update Product</title>
        </Helmet>
  <div className="main" >
      <div className="content-header d-flex justify-content-between align-content-center p-4">
        <Link to={"/products"}>
        <button className="btn btn-danger">Go to products</button>

        </Link>

        <h2 className="content-title text-center">Update Product</h2>

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
                <label htmlFor="product_price" className="form-label">Price</label>
              <input defaultValue={Product.price} type="number"placeholder="Type here" className="form-control" id="product_price" required=""/>
              </div>
              <div className="mb-4">
                <label htmlFor="priceAfterDiscount" className="form-label">priceAfterDiscount</label>
              <input  defaultValue={Product.priceAfterDiscount}  type="number"placeholder="Type here" className="form-control" id="priceAfterDiscount" required=""/>
              </div>
              <div className="mb-4">
                <label htmlFor="quantity" className="form-label">Count In Stock</label>
                <input defaultValue={Product.quantity} type="number"placeholder="Type here" className="form-control" id="quantity" required=""/>
                </div>
              <div className="mb-4">
                <label className="form-label">Description</label>
                <textarea defaultValue={Product.description} placeholder="Type here"className="form-control" rows="7" id="description" required="">
                  </textarea>
                  </div>

              <div className="mb-4">
                <label className="form-label">Images</label>
                <input className="form-control" defaultValue={Product.image} type="text" placeholder="Inter Image URL"/>
                <input className="form-control mt-3"  onChange={handleImageChange} type="file" id="image"/>
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