import React, { Component } from 'react';
import { fetchProduct } from './../../actions/products';
import { addToCart } from './../../actions/cart';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router';
import './styles.sass';

class ItemPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    };
  }
  componentWillMount() {
    const { id } = this.props.params;
    this.props.fetchProduct(id);
  }
  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');
  }
  addToCart(product) {
    this.setState({ loading: true });
    setTimeout(() => {
        this.props.addToCart(product);
        this.setState({ loading: false });
    }, 2000);

  }
  render() {
    const { activeProduct } = this.props;
    return (
      <div className="itemPageWrapper">
        <img className="itemImgWrapper" src="https://picsum.photos/350/200/?random"/>
        <div className="itemInfoWrapper">
          <Link className="backLink" to="/">
            <span className="small">
              <svg fill="#000000" height="13" viewBox="0 0 18 15" width="13" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10l5 5 5-5z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </span>All Items
          </Link>
          <h3 className="itemName">{activeProduct.name}</h3>
          <p className="itemCost frm">{activeProduct.price}</p>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea nulla modi, odit explicabo hic doloremque commodi ab molestiae. Iure voluptatem labore et aliquid soluta inventore expedita quam vel a earum!
          </p>
          <p className="seller frm">Sublevel <span>1</span></p>
          <button
              className="reqTradeBtn normalBtn"
              onClick={() => this.addToCart(activeProduct)}
              style={{ width: 200 }}
          >
            {!this.state.loading && 'Add to Cart'}
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
    );
  }
}

export default connect(state => state, { fetchProduct, addToCart })(ItemPage);
