import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  getUsername = e => {
    this.setState({username: e.target.value})
  }

  getPassword = e => {
    this.setState({password: e.target.value})
  }

  onSubmitForm = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    console.log(userDetails)
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      console.log(data.jwt_token)
      Cookies.set('jwt_token', data.jwt_token, {expires: 20})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({showError: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, errorMsg, showError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="mobile-view-container">
          <div className="mobile-login-para-container">
            <p className="mobile-login-para">Login</p>
          </div>
          <img
            src="https://res.cloudinary.com/dx4b3h6c3/image/upload/v1705586235/Rectangle_1457_cckwru.jpg"
            alt="website logo"
            className="mobile-image"
          />
        </div>
        <div className="form-bg-container">
          <form className="form" onSubmit={this.onSubmitForm}>
            <img
              src="https://res.cloudinary.com/dx4b3h6c3/image/upload/v1705588062/Frame_274_kflkzc.jpg"
              alt="website login"
              className="app-logo"
            />
            <h1 className="kitchen-para">Tasty Kitchens</h1>
            <h1 className="login-para">Login</h1>
            <div className="input-container">
              <label htmlFor="username" className="label-element">
                USERNAME
              </label>
              <input
                id="username"
                type="text"
                className="input-element"
                value={username}
                onChange={this.getUsername}
                placeholder="rahul"
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="label-element">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                className="input-element"
                value={password}
                onChange={this.getPassword}
                placeholder="rahul@2021"
              />
            </div>
            {showError && <p className="login-error-msg">{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
        <img
          src="https://res.cloudinary.com/dx4b3h6c3/image/upload/v1705587120/Rectangle_1456_1_lvu3s8.jpg"
          alt="website logo"
          className="large-device-image"
        />
      </div>
    )
  }
}

export default Login
