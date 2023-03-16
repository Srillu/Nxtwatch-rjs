import {Link, withRouter} from 'react-router-dom'

import {MdOutlineLightMode} from 'react-icons/md'

import Popup from 'reactjs-popup'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header-container">
      <Link to="/">
        <img
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
        />
      </Link>
      <div className="nav-profile-container">
        {/* <MdOutlineLightMode /> */}
        <img
          alt="profile"
          className="profile-image"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
        />
        <div>
          <Popup
            modal
            trigger={
              <button
                type="button"
                onClick={onClickLogout}
                className="header-logout-button"
              >
                Logout
              </button>
            }
            className="popup-content"
          >
            {close => (
              <div className="popup-container">
                <div>
                  <p>Are you sure, you want to logout?</p>
                </div>
                <div>
                  <button
                    type="button"
                    className="trigger-close-button"
                    onClick={() => close()}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="trigger-confirm-button"
                    onClick={onClickLogout}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
