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

  function refreshProductList() {
    fetch('https://localhost:44373/api/Product')
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result);
        setProductList(result);
      })
      .catch((err) => console.log(err));
  }

  const addOrEdit = (formData, onSuccess) => {
    if (formData.get('guid') === '0')
      fetch('https://localhost:44373/api/Product/', {
        method: 'POST',
        body: formData,
      })
        .then((res) => {
          refreshProductList();
          doResetForm(true);
          toast.success(`Item is created! `, {
            autoClose: 3000,
            position: 'top-right',
          });
        })
        .catch((err) => console.log(err));
    else
      fetch('https://localhost:44373/api/Product/', {
        method: 'PUT',
        body: formData,
      })
        .then((res) => {
          refreshProductList();
          doResetForm(true);
          toast.success(`Item is updated! `, {
            autoClose: 3000,
            position: 'top-right',
          });
        })
        .catch((err) => console.log(err));
  };

  const showRecordDetails = (data) => {
    setRecordForEdit(data);
  };

  const onDelete = (id) => {
    if (window.confirm('Are you sure to delete this record?'))
      fetch(`https://localhost:44373/api/Product/${id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          refreshProductList();
          doResetForm(true);
          toast.success(`Saved! `, {
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
              <div>Total count: {product.quantity}</div>
              <div>Cost: {product.cost}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
