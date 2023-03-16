import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    isShowErrorMsg: false,
    isChecked: false,
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, isShowErrorMsg: true})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    const {history} = this.props
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}

    const apiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    console.log(response)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onClickCheckBox = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }))
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, isShowErrorMsg, errorMsg, isChecked} = this.state
    console.log(isChecked)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <>
        <div className="bg-container">
          <div className="login-container">
            <img
              className="nxt-watch-logo"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            />
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <div className="input-container">
                <label htmlFor="username" className="input-label">
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  className="username-input-field"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="input-container">
                <label htmlFor="password" className="input-label">
                  PASSWORD
                </label>
                {isChecked ? (
                  <input
                    type="text"
                    id="password"
                    placeholder="Password"
                    className="password-input-field"
                    value={password}
                    onChange={this.onChangePassword}
                  />
                ) : (
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="password-input-field"
                    value={password}
                    onChange={this.onChangePassword}
                  />
                )}
              </div>
              <div className="show-password-container">
                <input
                  type="checkbox"
                  id="checkBox"
                  placeholder="Password"
                  className="check-box"
                  onClick={this.onClickCheckBox}
                />
                <label htmlFor="checkBox" className="show-password">
                  Show Password
                </label>
              </div>
              <div>
                <button type="submit" className="login-button">
                  Login
                </button>
                {isShowErrorMsg && <p className="error-message">*{errorMsg}</p>}
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default Login
