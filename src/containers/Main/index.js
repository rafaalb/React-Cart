import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import Proptypes from 'prop-types';
import 'react-select/dist/react-select.css';
import { itemsPerPage } from './../../constants/utils';
import {
  initProducts,
  getSubLevels,
  getProductsBySubLevel,
  sortProducts
} from './../../actions/products';
import Item from './../../components/Item/index';
import FilterSection from './../FilterSection';
import './styles.sass';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
    };
  }

  componentWillMount() {
    this.props.initProducts();
  }

  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');
  }

  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * itemsPerPage);
    this.setState({ offset });
  }
  renderProducts() {
    const { products } = this.props;
    const prods = products.slice(this.state.offset, this.state.offset + itemsPerPage); //paginated products
    return prods.map((p, i) => <Item key={i} product={p} />);
  }
  render() {
    const pageCount = this.props.products.length / itemsPerPage;
    return (
      <div>
      <FilterSection />
      <main className="main">
        {this.renderProducts()}
      </main>
      <div className="containerPag">
          <ReactPaginate previousLabel={"previous"}
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
    );
  }
}

Homepage.Proptypes = {
  initProducts: Proptypes.func
};
export default connect(state => state,
  {
    initProducts,
    getSubLevels,
    getProductsBySubLevel,
    sortProducts
  })(Homepage);
