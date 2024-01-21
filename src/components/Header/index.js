import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'
import './index.css'

const headerLinksConstraint = [
  {id: 0, text: 'Home', link: '/'},
  {id: 1, text: 'Cart', link: '/cart'},
]

class Header extends Component {
  state = {isShowMobileMenu: false}

  toggleMobileMenuOpen = () => {
    this.setState({
      isShowMobileMenu: true,
    })
  }

  toggleMobileMenuClose = () => {
    this.setState({isShowMobileMenu: false})
  }

  loggingOutUser = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  headerUnOrderListItemsAndButton = () => {
    const {match} = this.props
    const {path} = match
    return (
      <ul className="header-menu-un-order-list-items">
        {headerLinksConstraint.map(eachMenu => (
          <li key={eachMenu.id} className="list-item">
            <Link to={eachMenu.link}>
              <button
                className={`header-list-item-text ${
                  path === eachMenu.link ? 'active-header-css' : ''
                }`}
                type="button"
              >
                {eachMenu.text}
              </button>
            </Link>
          </li>
        ))}

        <li>
          <button
            onClick={this.loggingOutUser}
            className="logout-button-header"
            type="button"
          >
            Logout
          </button>
        </li>
      </ul>
    )
  }

  render() {
    const {isShowMobileMenu} = this.state

    return (
      <>
        <div className="complete-header-for-large">
          <Link to="/" className="text-Decoration-for-link">
            <button type="button" className="header-logo-image-container">
              <img
                src="https://res.cloudinary.com/dqmmxqwiq/image/upload/v1679851948/Tasty%20Kitchen%20React%20mini%20Project/Frame_274_cgiuza.png"
                alt="website logo"
              />
              <h1 className="tasty-kitchen-header-logo-text">Tasty Kitchens</h1>
            </button>
          </Link>
          <div className="menu-item-for-header">
            {this.headerUnOrderListItemsAndButton()}
          </div>
        </div>
        <div className="complete-header-for-mobile-device">
          <div className="header-menu-mobile-show">
            <Link to="/" className="text-Decoration-for-link">
              <div className="header-logo-image-container-mobile">
                <img
                  src="https://res.cloudinary.com/dqmmxqwiq/image/upload/v1679851948/Tasty%20Kitchen%20React%20mini%20Project/Frame_274_cgiuza.png"
                  alt="logo"
                />
                <h1 className="tasty-kitchen-header-logo-text-mobile">
                  Tasty Kitchens
                </h1>
              </div>
            </Link>
            <button
              onClick={this.toggleMobileMenuOpen}
              className="mobile-menu-button"
              type="button"
            >
              {' '}
              <GiHamburgerMenu size={25} />
            </button>
          </div>
          {isShowMobileMenu ? (
            <div className="hidden-part-mobile-menu">
              {this.headerUnOrderListItemsAndButton()}
              <button
                onClick={this.toggleMobileMenuClose}
                className="mobile-menu-button"
                type="button"
              >
                {' '}
                <AiFillCloseCircle size={25} />
              </button>
            </div>
          ) : null}
        </div>
      </>
    )
  }
}

export default withRouter(Header)
