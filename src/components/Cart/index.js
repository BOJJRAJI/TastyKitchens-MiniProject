import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'
import './index.css'

const cartStatusConstants = {
  initial: 'INITIAL',
  cartItemsFound: 'SUCCESS',
  noCartItems: 'FAILURE',
  paymentSuccess: 'PAYMENT',
}

class Cart extends Component {
  state = {cartData: [], cartStatus: cartStatusConstants.initial}

  componentDidMount() {
    this.getTheCartData()
  }

  getTheCartData = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    if (cartData.length === 0) {
      this.setState({cartStatus: cartStatusConstants.noCartItems})
    } else {
      this.setState({
        cartData,
        cartStatus: cartStatusConstants.cartItemsFound,
      })
    }
  }

  incrementItemQuantity = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const changeInData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        const quantity = eachItem.quantity + 1
        return {...eachItem, quantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(changeInData))
    this.getTheCartData()
  }

  decrementItemQuantity = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const changeInData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        const quantity = eachItem.quantity - 1
        return {...eachItem, quantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(changeInData))
    this.removeUnNecessaryData()
    this.getTheCartData()
  }

  removeUnNecessaryData = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const filtering = cartData.filter(eachItem => eachItem.quantity >= 1)
    const newCartData = [...filtering]
    localStorage.setItem('cartData', JSON.stringify(newCartData))
    this.getTheCartData()
  }

  renderCartView = () => {
    const {cartStatus} = this.state

    switch (cartStatus) {
      case cartStatusConstants.cartItemsFound:
        return this.renderDisplayCartItemsView()
      case cartStatusConstants.noCartItems:
        return this.renderNoCartItemsView()
      case cartStatusConstants.paymentSuccess:
        return this.renderPaymentView()
      default:
        return null
    }
  }

  calculateTotal = () => {
    const {cartData} = this.state
    let sum = 0
    cartData.forEach(item => {
      sum += item.quantity * item.cost
    })
    return sum
  }

  placeOrder = () => {
    this.setState({cartStatus: cartStatusConstants.paymentSuccess})
    localStorage.clear('cartData')
  }

  renderDisplayCartItemsView = () => {
    const {cartData} = this.state
    const totalAmount = this.calculateTotal()
    return (
      <div className="footer-cart-container">
        <div className="cart-container">
          <div className="cart-items-payment-container">
            <ul className="cart-ul-list-container">
              <li className="headings-list">
                <h1 className="list-heading">Item</h1>
                <h1 className="list-heading">Quantity</h1>
                <h1 className="list-heading">Price</h1>
              </li>
              {cartData.map(item => (
                <CartItem
                  item={item}
                  key={item.id}
                  incrementItemQuantity={this.incrementItemQuantity}
                  decrementItemQuantity={this.decrementItemQuantity}
                />
              ))}
            </ul>
            <hr className="cart-route-horizontal-line" />
            <div className="total-heading-container">
              <div className="total-amount-container">
                <h1 className="order-total-heading">Order Total:</h1>
                <div className="money-container">
                  <BiRupee className="TotalRupee" />
                  <p className="total-amount-para">{totalAmount}.00</p>
                </div>
              </div>
              <div className="place-order-button-container">
                <button
                  type="button"
                  className="place-order-button"
                  onClick={this.placeOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  renderNoCartItemsView = () => (
    <div className="no-cart-view-container">
      <div className="no-items-container">
        <img
          src="https://res.cloudinary.com/dx4b3h6c3/image/upload/v1705754430/Layer_2_pubray.jpg"
          alt="empty cart"
          className="no-cart-image"
        />
        <h1 className="no-cart-heading">No Order Yet!</h1>
        <p className="no-cart-para">
          Your cart is empty. Add something from the menu.
        </p>
        <Link to="/">
          <button type="button" className="no-cart-button">
            Order Now
          </button>
        </Link>
      </div>
    </div>
  )

  renderPaymentView = () => (
    <div className="payment-bg-container">
      <div className="payment-container">
        <img
          src="https://res.cloudinary.com/dx4b3h6c3/image/upload/v1705754915/check-circle.1_1_apwrj0.jpg"
          alt=""
          className="payment-image"
        />
        <h1 className="payment-heading">Payment Successful</h1>
        <p className="payment-para">
          Thank you for ordering Your payment is successfully completed.
        </p>
        <Link to="/">
          <button type="button" className="payment-button">
            Go To Home Page
          </button>
        </Link>
      </div>
    </div>
  )

  render() {
    return (
      <>
        <Header />
        {this.renderCartView()}
      </>
    )
  }
}

export default Cart
