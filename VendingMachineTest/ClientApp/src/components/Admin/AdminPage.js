import React, { Component } from 'react';
import { ProductList } from '../User/ProductList';
import classes from './AdminPage.module.css';
import defaultImg from '../../images/screen-1.jpg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialFieldValues = {
  guid: '0',
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
      isFetching: true,
      error: null,
      errors: {},
      values: { ...initialFieldValues },
    };
    this.name = React.createRef('');
    this.cost = React.createRef(0);
    this.quantity = React.createRef(0);
    this.img = React.createRef(0);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    return this.props.productData !== prevProps.productData;
  }
  onDelete = (guid) => {
    this.setState({ isFetching: true });
    fetch(`https://localhost:44373/api/Product/${guid}`, {
      method: 'DELETE',
    })
      .then((o) => {
        this.setState({ isFetching: false }, () => this.getProducts());
      })
      .catch((e) => {
        this.setState({ isFetching: false, error: e });
      });
    this.setState({ isFetching: false }, () => this.getProducts());
  };

  getProducts = () => {
    fetch('https://localhost:44373/api/Product')
      .then((resp) => resp.json())
      .then((result) => {
        this.setState({
          productData: result,
          isFetching: false,
        });
      })
      .catch((e) => {
        this.setState({ productData: null, isFetching: false, error: e });
      });
    this.resetForm();
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
      val.guid = data.guid;
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
    this.setState({ isFetching: true });
    if (formData.get('guid') === '0') {
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
    this.setState({ isFetching: false }, () => this.getProducts());
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(this.state.values.imageSrc, { mode: 'no-cors' }).then((r) =>
      r.blob()
    );
    if (this.validate()) {
      console.log(this.state.values.guid);
      const formData = new FormData();
      formData.append('guid', this.state.values.guid);
      formData.append('title', this.name.current.value);
      formData.append('quantity', this.quantity.current.value);
      formData.append('cost', this.cost.current.value);
      formData.append('imageSrc', this.state.values.imageSrc);
      formData.append('imageName', this.state.values.imageName);
      formData.append('imageFile', this.state.values.imageFile);
      this.addOrEdit(formData);
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
          val.guid = '0';
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
      let val = prev;
      if (val.values.guid.length < 5) {
        val.values.guid = '0';
      }
      val.values.name = this.name.current.value;
      val.values.quantity = this.quantity.current.value;
      val.values.cost = this.cost.current.value;
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
    this.setState((prev) => {
      return { values: initialFieldValues };
    });
    // this.name.current.value = '';
    // this.cost.current.value = 0;
    // this.quantity.current.value = 0;
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
            isFetching={this.state.isFetching}
            onDelete={this.onDelete}
            productData={this.state.productData}
            onAdd={this.onAdd}
          />
        </div>
      </div>
    );
  }
}
