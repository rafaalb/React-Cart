import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getSubLevels,
  getProductsBySubLevel,
  sortProducts,
  filterProducts
} from './../../actions/products'
import FontAwesome from 'react-fontawesome'
import Select from 'react-select'
import { sortTypes } from './../../constants/utils'

import './styles.sass'

class FilterSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animate: false,
      selectedOption: [],
      selectedFilters: {
        minPrice: '',
        maxPrice: '',
        availability: null,
        minQuantity: 0,
        maxQuantity: 0,
      },
      selectedSort: '',
      showInputPrice: false,
      showInputAvailab: false,
      showInputQuantity: false,
    }
  }
  componentWillMount() {
    this.props.getSubLevels()
  }

  filterProduct(sel) {
    const val = sel ? sel.value : sel
    this.setState({
      selectedFilters: {
        ...this.state.selectedFilters,
        availability: val
      }
    }, () => {
      this.props.filterProducts(this.state.selectedFilters)
    })

  }
  handleChanges (sel) {
    const addedItem = sel[sel.length - 1]
    const id = addedItem ? addedItem.id : undefined  //filter the last added item and retrieve its sublevels
    this.props.getSubLevels(id)
    this.props.getProductsBySubLevel(id)
    this.setState({ selectedOption: sel })
    this.setState({ offset: 0 })
  }
  sortProducts(sel) {
    if (sel) {
      this.props.sortProducts(sel.value)
    }
    this.setState({ selectedSort: sel })
  }
  onInputFilterProduct(input, field) {
    this.setState({ selectedFilters: {
      ...this.state.selectedFilters,
      [field]: Number(input)
    }}, () => {
      this.props.filterProducts(this.state.selectedFilters)
    })
  }
  render() {
    const { selectedOption } = this.state
    return(
      <div>
        <ol className="breadcrumb">
          <Select
            name="form-field-name"
            value={selectedOption}
            multi
            onChange={(e) => this.handleChanges(e)}
            options={this.props.sublevels}
            style={{
              fontColor: 'black',
              backgroundColor: 'transparent',
              borderColor: 'transparent'
            }}
          />
        </ol>
        <div className="container-filter-sort">
        <div className="container-filter breadcrumb">
          <div className="col-md-12">
            <div className="col-md-4 priceFilter">
                <button
                    className="declineBtn normalBtn filterBtn"
                    onClick={() => this.setState({ showInputPrice: !this.state.showInputPrice })}
                >
                  Filter by Price
                </button>
                {this.state.showInputPrice && (
                  <div>
                    <input
                        type="number"
                        className="btn btn-group numberInput"
                        placeholder="Min"
                        value={this.state.selectedFilters.minPrice}
                        onChange={(e) => this.onInputFilterProduct(e.target.value, 'minPrice')}
                    />
                    <input
                        type="number"
                        className="btn btn-group numberInput"
                        placeholder="Max"
                        value={this.state.selectedFilters.maxPrice}
                        onChange={(e) => this.onInputFilterProduct(e.target.value, 'maxPrice')}
                    />
                  </div>
                )}
            </div>
            <div className="col-md-4">
                <button
                    className="declineBtn normalBtn filterBtn"
                    onClick={() => this.setState({ showInputAvailab: !this.state.showInputAvailab })}
                >
                  Filter by Availability
                </button>
                {this.state.showInputAvailab && (
                  <div style={{ marginTop: 10 }}>
                  <Select
                    name="form-field-name"
                    value={this.state.selectedFilters.availability}
                    onChange={(e) => this.filterProduct(e)}
                    options={[
                      { value: true, label: 'Available'},
                      { value: false, label: 'Not Available'}
                    ]}
                    className='selectBtn'
                  />
                  </div>
                )}
            </div>
            <div className="col-md-4">
                <button
                    className="declineBtn normalBtn filterBtn"
                    onClick={() => this.setState({ showInputQuantity: !this.state.showInputQuantity })}
                >
                  Filter by Quantity
                </button>
                {this.state.showInputQuantity && (
                  <div>
                    <input
                        type="number"
                        className="btn btn-group numberInput"
                        placeholder="Min"
                        value={this.state.selectedFilters.minQuantity}
                        onChange={(e) => this.onInputFilterProduct(e.target.value, 'minQuantity')}
                    />
                    <input
                        type="number"
                        className="btn btn-group numberInput"
                        placeholder="Max"
                        value={this.state.selectedFilters.maxQuantity}
                        onChange={(e) => this.onInputFilterProduct(e.target.value, 'maxQuantity')}
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className="container-sort">
          <ol className="breadcrumb">
            <li>
              <FontAwesome
                 className="super-crazy-colors"
                 name="filter"
                 size="lg"
                 spin={this.state.animate}
                 style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
               />
             </li>
             <i className="sort-text">
              Sort
                <i className="sorted">
                <Select
                  name="form-field-name"
                  value={this.state.selectedSort}
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    borderBottomColor: 'gray'
                  }}
                  onChange={(e) => this.sortProducts(e)}
                  options={sortTypes}
                />
                </i>
             </i>
           </ol>
         </div>
      </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSubLevels: (id) => {
      dispatch(getSubLevels(id))
    },
    getProductsBySubLevel: (id) => {
      dispatch(getProductsBySubLevel(id))
    },
    sortProducts: (sort) => {
      dispatch(sortProducts(sort))
    },
    filterProducts: (filt) => {
      dispatch(filterProducts(filt))
    }
  }
}

export default connect(state => state, mapDispatchToProps)(FilterSection)
