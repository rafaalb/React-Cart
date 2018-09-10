import React from 'react'
// import {Link} from 'react-router'
import Proptypes from 'prop-types'
import { browserHistory } from 'react-router'
import './styles.sass'

const Item = ({ product }) => {
    return(
      <div className="item">
        <div className="content" onClick={()=>{
          browserHistory.push(`/item/${product.id}`)
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
    )
}

Item.propTypes = {
    product: Proptypes.object.isRequired
}

export default Item
