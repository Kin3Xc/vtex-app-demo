/* eslint-disable no-console */
import React, { useState, useContext } from 'react'
import { Modal, Button } from 'vtex.styleguide'
import { ProductContext } from 'vtex.product-context'
import './styles/main.css'

function CurrentModal() {
  const [isOpen, setIsOpen] = useState(false)
  const { product }: any = useContext(ProductContext)

  console.log('product: ', product)

  const onHandleButton = () => setIsOpen(!isOpen)

  return (
    <>
      <Button onClick={onHandleButton}>Abrir modal</Button>
      <Modal isOpen={isOpen} onClose={onHandleButton}>
        <div className="dark-gray product-detail">
          <img src={product?.items?.[0]?.images?.[0]?.imageUrl} />
          <div className="product-info">
            <h1>{product?.productName}</h1>
            <p>{product?.description}</p>
            <h3>Precio: {product?.priceRange?.sellingPrice?.highPrice}</h3>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default CurrentModal
