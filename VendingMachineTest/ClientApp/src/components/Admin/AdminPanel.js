import React, { useState, useEffect } from 'react';
import '../Admin/AdminPage.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from './Product';
import CoinsManager from './CoinsManager';

export default function AdminPanel() {
  toast.configure();
  const [resetForm, doResetForm] = useState(false);
  const [productList, setProductList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  useEffect(() => {
    refreshProductList();
  }, []);

  async function refreshProductList() {
    await fetch('product', { 'Content-Type': 'application/json' })
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result);
        setProductList(result);
      })
      .catch((err) => console.log(err));
  }

  const addOrEdit = (formData, onSuccess) => {
    console.log(formData);
    if (formData.get('guid') === '0')
      fetch('product', {
        method: 'POST',
        body: formData,
        'Content-Type': 'application/json',
      })
        .then((res) => {
          console.log(res);
          refreshProductList();
          doResetForm(true);
          if (res.status === 200) {
            toast.success(`Item is created! `, {
              autoClose: 3000,
              position: 'top-right',
            });
          }
        })
        .catch((err) => console.log(err));
    else
      fetch('product', {
        method: 'PUT',
        body: formData,
      })
        .then((res) => {
          refreshProductList();
          doResetForm(true);
          if (res.status === 200) {
            toast.success(`Item is updated! `, {
              autoClose: 3000,
              position: 'top-right',
            });
          }
        })
        .catch((err) => console.log(err));
  };

  const showRecordDetails = (data) => {
    setRecordForEdit(data);
  };

  const onDelete = (id) => {
    if (window.confirm('Are you sure to delete this record?'))
      fetch(`product/${id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          refreshProductList();
          doResetForm(true);
          toast.success(`Deleted! `, {
            autoClose: 3000,
            position: 'top-right',
          });
        })
        .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="options">
        <Product
          addOrEdit={addOrEdit}
          resetForm={resetForm}
          recordForEdit={recordForEdit}
        />
        <CoinsManager />
      </div>
      <div className="list-container">
        {productList.map((product) => (
          <div
            key={product.guid}
            className="card-container"
            onClick={(e) => {
              e.stopPropagation();
              showRecordDetails(product);
            }}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                onDelete(product.guid);
              }}
              className="reset"
            >
              X
            </div>
            <img className="size" src={product.imageSrc} alt="..." />
            <div className="description">
              <div className="title">{product.name}</div>
              <div>Total Quantity: {product.quantity}</div>
              <div>Cost: {product.cost}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
