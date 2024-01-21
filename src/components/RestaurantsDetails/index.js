import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import {BsFilterLeft, BsSearch} from 'react-icons/bs'

import RestaurantItem from '../RestaurantItem'
import Counter from '../Counter'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const sortByOptions = [
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
]
const limit = 9
class RestaurantsDetails extends Component {
  state = {
    carouselData: [],
    carouselStatus: apiStatusConstants.initial,
    foodItemsData: [],
    foodItemsStatus: apiStatusConstants.initial,
    selectedSortByValue: sortByOptions[0].value,
    searchInput: '',
    activePage: 1,
  }

  componentDidMount() {
    this.getCarouselData()
    this.getFoodItemsData()
  }

  getCarouselData = async () => {
    this.setState({carouselStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/restaurants-list/offers',
      options,
    )
    if (response.ok) {
      const data = await response.json()

      this.setState({
        carouselData: data.offers,
        carouselStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({carouselStatus: apiStatusConstants.failure})
    }
  }

  getFoodItemsData = async () => {
    const {selectedSortByValue, searchInput, activePage} = this.state
    this.setState({foodItemsStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const offset = (activePage - 1) * limit
    const restaurantsApiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${selectedSortByValue}`

    const response = await fetch(restaurantsApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data.restaurants)
      const formatData = data.restaurants.map(object => {
        const converted = {
          costForTwo: object.cost_for_two,
          cuisine: object.cuisine,
          groupByTime: object.group_by_time,
          hasOnlineDelivery: object.has_online_delivery,
          hasTableBooking: object.has_table_booking,
          id: object.id,
          imageUrl: object.image_url,
          isDeliveringNow: object.is_delivering_now,
          location: object.location,
          menuType: object.menu_type,
          name: object.name,
          opensAt: object.opens_at,
          userRating: {
            rating: object.user_rating.rating,
            ratingColor: object.user_rating.rating_color,
            ratingText: object.user_rating.rating_text,
            totalReviews: object.user_rating.total_reviews,
          },
        }
        return converted
      })
      console.log(data)
      this.setState({
        foodItemsStatus: apiStatusConstants.success,
        foodItemsData: formatData,
      })
    } else {
      this.setState({foodItemsStatus: apiStatusConstants.failure})
    }
  }

  renderCarouselView = () => {
    const {carouselStatus} = this.state
    switch (carouselStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div className="carousel-loader-container">
            <Loader type="ThreeDots" color="#F7931E" height="50" width="50" />
          </div>
        )
      case apiStatusConstants.success:
        return this.displayCarousel()
      default:
        return null
    }
  }

  displayCarousel = () => {
    const {carouselData} = this.state
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 700,
      infinite: true,
      dotsClass: 'slick-dots',
      autoplay: true,
      autoplaySpeed: 3000,
      adaptiveHeight: true,
    }
    return (
      <div className="carousel-container">
        <Slider {...settings}>
          {carouselData.map(item => (
            <img src={item.image_url} alt="offer" key="carousel-image" />
          ))}
        </Slider>
      </div>
    )
  }

  changeSearchInput = e => {
    this.setState({searchInput: e.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getFoodItemsData()
    }
  }

  renderFoodItemsFilterView = () => {
    const {searchInput} = this.state
    return (
      <div className="sort-by-container">
        <div className="heading-search-container">
          <h1 className="popular-heading">Popular Restaurants</h1>
          <div className="search-input-container">
            <input
              value={searchInput}
              type="search"
              className="search-input"
              placeholder="Search"
              onChange={this.changeSearchInput}
              onKeyDown={this.onEnterSearchInput}
            />
            <BsSearch className="search-icon" />
          </div>
        </div>
        <div className="filter-para-container">
          <p className="filter-para">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="sort-by-select-para-container">
            <BsFilterLeft size={25} color="#475569" className="filter-icon" />
            <p className="filter-text">Sort by</p>
            <select
              className="filter-select-element"
              onChange={this.changeTheSortByOptionValue}
            >
              {sortByOptions.map(itemOption => (
                <option value={itemOption.value} key={itemOption.id}>
                  {itemOption.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    )
  }

  changeTheSortByOptionValue = event => {
    this.setState(
      {selectedSortByValue: event.target.value},
      this.getFoodItemsData,
    )
  }

  displayFoodItems = () => {
    const {foodItemsData} = this.state
    return (
      <ul className="restaurants-lists-container">
        {foodItemsData.map(item => (
          <RestaurantItem key={item.id} itemsDetails={item} />
        ))}
      </ul>
    )
  }

  renderItemsDetailsView = () => {
    const {foodItemsStatus} = this.state
    switch (foodItemsStatus) {
      case apiStatusConstants.success:
        return this.displayFoodItems()
      case apiStatusConstants.inProgress:
        return this.renderFoodLoaderView()
      case apiStatusConstants.failure:
        return this.renderItemsFailureView()
      default:
        return null
    }
  }

  renderFoodLoaderView = () => (
    <div className="food-items-loader-container">
      <Loader type="ThreeDots" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderItemsFailureView = () => (
    <div className="food-items-failure-container">
      <p className="no-food-items-para">No Restaurants Found!</p>
    </div>
  )

  getActivePage = page => {
    window.scrollTo(500, 500)
    this.setState({activePage: page}, this.getFoodItemsData)
  }

  render() {
    return (
      <div className="home-main-bg-container">
        {this.renderCarouselView()}
        {this.renderFoodItemsFilterView()}
        {this.renderItemsDetailsView()}
        <Counter activePageFunction={this.getActivePage} />
      </div>
    )
  }
}

export default RestaurantsDetails
