/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'

import './index.css'

class CartItem extends Component {
  incrementCartItemQuantity = () => {
    const {item, incrementItemQuantity} = this.props
    const {id} = item
    incrementItemQuantity(id)
  }

  decrementCartItemQuantity = () => {
    const {item, decrementItemQuantity} = this.props
    const {id} = item
    decrementItemQuantity(id)
  }

  render() {
    const {item} = this.props

    return (
      <li className="cart-item-list-container">
        <div className="large-cart-item-container">
          <div className="cart-item-image-name-container">
            <img
              className="larger-cart-item-image"
              src={item.imageUrl}
              alt="cart-item"
            />
            <h1 className="cart-item-name">{item.name}</h1>
          </div>
          <div className="cart-item-quantity-container">
            <button
              type="button"
              className="cart-item-quantity-button"
              onClick={this.decrementCartItemQuantity}
            >
              -
            </button>
            <p className="cart-item-quantity-para">{item.quantity}</p>
            <button
              type="button"
              className="cart-item-quantity-button"
              onClick={this.incrementCartItemQuantity}
            >
              +
            </button>
          </div>
          <div className="cart-item-cost-container">
            <BiRupee />
            <p className="cart-item-price">{item.cost}.00</p>
          </div>
        </div>
        <div className="mobile-cart-item-container">
          <img
            className="mobile-cart-items-main-image"
            src={item.imageUrl}
            alt="cart-item"
          />
          <div className="mobile-cart-item-display-container">
            <h1 className="cart-item-name">{item.name}</h1>
            <div className="cart-item-quantity-container">
              <button
                type="button"
                className="cart-item-quantity-button"
                onClick={this.decrementCartItemQuantity}
              >
                -
              </button>
              <p className="cart-item-quantity-para">{item.quantity}</p>
              <button
                type="button"
                className="cart-item-quantity-button"
                onClick={this.incrementCartItemQuantity}
              >
                +
              </button>
            </div>
            <div className="cart-item-cost-container">
              <BiRupee />
              <p className="cart-item-price">{item.cost}.00</p>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default CartItem
