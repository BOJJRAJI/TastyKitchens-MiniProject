import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

const RestaurantItem = props => {
  const {itemsDetails} = props
  const {imageUrl, name, cuisine, id, userRating} = itemsDetails
  const {rating, totalReviews} = userRating

  return (
    <li className="restaurant-item">
      <Link to={`/restaurant/${id}`} className="restaurant-link">
        <img src={imageUrl} alt="" className="restaurant-image" />
        <div className="restaurant-details-container">
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-cuisine">{cuisine}</p>
          <div className="restaurant-rating-container">
            <FaStar className="restaurant-star" />
            <p className="restaurant-rating-para">{rating}</p>
            <p className="restaurant-reviews-para">({totalReviews} ratings)</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default RestaurantItem
