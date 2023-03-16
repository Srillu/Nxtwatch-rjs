import {Component} from 'react'

import {Link} from 'react-router-dom'

import {SiYoutubegaming} from 'react-icons/si'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Sidebar from '../Sidebar'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GamingRoute extends Component {
  state = {gamingVideosList: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const gamingUrl = `https://apis.ccbp.in/videos/gaming`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(gamingUrl, options)

    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.videos.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        thumbnailUrl: eachItem.thumbnail_url,
        viewCount: eachItem.view_count,
      }))
      console.log(updatedData)
      this.setState({
        gamingVideosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderOnSuccessGaming = () => {
    const {gamingVideosList} = this.state
    const lengthView = gamingVideosList.length <= 0

    console.log(lengthView)

    return (
      <nav>
        <ul className="gaming-container">
          {gamingVideosList.map(eachItem => (
            <Link
              to={`/videos/${eachItem.id}`}
              style={{textDecoration: 'none'}}
            >
              <li key={eachItem.id} className="gaming-video-list-item">
                <img
                  alt="video thumbnail"
                  src={eachItem.thumbnailUrl}
                  className="gaming-thumbnail-url"
                />
                <div className="gaming-video-content-container">
                  <div
                    style={{
                      marginTop: '0px',
                      paddingTop: '0px',
                      marginLeft: '5px',
                    }}
                  >
                    <p
                      style={{
                        marginTop: '0px',
                        color: '#0f0f0f',
                        fontWeight: 'bold',
                        fontSize: '22px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {eachItem.title}
                    </p>
                    <p
                      style={{
                        color: '#64748b',
                        fontSize: '14px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {eachItem.name}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                      }}
                    >
                      <p
                        style={{
                          color: '#64748b',
                          fontSize: '14px',
                          fontFamily: 'Roboto',
                          marginRight: '10px',
                          marginTop: '0px',
                        }}
                      >
                        {eachItem.viewCount} Watching Worldwide
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    )
  }

  renderFailureView = () => (
    <>
      <div className="failure-container">
        <img
          className="failure-image"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          alt="failure view"
        />
        <div style={{textAlign: 'center'}}>
          <h1>Oops! Something Went Wrong</h1>
          <p>We are having some trouble to complete your request.</p>
          <p>Please try again.</p>
        </div>
        <button
          type="button"
          onClick={this.getGamingVideos}
          className="failure-retry-button"
        >
          Retry
        </button>
      </div>
    </>
  )

  renderLoader = () => (
    <div className="loader-gaming" data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  renderBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderOnSuccessGaming()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <Sidebar />
          <div className="trending-main-container">
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: '35px',
                backgroundColor: '#e2e8f0',
              }}
            >
              <div className="icon-container-round">
                <SiYoutubegaming
                  style={{
                    color: 'red',
                    fontSize: '28px',
                  }}
                />
              </div>

              <h1
                style={{
                  marginLeft: '15px',
                }}
              >
                Gaming
              </h1>
            </div>
            {this.renderBasedOnApiStatus()}
          </div>
        </div>
      </>
    )
  }
}

export default GamingRoute
