import React, { Component } from 'react' 
import { Link } from 'react-router' 
import _ from 'lodash' 
import { connect } from 'react-redux' 
import Proptypes from 'prop-types' 
import './styles.sass' 

import cartIcon from './../../assets/icons/ic_cart_gray@2x.png' 

class Header extends Component {
  constructor(props) {
    super(props) 
    this.state = {} 
  }

  componentWillMount() {
    this.previousWidth = 0 
    this.menuButton = (
      <button
        className="menuBtn"
        onClick={() => document.querySelector(".menu").classList.toggle("open")}
      >
        MENU
      </button>
    ) 

    this.setMenuState(window.innerWidth) 
    this.previousWidth = window.innerWidth 

  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setMenuState(window.innerWidth) 
    }) 
  }

  setMenuState(width) {
    if (this.previousWidth !== width) {
      if (width > 768) {
        const menu = document.querySelector('div.menu') 
        if(menu) {
          menu.classList.remove("open") 
        }
        this.setState({ menuActive: false }) 
      } else {
        this.setState({ menuActive: true }) 
      }
      this.previousWidth = width 
    }
  }

  render() {
    const { cart } = this.props 
    return (
      <header className="header">
        <h1>
          <Link onlyActiveOnIndex={true} to="/" className="logo">
            React Cart
          </Link>
        </h1>
        {this.state.menuActive ? this.menuButton: ""}
        <div className="menu">
          <Link onlyActiveOnIndex={true} key={1} to="/" activeClassName="activeNavLink" className="navLink">
            Home
          </Link>
          <Link onlyActiveOnIndex={true} key={3} to="/myItems" activeClassName="activeNavLink" className="navLink">
              <div className="containerCart">
                <div className="rounded">
                  <i className="text">{_.size(cart)}</i>
                </div>
                <img src={cartIcon} className="cart" />
              </div>
          </Link>
        </div>
      </header>
    ) 
  }
}

const mapStateToProps = (state) => {
  return state 
} 

Header.propTypes = {
    cart: Proptypes.object.isRequired
} 

export default connect(mapStateToProps)(Header) 
