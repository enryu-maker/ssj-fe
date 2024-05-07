import React from 'react';
import { useParams } from 'react-router-dom';
import { productsData } from '../data';

function ProductDetail() {
  const { productId } = useParams();
  console.log(productId);

  const thisProduct = productsData.find((prod) => prod.id === productId);
  return (
    <div className='grid grid-cols-2'>
      <div>
        <img
          src={thisProduct?.imgUrl}
          alt=''
        />
      </div>
      <div>
        <h1>{thisProduct?.name}</h1>
      </div>
    </div>
  );
}

export default ProductDetail;
