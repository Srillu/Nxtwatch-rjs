import Header from '../Header'
import Sidebar from '../Sidebar'

import './index.css'

const NotFound = () => (
  <div>
    <Header />
    <div className="home-container">
      <Sidebar />
      <div className="not-found">
        <img
          alt="not found"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
          className="not-found-image"
        />
        <h1 className="heading-not-found">Page Not Found</h1>
        <p className="paragraph-not-found">
          We are sorry, the page you requested could not be found.
        </p>
      </div>
    </div>
  </div>
)

export default NotFound
