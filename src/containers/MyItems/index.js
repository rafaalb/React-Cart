import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import CartItem from './../CartItems';
import Money from './../../transforms/Money';
import { Link, browserHistory } from 'react-router';
import { resetCart } from './../../actions/cart';
import './styles.sass';

class MyItems extends Component {

  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');
  }

  renderItems() {
    const haveItems = _.size(this.props.cart);
    if (haveItems > 0) {
      return Object.keys(this.props.cart).map((key) => {
           return <CartItem key={key} product={this.props.cart[key]} />;
       });
    }
    return (
      <div>
        <legend>
          <h1>Shopping Cart</h1>
          <p>Your Shopping Cart is empty.</p>
          <p>
          <Link className="backLink" to="/">
            <span className="small">
              <svg fill="#000000" height="13" viewBox="0 0 18 15" width="13" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10l5 5 5-5z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </span>Start to add Products!
          </Link>
          </p>
        </legend>
      </div>
    )

  }
  resetCart() {
    this.props.resetCart();
    browserHistory.push(`/`);
  }
  render() {
    const total = Object.keys(this.props.cart).reduce((acum, key) => (
      (acum + (Money(this.props.cart[key].price) * this.props.cart[key].quantityInCart))
     ), 0);
    return (
      <div className="myItemsWrapper">
        <div className="addTradeWrapper" />
        {this.renderItems()}
        <div className="pull-right">
          <p>Total: {total}</p>
          <button
              className="deleteBtn normalBtn"
              onClick={() => this.resetCart()}
              style={{ width: 200, marginTop: 50 }}
          >
            Pay
          </button>
        </div>
      </div>
    );
  }
}

export default connect(state => state, { resetCart })(MyItems);
