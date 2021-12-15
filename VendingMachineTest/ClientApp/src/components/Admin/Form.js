import React, { useState, useEffect } from 'react';
import defaultImg from '../../images/screen-1.jpg';

const initialFieldValues = {
  guid: '0',
  name: '',
  quantity: 0,
  cost: 0,
  imageName: '',
  imageFile: {},
  imageSrc: defaultImg,
};

export default function Form(props) {
  const { addOrEdit, recordForEdit } = props;

  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (recordForEdit != null) setValues(recordForEdit);
  }, [recordForEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImg,
      });
    }
  };

  const validate = () => {
    let temp = {};
    temp.name = values.name === '' ? false : true;
    temp.imageSrc = values.imageSrc === defaultImg ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    document.getElementById('image-uploader').value = null;
    setErrors({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append('guid', values.guid);
      formData.append('cost', values.cost);
      formData.append('quantity', values.quantity);
      formData.append('imageName', values.imageName);
      formData.append('imageFile', values.imageFile);
      addOrEdit(formData, resetForm);
    }
  };

  const applyErrorClass = (field) =>
    field in errors && errors[field] === false ? ' invalid-field' : '';

  return (
    <>
      <div className="container text-center">
        <p className="lead">An Employee</p>
      </div>
      <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
        <div className="card">
          <img src={values.imageSrc} className="card-img-top" alt="..." />
          <div className="card-body">
            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                className={'form-control-file' + applyErrorClass('imageSrc')}
                onChange={showPreview}
                id="image-uploader"
              />
            </div>
            <div className="form-group">
              <input
                className={'form-control' + applyErrorClass('employeeName')}
                placeholder="Employee Name"
                name="employeeName"
                value={values.employeeName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="quantity"
                name="quantity"
                value={values.quantity}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="cost"
                name="cost"
                value={values.cost}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-light">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
