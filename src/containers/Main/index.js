import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import Money from './../../transforms/Money'
import Proptypes from 'prop-types'
import 'react-select/dist/react-select.css'
import { itemsPerPage } from './../../constants/utils'
import {
  initProducts,
} from './../../actions/products'
import ProductList from './../../components/ProductList'
import FilterSection from './../FilterSection'
import './styles.sass'

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      offset: 0,
    }
  }

  componentWillMount() {
    this.props.initProducts()
  }

  componentDidMount() {
    document.body.scrollTop = 0
    document.querySelector('.menu').classList.remove('open')
  }

  handlePageClick(data) {
    const selected = data.selected
    const offset = Math.ceil(selected * itemsPerPage)
    this.setState({ offset })
  }
  filterPrice(product) {
    const { filters } = this.props.products
    if (Number(filters.maxPrice) <= 0) {
      return Money(product.price) > Number(filters.minPrice)
    }
    return Money(product.price) < filters.maxPrice && Money(product.price) > Number(filters.minPrice)
  }
  filterAvailability(product) {
    const { filters } = this.props.products
    return ((product.available === filters.availability) || filters.availability === null)
  }
  filterQuantity(product) {
    const { filters } = this.props.products
    if (Number(filters.maxQuantity) <= 0) {
      return Money(product.price) > Number(filters.minPrice)
    }
    return product.quantity < filters.maxQuantity && product.quantity > Number(filters.minQuantity)
  }
  render() {
    const { data: products } = this.props.products
    const filtered = products
      .filter(this.filterPrice.bind(this))
      .filter(this.filterAvailability.bind(this))
      .filter(this.filterQuantity.bind(this))

    const prods = filtered.slice(this.state.offset, this.state.offset + itemsPerPage) //paginated products
    const pageCount = filtered.length / itemsPerPage
    return (
      <div>
        <FilterSection />
        <main className="main">
          <ProductList products={prods} />
        </main>
        <div className="containerPag">
            <ReactPaginate
               previousLabel={"previous"}
               nextLabel={"next"}
               breakLabel={<a href="">...</a>}
               breakClassName={"break-me"}
               pageCount={pageCount}
               marginPagesDisplayed={2}
               pageRangeDisplayed={5}
               onPageChange={(data) => this.handlePageClick(data)}
               containerClassName={"pagination"}
               subContainerClassName={"pages pagination"}
               activeClassName={"active"}
            />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}
Homepage.Proptypes = {
  initProducts: Proptypes.func
}
export default connect(mapStateToProps, { initProducts })(Homepage)
