import {Link} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'

import {SiYoutubegaming} from 'react-icons/si'
import {HiFire} from 'react-icons/hi'

import {MdPlaylistAdd} from 'react-icons/md'

import './index.css'

const Sidebar = () => (
  <div className="sidebar-container">
    <ul className="ul-items">
      <Link to="/" className="link-item">
        <li className="sidebar-items">
          <AiFillHome />
          <h1 className="sidebar-item-heading">Home</h1>
        </li>
      </Link>

      <Link to="/trending" className="link-item">
        <li className="sidebar-items">
          <HiFire />
          <h1 className="sidebar-item-heading">Trending</h1>
        </li>
      </Link>

      <Link to="/gaming" className="link-item">
        <li className="sidebar-items">
          <SiYoutubegaming />
          <h1 className="sidebar-item-heading">Gaming</h1>
        </li>
      </Link>

      <Link to="/saved-videos" className="link-item">
        <li className="sidebar-items">
          <MdPlaylistAdd />
          <h1 className="sidebar-item-heading">Saved videos</h1>
        </li>
      </Link>
    </ul>

    <div>
      <p className="contact-us-heading">CONTACT US</p>
      <img
        alt="facebook logo"
        className="sidebar-logo"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
      />
      <img
        alt="twitter logo"
        className="sidebar-logo"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
      />
      <img
        alt="linked in logo"
        className="sidebar-logo"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
      />
      <p className="sidebar-description">
        Enjoy! Now to see your channels and recommendations!
      </p>
    </div>
  </div>
)

export default Sidebar
