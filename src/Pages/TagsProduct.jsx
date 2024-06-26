import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByTagsAsync, selectProductByTag,  selectProductsError, selectProductsLoading } from '../features/Products/AllProduct/productSlice';
import { useLocation } from 'react-router-dom';

const TagsProduct = () => {
    const dispatch = useDispatch();

    const state = useLocation();
    const product = useSelector(selectProductByTag)
    const loading = useSelector(selectProductsLoading)
    const error = useSelector(selectProductsError)
   
    const Tagname = state.pathname.split('/')[2];
    // TODO: Fix the api for products
    console.log(product);

    useEffect(()=>{
        dispatch(fetchProductByTagsAsync(Tagname))
    }, [dispatch, Tagname])


  return (
    <div>TagsProduct</div>
  )
}

export default TagsProduct