import React, { useEffect, useState } from 'react'
import { RouterProvider,  createHashRouter } from 'react-router-dom';
import DashBoard from './Components/DashBoard/DashBoard';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import Products from './Components/Products/Products';
import ProductContextProvider from './Context/ProductsContext';
import UpdateProduct from './Components/UpdateProduct/UpdateProduct';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import AddProduct from './Components/AddProduct/AddProduct';
import UpdateCategory from './Components/UpdateCategory/UpdateCategory';
import UpdateBrand from './Components/UpdateBrand/UpdateBrand';
import { Toaster } from 'react-hot-toast';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Users from './Components/Users/Users';
import UpdateUser from './Components/UpdateUser/UpdateUser';
import AddCategory from './Components/AddCategory/AddCategory';
import AddBrand from './Components/AddBrand/AddBrand';


export default function App() {

  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      saveUserData()
    }
  },[])

  const [SetUserData, setSetUserData] = useState(null)

  function saveUserData(){
    let enCodedToken = localStorage.getItem("userToken")
    let decodedToken = jwtDecode(enCodedToken)
    setSetUserData(decodedToken)
  }
  
let router = createHashRouter([{
  path:"" , element:<Layout SetUserData={SetUserData} setSetUserData={setSetUserData}/>, children:[
    {index:true , element:<Login saveUserData={saveUserData}/>},
    {path:"dashBoard" , element: <ProtectedRoute><DashBoard/></ProtectedRoute>},
    {path:"products" , element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:"updateProduct/:id" , element:<ProtectedRoute><UpdateProduct/></ProtectedRoute>},
    {path:"addProduct" , element:<ProtectedRoute><AddProduct/></ProtectedRoute>},
    {path:"categories" , element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:"updateCategory/:id" , element:<ProtectedRoute><UpdateCategory/></ProtectedRoute>},
    {path:"addCategory" , element:<ProtectedRoute><AddCategory/></ProtectedRoute>},
    {path:"brands" , element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:"updateBrand/:id" , element:<ProtectedRoute><UpdateBrand/></ProtectedRoute>},
    {path:"addBrand" , element:<ProtectedRoute><AddBrand/></ProtectedRoute>},
    {path:"users" , element:<ProtectedRoute><Users/></ProtectedRoute>},
    {path:"updateUser/:id" , element:<ProtectedRoute><UpdateUser/></ProtectedRoute>},
    {path:"*" , element:<NotFound/>},
  ]
}])

return<>

<ProductContextProvider>
<Toaster/>
<RouterProvider router={router}></RouterProvider>
</ProductContextProvider>

  </>
}
