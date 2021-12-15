import React, { useState, useEffect } from 'react';
import classes from './Employee.module.css';
import defaultImageSrc from '../../images/screen-1.jpg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialFieldValues = {
  guid: '0',
  name: '',
  quantity: 0,
  cost: 0,
  imageName: '',
  imageSrc: defaultImageSrc,
  imageFile: null,
};
export default function Employee(props) {
  toast.configure();
  const { addOrEdit, recordForEdit } = props;

  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.resetForm) {
      resetForm();
    }
    if (recordForEdit != null) {
      setValues(recordForEdit);
    }
  }, [recordForEdit, props.resetForm]);

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
        imageSrc: defaultImageSrc,
      });
    }
  };

  const validate = () => {
    let temp = {};
    temp.name = values.name === '' ? false : true;
    temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    document.getElementById('image-uploader').value = null;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append('guid', values.guid);
      formData.append('name', values.name);
      formData.append('quantity', values.quantity);
      formData.append('cost', values.cost);
      formData.append('imageName', values.imageName);
      formData.append('imageFile', values.imageFile);
      addOrEdit(formData, resetForm);
    } else {
      toast.warning('Сheck the name and image!', {
        autoClose: 3000,
        position: 'top-right',
      });
    }
  };

  const applyErrorClass = (field) =>
    field in errors && errors[field] === false ? ' invalid-field' : '';

  return (
    <div className={classes['editor-container']}>
      <div onClick={resetForm} className={classes.reset}>
        X
      </div>
      <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
        <div className="card">
          <img
            src={values.imageSrc}
            className={classes['card-img-top']}
            alt="..."
          />
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
                placeholder="Name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="Cost"
                name="cost"
                value={values.cost}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                name="quantity"
                value={values.quantity}
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
    </div>
  );
}
