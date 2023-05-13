import React, { useContext, useEffect, useState } from 'react'
import { productContext } from '../../Context/ProductsContext'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import styles from "./Products.module.css"
import { Helmet } from 'react-helmet';
import ReactPaginate from 'react-paginate';


export default function Products() {

  useEffect(()=>{
    getProducts()
},[])


let {displayProduct,deleteProduct} = useContext(productContext)
const [products, setProducts] = useState(null)
const [page, setPage] = useState(null)

async function getProducts(page){
    let response = await displayProduct("products",page)

    setProducts(response.data)
}

async function handlePageClick(data){
  let page = data.selected+1

  setPage(page)
  getProducts(page)

}


async function deleteProductDetails(id){
  let response = await deleteProduct(id)
  if(response?.status === 200){
    swal("Good job!", "The product has been successfully deleted", "success");
    getProducts(page)
  }

}


return <>
         <Helmet>
        <title>Products</title>
        </Helmet>
 <div className="main ">
 {products?<div className='mx-4 py-4'>
    <div className='d-flex justify-content-between  '>
    <h2 className='mb-0 '>Products</h2>
    <Link to={"/addProduct"}>
    <button className='btn btn-success text-center fw-bold'>Create New Product</button>
    </Link>
    </div>
    <div className="card my-4 shadow-sm">
  <div className="card-body p-4">
    <div className="row">

      {products?.result?.map((product,index)=><div key={index} className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card shadow p-3">
            <img src={product.image} className='w-100' height={150} alt="Product"/>
          <div className="info-wrap">
            <p className="text-muted h5 text-center mb-0 mt-2 text-truncate ">{product.name}</p>
            <p className='fs-3 text-success text-center'>{product.priceAfterDiscount}<sup className='fs-6 '>LE</sup><sub><del className="text-danger h6 ">{product.price!==product.priceAfterDiscount?product.price:null} </del> </sub></p>

              <div >
              <Link to={`/updateProduct/${product._id}`}>
                <button className="btn btn-sm btn-outline-success p-2  w-50" >
                <i className="fas fa-pen"></i>
                </button>
              </Link>

                <button onClick={()=>deleteProductDetails(product._id)} className="btn btn-sm btn-outline-danger p-2 w-50 ">
                  <i className="fas fa-trash-alt"></i>
                </button>
                
              </div>
          </div>




        </div>
      </div>
      
      )}
    {products.pages!==1?  <ReactPaginate
        previousLabel="< previous"
        nextLabel="next >"
        pageCount={products.pages}
        onPageChange={handlePageClick}
        renderOnZeroPageCount={null}
        containerClassName='pagination justify-content-center'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        activeClassName='active'
      />:null}

    </div>

  </div>
</div>

    </div>:null}

  </div>
</>
}
