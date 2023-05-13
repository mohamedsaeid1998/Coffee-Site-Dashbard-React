
import axios from "axios";
import { createContext } from "react";
import AddProduct from './../Components/AddProduct/AddProduct';
export let productContext = createContext()


export default function ProductContextProvider(props){


let headers ={
  token:localStorage.getItem("userToken")
}




async function displayProduct(kind,page){
return axios.get(`https://coffee-2pwn.onrender.com/api/v1/${kind}?page=${page}`)
.then((response)=>response)
.catch((error)=>error)
}


async function updateProduct(id,formData){
return axios.put(`https://coffee-2pwn.onrender.com/api/v1/products/${id}`,
formData,
{
headers:headers
})
.then((response)=>response)
.catch((error)=>error)
}


async function deleteProduct(id){
return axios.delete(`https://coffee-2pwn.onrender.com/api/v1/products/${id}`,
{
headers:headers
})
.then((response)=>response)
.catch((error)=>error)
}


async function updateCategory(id,formData){
  return axios.put(`https://coffee-2pwn.onrender.com/api/v1/categories/${id}`,
  formData,
  {
  headers:headers
  })
  .then((response)=>response)
  .catch((error)=>error)
  }

  async function deleteCategory(id){
    return axios.delete(`https://coffee-2pwn.onrender.com/api/v1/categories/${id}`,
    {
    headers:headers
    })
    .then((response)=>response)
    .catch((error)=>error)
    }

async function updateBrand(id,formData){

  return axios.put(`https://coffee-2pwn.onrender.com/api/v1/brands/${id}`,
  formData,
  {
  headers:headers
  })
  .then((response)=>response)
  .catch((error)=>error)
  
  }

  async function deleteBrand(id){
    return axios.delete(`https://coffee-2pwn.onrender.com/api/v1/brands/${id}`,
    {
    headers:headers
    })
    .then((response)=>response)
    .catch((error)=>error)
    }
    

    async function createProduct(name,quantity,description,price,priceAfterDiscount){
      return axios.put(`https://coffee-2pwn.onrender.com/api/v1/products`,
      {
      name,
      quantity,
      description,
      price,
      priceAfterDiscount,
      },
      {
      headers:headers
      })
      .then((response)=>response)
      .catch((error)=>error)
      }

    async function UpdateUserDetails(id,name,email,phone){
    return axios.put(`https://coffee-2pwn.onrender.com/api/v1/users/${id}`,
    {
    name,
    email,
    phone,
    },
    {
    headers:headers
    })
    .then((response)=>response)
    .catch((error)=>error)
    }
    
    async function deleteUser(id){
      return axios.delete(`https://coffee-2pwn.onrender.com/api/v1/users/${id}`,
      {
      headers:headers
      })
      .then((response)=>response)
      .catch((error)=>error)
      }





  return <productContext.Provider value={{headers, displayProduct , updateProduct , deleteProduct , updateCategory , deleteCategory , updateBrand , deleteBrand,createProduct , UpdateUserDetails , deleteUser}}>
  {props.children}
  </productContext.Provider>
}