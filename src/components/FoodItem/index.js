import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

class FoodItem extends Component {
  state = {quantity: 1, isFound: false}

  componentDidMount() {
    this.removeParticularItemFromStorage()
    this.findTheCartItemInList()
  }

  findTheCartItemInList = () => {
    const storageCartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {details} = this.props
    const getLoadingItem = storageCartData.filter(
      each => each.id === details.id,
    )
    if (getLoadingItem.length > 0) {
      if (getLoadingItem[0].quantity >= 1) {
        this.setState({quantity: getLoadingItem[0].quantity, isFound: true})
      } else {
        this.setState({isFound: false}, this.removeParticularItemFromStorage)
      }
    }
  }

  removeParticularItemFromStorage = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []

    const filtering = cartData.filter(eachItem => eachItem.quantity >= 1)
    const newCartData = [...filtering]

    localStorage.setItem('cartData', JSON.stringify(newCartData))
    this.findTheCartItemInList()
  }

  addItemToCart = () => {
    const {details} = this.props
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const cartItem = {...details, quantity: 1}
    cartData.push(cartItem)
    console.log(cartData)
    localStorage.setItem('cartData', JSON.stringify(cartData))
    this.setState({isFound: true})
  }

  decreaseItemQuantityInCart = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {details} = this.props
    const changeStorageData = cartData.map(eachItem => {
      if (eachItem.id === details.id) {
        const quantity = eachItem.quantity - 1
        if (eachItem.quantity >= 1) {
          return {...eachItem, quantity}
        }
      }
      return eachItem
    })

    localStorage.setItem('cartData', JSON.stringify(changeStorageData))
    this.findTheCartItemInList()
  }

  increaseItemQuantityInCart = () => {
    const {details} = this.props
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    if (cartData !== null) {
      const changeInParticular = cartData.map(eachItem => {
        if (eachItem.id === details.id) {
          const quantity = eachItem.quantity + 1
          return {...eachItem, quantity}
        }
        return eachItem
      })
      const stringifyData = JSON.stringify(changeInParticular)
      localStorage.setItem('cartData', stringifyData)
      this.findTheCartItemInList()
    }
  }

  renderPlusMinusContainerView = () => {
    const {quantity} = this.state
    return (
      <div className="counter-container">
        <button
          type="button"
          className="quantity-button"
          onClick={this.decreaseItemQuantityInCart}
        >
          -
        </button>
        <p className="quantity-para">{quantity}</p>
        <button
          type="button"
          className="quantity-button"
          onClick={this.increaseItemQuantityInCart}
        >
          +
        </button>
      </div>
    )
  }

  render() {
    const {details} = this.props
    const {cost, name, rating, imageUrl} = details
    const {isFound} = this.state
    return (
      <li className="item-list">
        <div className="image-container">
          <img src={imageUrl} alt="food-item" className="image" />
        </div>
        <div className="details-container">
          <h1 className="heading">{name}</h1>
          <div className="amount-container">
            <BiRupee className="cost-icon" />
            <p className="cost">{cost}.00</p>
          </div>
          <div className="rating-display-container">
            <AiFillStar className="star-icon" />
            <p className="rating-para">{rating}</p>
          </div>
          {isFound ? (
            this.renderPlusMinusContainerView()
          ) : (
            <button
              type="button"
              className="add-button"
              onClick={this.addItemToCart}
            >
              Add
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItem
