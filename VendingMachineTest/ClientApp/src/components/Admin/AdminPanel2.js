import React, { useState, useEffect } from 'react';
import Employee from './Employee';
import classes from '../Admin/AdminPage2.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminPanel2() {
  toast.configure();
  const [resetForm, doResetForm] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  useEffect(() => {
    refreshEmployeeList();
  }, []);

  function refreshEmployeeList() {
    fetch('https://localhost:44373/api/Product')
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result);
        setEmployeeList(result);
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
          refreshEmployeeList();
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
          refreshEmployeeList();
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
          refreshEmployeeList();
          doResetForm(true);
          toast.success(`Item is deleted! `, {
            autoClose: 3000,
            position: 'top-right',
          });
        })
        .catch((err) => console.log(err));
  };

  return (
    <div className={classes.container}>
      <Employee
        addOrEdit={addOrEdit}
        resetForm={resetForm}
        recordForEdit={recordForEdit}
      />
      <div className={classes['list-container']}>
        {employeeList.map((product) => (
          <div
            key={product.guid}
            className={classes['card-container']}
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
              className={classes.reset}
            >
              X
            </div>
            <img className={classes.size} src={product.imageSrc} alt="..." />
            <div className={classes.description}>
              <div className={classes.title}>{product.name}</div>
              <div>Total count: {product.quantity}</div>
              <div>Cost: {product.cost}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
