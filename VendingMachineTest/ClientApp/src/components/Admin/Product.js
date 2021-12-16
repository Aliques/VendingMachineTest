import React, { useState, useEffect } from 'react';
import './Product.css';
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
export default function Product(props) {
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
      toast.warning('Check the name and image!', {
        autoClose: 3000,
        position: 'top-right',
      });
    }
  };

  return (
    <div className="editor-container">
      <div onClick={resetForm} className="reset">
        X
      </div>
      <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
        <div className="card">
          <img src={values.imageSrc} className="card-img-top" alt="..." />
          <div className="controls-wrapper">
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={showPreview}
                id="image-uploader"
              />
            </div>
            <div className="form-froup">
              <label for="name">Name:</label>
              <input
                className="common-control-styles"
                placeholder="Name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-froup">
              <label for="cost">Cost:</label>
              <input
                required
                min={0}
                className="common-control-styles"
                type="number"
                placeholder="Cost"
                name="cost"
                value={values.cost}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-froup">
              <label for="quantity">Quantity:</label>
              <input
                min={0}
                className="common-control-styles"
                id="quantity"
                type="number"
                placeholder="Quantity"
                name="quantity"
                value={values.quantity}
                onChange={handleInputChange}
              />
            </div>
            <div className="submit-container">
              <button type="submit" className="submit common-control-styles">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
