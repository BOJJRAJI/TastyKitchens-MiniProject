import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import FoodItem from '../FoodItem'
import Footer from '../Footer'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class FoodDetailsItem extends Component {
  state = {
    itemDetailsData: [],
    foodItemsData: [],
    detailsStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getItemData()
  }

  getItemData = async () => {
    this.setState({detailsStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const {match} = this.props
    const {id} = match.params
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formatItemsDetailsData = {
        id: data.id,
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }
      console.log(data)
      const formatFoodItems = data.food_items.map(item => {
        const itemData = {
          cost: item.cost,
          id: item.id,
          foodType: item.food_type,
          imageUrl: item.image_url,
          name: item.name,
          rating: item.rating,
        }
        return itemData
      })
      this.setState({
        itemDetailsData: formatItemsDetailsData,
        foodItemsData: formatFoodItems,
        detailsStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        detailsStatus: apiStatusConstants.failure,
      })
    }
  }

  renderItemsDetailsView = () => {
    const {detailsStatus} = this.state
    switch (detailsStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessItemDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderLoaderView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="loader-container">
      <p className="failure-para">Unable To Fetch Data</p>
    </div>
  )

  renderSuccessItemDetails = () => {
    const {itemDetailsData} = this.state
    const {
      costForTwo,
      name,
      cuisine,
      imageUrl,
      location,
      rating,
      reviewsCount,
    } = itemDetailsData

    return (
      <div>
        <div className="product-detail-restro-intro-complete-container">
          <img
            className="restaurant-detail-page-image-main"
            src={imageUrl}
            alt="restaurant"
          />
          <div className="restaurant-detail-page-main-top-content">
            <h1 className="restaurant-detail-page-main-heading">{name}</h1>
            <p className="restaurant-detail-page-main-cuisine">{cuisine}</p>
            <p className="restaurant-detail-page-main-location">{location}</p>
            <div className="restaurant-detail-page-main-rate-container">
              <div className="restaurant-detail-page-main-bottom-container-left">
                <div className="restaurant-detail-page-main-flex">
                  <AiFillStar />
                  <p className="detail-page-rating-and-rupees">{rating}</p>
                </div>
                <p className="detail-page-rating-and-rupees-details">
                  {reviewsCount}+ Ratings
                </p>
              </div>
              <div className="detail-page-main-vertical-line">{null}</div>
              <div className="restaurant-detail-page-main-bottom-container-right">
                <div className="restaurant-detail-page-main-flex">
                  <BiRupee />
                  <p className="detail-page-rating-and-rupees">
                    {costForTwo}.00
                  </p>
                </div>
                <p className="detail-page-rating-and-rupees-details">
                  Cost for two
                </p>
              </div>
            </div>
          </div>
        </div>
        {this.renderFoodItems()}
      </div>
    )
  }

  renderFoodItems = () => {
    const {foodItemsData} = this.state
    return (
      <ul className="food-items-lists-container">
        {foodItemsData.map(item => (
          <FoodItem details={item} key={item.id} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <>
        <Header />
        {this.renderItemsDetailsView()}
        <Footer />
      </>
    )
  }
}

export default FoodDetailsItem
