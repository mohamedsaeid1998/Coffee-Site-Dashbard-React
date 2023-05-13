import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import styles from "./Brands.module.css"
import { productContext } from '../../Context/ProductsContext';
import { Helmet } from 'react-helmet';
import ReactPaginate from 'react-paginate';

export default function Brands() {
  useEffect(()=>{
    getBrand()
},[])

let {displayProduct,deleteBrand} = useContext(productContext)
const [brand, setBrand] = useState(null)
const [page, setPage] = useState(null)

async function getBrand(page){
    let response = await displayProduct("brands",page)

    setBrand(response.data)
}

async function handlePageClick(data){
  let page = data.selected+1

  setPage(page)
  getBrand(page)
}

async function deleteBrandDetails(id){
  let response = await deleteBrand(id)
  if(response.status === 200){
    swal("Good job!", "The brand has been successfully deleted", "success");
    getBrand(page)
  }

}
  return <>
         <Helmet>
        <title>Brands</title>
        </Helmet>
  <div className="main ">
  {brand?<div className='mx-4 py-4'>
    <div className='d-flex justify-content-between  '>
    <h2 className='mb-0 '>Brands</h2>
    <Link to={"/addBrand"}>
    <button className='btn btn-success  fw-bold  d-flex'>Create New Brand</button>

    </Link>
    </div>
    <div className="card my-4 shadow-sm">
  <div className="card-body p-4">
    <div className="row">

      {brand.result.map((product,index)=><div key={index} className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card shadow p-3">
            <img src={product.image} className='w-100' height={150} alt="Product"/>
          <div className="info-wrap">
            <p className="text-muted h5 text-center  my-2 text-truncate ">{product.name}</p>
              <div >
              <Link to={`/updateBrand/${product._id}`}>
                <button className="btn btn-sm btn-outline-success p-2  w-50" >
                <i className="fas fa-pen"></i>
                </button>
              </Link>

                <button onClick={()=>deleteBrandDetails(product._id)} className="btn btn-sm btn-outline-danger p-2 w-50 ">
                  <i className="fas fa-trash-alt"></i>
                </button>
                
              </div>
          </div>




        </div>
      </div>
      )}


    </div>
    {brand.pages!==1?  <ReactPaginate
        previousLabel="< previous"
        nextLabel="next >"
        pageCount={brand.pages}
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

    </div>:null}

  </div>
  </>
}
