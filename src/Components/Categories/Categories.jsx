import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import { productContext } from '../../Context/ProductsContext';
import styles from "./Categories.module.css"
import { Helmet } from 'react-helmet';
import ReactPaginate from 'react-paginate';

export default function Categories() {


  useEffect(()=>{
    getCategory()
},[])

let {displayProduct,deleteCategory} = useContext(productContext)
const [category, setCategory] = useState(null)
const [page, setPage] = useState(null)
async function getCategory(page){
    let response = await displayProduct("categories",page)

    setCategory(response.data)
}

async function handlePageClick(data){
  let page = data.selected+1
;
  setPage(page)
  getCategory(page)
}

async function deleteCategoryDetails(id){
  let response = await deleteCategory(id)
  if(response.status === 200){
    swal("Good job!", "The category has been successfully deleted", "success");
    getCategory(page)
  }

}




  return <>
        <Helmet>
        <title>Categories</title>
        </Helmet>
  <div className="main ">
  {category?<div className='mx-4 py-4'>
    <div className='d-flex justify-content-between  '>
    <h2 className='mb-0 '>Category</h2>
    <Link to={"/addCategory"}>
    <button className='btn btn-success  fw-bold  d-flex'>Create New Category</button>
    </Link>
    </div>
    <div className="card my-4 shadow-sm">
  <div className="card-body p-4">
    <div className="row">

      {category.result.map((product,index)=><div key={index} className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card shadow p-3">
            <img src={product.image} className='w-100' height={150} alt="Product"/>
          <div className="info-wrap">
            <p className="text-muted h5 text-center  my-2 text-truncate ">{product.name}</p>
              <div >
              <Link to={`/updateCategory/${product._id}`}>
                <button className="btn btn-sm btn-outline-success p-2  w-50" >
                <i className="fas fa-pen"></i>
                </button>
              </Link>
                <button onClick={()=>deleteCategoryDetails(product._id)} className="btn btn-sm btn-outline-danger p-2 w-50 ">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
          </div>
        </div>
      </div>
      )}


    </div>
    {category.pages!==1?  <ReactPaginate
        previousLabel="< previous"
        nextLabel="next >"
        pageCount={category.pages}
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
