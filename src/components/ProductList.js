import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ProductListItem from './ProductListItem'

class ProductList extends Component {
  constructor(props) {
    super(props) 
    this.state = {

    }
  }
  renderList() {
    const { products } = this.props
    if (!products) {
      return null
    }
    return products.map(product =>
      <ProductListItem product={product} key={product.id} />
    ) 
  }
  render() {
    return (
      <div style={{ display: 'contents' }}>
        {this.renderList()}
      </div>
    )
  }
}

ProductList.Proptypes = {
  products: PropTypes.object
}

export default ProductList
