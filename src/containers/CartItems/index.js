import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateQuantity,
  removeProduct
} from './../../actions/cart';
import { ClipLoader } from 'react-spinners';

import { Link } from 'react-router';

import './styles.sass';

class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    };
  }
  updateQuantity(quantity) {
    const { id } = this.props.product;
    if (quantity === 0) {
      this.props.removeProduct(id);
    } else {
      this.props.updateQuantity(quantity, id);
    }
  }
  removeProduct() {
    const { id } = this.props.product;
    this.setState({ loading: true });
    setTimeout(() => {
        this.props.removeProduct(id);
        this.setState({ loading: false });
    }, 2000);
  }
  render() {
    const { id } = this.props.product;
    const product = this.props.cart[id];
    return (
      <div className="uIWrapper">
        <div className="upper">
          <div className="userImg" />
          <div className="itemInfo">
            <h3 className="itemName">
              <Link to={`/item/${id}`}>{ product.name }</Link>
            </h3>
            <div className="tradeBtnWrapper lower pull-right">
              <p className="quantity">
                Quantity:
                <input
                    className="btn btn-group border"
                    type="number"
                    value={product.quantityInCart}
                    onChange={(e) => {
                      this.updateQuantity(Number(e.target.value))
                    }}
                />
              </p>
            </div>
            <p className="itemCost frm">{ product.price }</p>
            <p className="addDate frm">{ product.available ? 'In Stock' : ' Not Available' }</p>
            <p className="itemDescription">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque nihil dicta temporibus incidunt fugit culpa similique ipsum sit? Hic ad beatae quidem repudiandae dignissimos tenetur consequuntur, ullam, accusantium earum at.</p>
            <div className="tradeBtnWrapper lower">
              <button
                  className="deleteBtn normalBtn"
                  onClick={() => this.removeProduct()}
                  style={{ width: 200 }}
              >
              {!this.state.loading && 'Remove Item'}
              {this.state.loading &&
                <ClipLoader
                  color={'white'}
                  size={16}
                  loading={this.state.loading}
                />
              }
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(
    {
      updateQuantity,
      removeProduct
    },
    dispatch
  )
);

export default connect(state => state, mapDispatchToProps)(CartItem);
