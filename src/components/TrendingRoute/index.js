import {Component} from 'react'

import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'

import {HiFire} from 'react-icons/hi'

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

class TrendingRoute extends Component {
  state = {trendingVideosList: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const trendingUrl = `https://apis.ccbp.in/videos/trending`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(trendingUrl, options)

    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.videos.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        thumbnailUrl: eachItem.thumbnail_url,
        viewCount: eachItem.view_count,
        publishedAt: eachItem.published_at,
        name: eachItem.channel.name,
        profileImageUrl: eachItem.channel.profile_image_url,
      }))
      console.log(updatedData)
      this.setState({
        trendingVideosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderOnSuccessTrending = () => {
    const {trendingVideosList} = this.state
    const lengthView = trendingVideosList.length <= 0

    console.log(lengthView)

    return (
      <nav>
        <ul className="trending-container">
          {trendingVideosList.map(eachItem => (
            <Link
              to={`/videos/${eachItem.id}`}
              style={{textDecoration: 'none'}}
            >
              <li key={eachItem.id} className="trending-video-list-item">
                <img
                  alt="video thumbnail"
                  src={eachItem.thumbnailUrl}
                  className="trending-thumbnail-url"
                />
                <div className="trending-video-content-container">
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
                        {eachItem.viewCount} Views
                      </p>

                      <p
                        style={{
                          color: '#64748b',
                          fontSize: '14px',
                          fontFamily: 'Roboto',
                          marginTop: '0px',
                        }}
                      >
                        {eachItem.publishedAt}
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
          onClick={this.getAllVideos}
          className="failure-retry-button"
        >
          Retry
        </button>
      </div>
    </>
  )

  renderLoader = () => (
    <div className="loader-trending" data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  renderBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderOnSuccessTrending()
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
                width: '100%',
              }}
            >
              <div className="icon-container-round">
                <HiFire
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
                Trending
              </h1>
            </div>
            {this.renderBasedOnApiStatus()}
          </div>
        </div>
      </>
    )
  }
}

export default TrendingRoute
