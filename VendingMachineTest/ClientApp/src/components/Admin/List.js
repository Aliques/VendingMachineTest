import React, { useState, useEffect } from 'react';
import Employee from './Employee';
import axios from 'axios';
import { ProductList } from '../User/ProductList';
import classes from './AdminPage.module.css';

export default function List() {
  const [productList, setProductList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);

  useEffect(() => {
    refreshEmployeeList();
  }, []);

  //   const employeeAPI = (url = 'https://localhost:44353/api/Employee/') => {
  //     return {
  //       fetchAll: () => axios.get(url),
  //       create: (newRecord) => axios.post(url, newRecord),
  //       update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
  //       delete: (id) => axios.delete(url + id),
  //     };
  //   };

  function refreshEmployeeList() {
    fetch('https://localhost:44373/api/Product')
      .then((resp) => resp.json())
      .then((result) => {
        setProductList(result);
      })
      .catch((e) => {});
  }

  const addOrEdit = (formData, onSuccess) => {
    if (formData.get('employeeID') === '0')
      fetch('https://localhost:44373/api/Product/', {
        method: 'POST',
        body: formData,
      }).catch((err) => console.log(err));
    else
      fetch('https://localhost:44373/api/Product/', {
        method: 'PUT',
        body: formData,
      }).catch((err) => console.log(err));
  };

  const showRecordDetails = (data) => {
    setRecordForEdit(data);
  };

  const onDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure to delete this record?'))
      fetch(`https://localhost:44373/api/Product/${id}`, {
        method: 'DELETE',
      }).then((o) => {
        refreshEmployeeList();
      });
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="jumbotron jumbotron-fluid py-4">
          <div className="container text-center">
            <h1 className="display-4">Employee Register</h1>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <Employee addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
      </div>
      <div className="col-md-8">
        <div className={classes['product-list-container']}>
          <ProductList
            onDelete={onDelete}
            productData={productList}
            showRecordDetails={showRecordDetails}
          />
        </div>
      </div>
    </div>
  );
}
