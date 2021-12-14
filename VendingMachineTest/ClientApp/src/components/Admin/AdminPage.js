import React, { Component } from 'react';
import { ProductList } from '../User/ProductList';
import classes from './AdminPage.module.css';
import defaultImg from '../../images/screen-1.jpg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialFieldValues = {
  id: '0',
  name: '',
  defaultImg: defaultImg,
  imageSrc: defaultImg,
  quantity: 0,
  cost: 0,
  imageName: '',
  imageFile: {},
};
export class AdminPage extends Component {
  _isMounted = false;

  constructor(props) {
    super();
    toast.configure();
    this.state = {
      productData: [],
      deposit: 0,
      isFetching: true,
      error: null,
      errors: {},
      values: initialFieldValues,
    };
    this.name = React.createRef();
    this.cost = React.createRef(0);
    this.quantity = React.createRef(0);
    this.img = React.createRef(0);
  }

  getProducts = () => {
    fetch('https://localhost:44373/api/Product')
      .then((resp) => resp.json())
      .then((result) => {
        this.setState({
          productData: result,
          productDataImmutable: JSON.parse(JSON.stringify(result)),
          isFetching: false,
        });
      })
      .catch((e) => {
        this.setState({ productData: null, isFetching: false, error: e });
      });
  };
  componentDidMount() {
    this.setState({ values: initialFieldValues });
    this._isMounted = true;
    this.getProducts();
  }
  onAdd = (data) => {
    console.log(data);
    this.setState((prev) => {
      let val = prev;
      val.id = data.guid;
      val.name = data.title;
      val.imageSrc = data.imageSrc;
      val.quantity = data.quantity;
      val.cost = data.cost;
      val.imageFile = data.imageFile;
      val.imageName = data.imageName;
      return { values: val };
    });
  };

  addOrEdit = (formData, onSuccess) => {
    if (formData.get('guid') === '0' || formData.get('guid') === undefined) {
      console.log(formData);
      fetch('https://localhost:44373/api/Product/', {
        method: 'POST',
        body: formData,
      });
    } else {
      fetch('https://localhost:44373/api/Product/', {
        method: 'PUT',
        body: formData,
      });
    }
    this.getProducts();
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    let blob = fetch(this.state.values.imageSrc, { mode: 'no-cors' }).then(
      (r) => r.blob()
    );
    console.log(blob);
    if (this.validate()) {
      console.log(this.state.values.id);
      const formData = new FormData();
      formData.append('guid', this.state.values.id);
      formData.append('title', this.state.values.name);
      formData.append('quantity', this.state.values.quantity);
      formData.append('cost', this.state.values.cost);
      formData.append('imageSrc', this.state.values.imageSrc);
      formData.append('imageName', this.state.values.imageName);
      formData.append('imageFile', this.state.values.imageFile);
      this.addOrEdit(formData, this.resetForm);
    } else {
      toast.error(`Validation error! `, {
        autoClose: 5000,
        position: 'top-right',
      });
    }
  };
  showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        this.setState((prev) => {
          let val = prev;
          val.id = '0';
          val.imageSrc = x.target.result;
          val.imageFile = imageFile;
          return { values: val };
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      this.setState({
        ...this.state.values,
        imageFile: null,
        imageSrc: this.defaultImageSrc,
      });
    }
  };

  handleInputChange = (e) => {
    this.setState((prev) => {
      prev.values.name = this.name.current.value;
      prev.values.quantity = this.quantity.current.value;
      prev.values.cost = this.cost.current.value;
      return { values: prev.values };
    });
  };
  validate = () => {
    let temp = {};
    temp.title = this.state.values.name === '' ? false : true;
    temp.imageSrc = this.state.values.imageSrc === defaultImg ? false : true;

    return Object.values(temp).every((x) => x === true);
  };

  resetForm = () => {
    this.setState({ values: initialFieldValues });
    // this.name.current.value = '';
    // this.cost.current.value = '';
    // this.quantity.current.value = '';
    // this.img.current.value = null;
  };

  render() {
    const { isFetching, error } = this.state;
    if (isFetching) {
      return <div>...Loading</div>;
    }

    if (error) return <div>{`Error: ${error.message}`}</div>;
    return (
      <div className={classes.container}>
        <div className={classes['editor-container']}>
          <div onClick={this.resetForm} className={classes.reset}>
            X
          </div>
          <form autoComplete="off" noValidate onSubmit={this.handleFormSubmit}>
            <div className="card">
              <img
                src={this.state.values.imageSrc}
                className={classes['card-img-top']}
                alt="..."
              />
              <div className={classes['card-body']}>
                <div className="form-group">
                  <input
                    ref={this.img}
                    type="file"
                    accept="image/*"
                    className={classes['form-control']}
                    onChange={this.showPreview}
                    id="image-uploader"
                  />
                </div>
                <div className={classes['form-control']}>
                  <input
                    className="form-control"
                    placeholder="Name"
                    ref={this.name}
                    name="productName"
                    value={this.state.values.name}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className={classes['form-control']}>
                  <input
                    min={0}
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    ref={this.quantity}
                    name="quantity"
                    value={this.state.values.quantity}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className={classes['form-control']}>
                  <input
                    type="number"
                    min={0}
                    id="cost"
                    ref={this.cost}
                    className="form-control"
                    placeholder="Cost"
                    name="cost"
                    value={this.state.values.cost}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className={classes['form-group']}>
                  <button type="submit" className="btn btn-dark">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className={classes['product-list-container']}>
          <ProductList
            productData={this.state.productData}
            onAdd={this.onAdd}
          />
        </div>
      </div>
    );
  }
}
