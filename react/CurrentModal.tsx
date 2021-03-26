/* eslint-disable no-console */
import React, { useState, useContext } from 'react'
import { Modal, Button } from 'vtex.styleguide'
import { ProductContext } from 'vtex.product-context'
import './styles/main.css' // ?
import { useQuery, useMutation } from 'react-apollo'

import getFormTest from './components/graphql/query.getFormTest.gql'
import createDocument from './components/graphql/mutation.createDocument.gql'

function CurrentModal() {
  const [isOpen, setIsOpen] = useState(false)
  // get product on the context
  const { product }: any = useContext(ProductContext)
  // get data from master data form
  const resFormTest: any = useQuery(getFormTest, {
    variables: {
      acronym: 'ET',
      fields: ['name', 'email', 'phone', 'comment', 'address'],
      id: '218c01a3-8e59-11eb-82ac-02e8ba8f9d77',
    },
  })

  const [saveDocument] = useMutation(createDocument)

  const documentPlaceholder = {
    acronym: 'ET',
    document: {
      fields: [
        {
          key: 'name',
          value: 'Testing01',
        },
        {
          key: 'email',
          value: 'test01@mail.com',
        },
        {
          key: 'age',
          value: '10',
        },
        {
          key: 'phone',
          value: '1234567890',
        },
        {
          key: 'comment',
          value: 'Esto es una prueba de guardado desde una react app 01',
        },
        {
          key: 'address',
          value: 'Montería Cordoba, Colombia',
        },
      ],
    },
  }

  const onCreateDocument = async () => {
    const res = await saveDocument({ variables: documentPlaceholder })

    console.log('response:', res)
  }

  console.log('form: ', resFormTest)
  console.log('product: ', product)

  const onHandleButton = () => setIsOpen(!isOpen)

  return (
    <>
      <Button onClick={onHandleButton}>Vista rápida</Button>
      <Button onClick={onCreateDocument}>Create a new record form</Button>

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
