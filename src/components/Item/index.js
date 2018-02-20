import React, { Component } from 'react';
// import {Link} from 'react-router';
import { browserHistory } from 'react-router';

import cartIcon from './../../assets/icons/ic_cart_gray.png';
import './styles.sass';

class Item extends Component {
  render() {
    const { product } = this.props;
    return(
      <div className="item">
        <div className="content" onClick={()=>{
          browserHistory.push(`/item/${this.props.product.id}`);
        }}>
        <div className="thumbnail">
          <img src={product.image} className="img-thumbnail"/>
          <div className="caption">
            <h3>{product.name}</h3>
            <p className="description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
            <p>{product.price}</p>
            <p>
              <button className="declineBtn normalBtn pull-right marginRight">
                More...
              </button>
            </p>
          </div>
        </div>

        </div>
      </div>
    );
  }
}

export default Item;
