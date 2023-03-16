import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import {GrFormClose} from 'react-icons/gr'

import Loader from 'react-loader-spinner'

import Sidebar from '../Sidebar'
import Header from '../Header'
import VideoItem from '../VideoItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    videosList: [],
    search: '',
    apiStatus: apiStatusConstants.initial,
    closeButton: false,
  }

  componentDidMount() {
    this.getAllVideos()
  }

  getAllVideos = async () => {
    const {search} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const videoUrl = `https://apis.ccbp.in/videos/all?search=${search}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(videoUrl, options)

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
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickSearchInput = () => {
    this.getAllVideos()
  }

  onChangeSearchInput = event => {
    this.setState({search: event.target.value})
  }

  homeVideosContainer = () => {
    const {videosList} = this.state
    const lengthView = videosList.length <= 0

    console.log(lengthView)

    return lengthView ? (
      <div className="failure-container">
        <img
          className="failure-image"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
        />
        <div style={{textAlign: 'center'}}>
          <h1>No Search results Found</h1>
          <p>Try different key words or remove search filter</p>
          <button
            type="button"
            onClick={this.getAllVideos}
            className="failure-retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    ) : (
      <ul className="videos-container">
        {videosList.map(eachItem => (
          <VideoItem eachDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
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
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  renderBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.homeVideosContainer()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  onClickCloseButton = () => {
    this.setState(prevState => ({
      closeButton: !prevState.closeButton,
    }))
  }

  render() {
    const {search, closeButton} = this.state
    const bannerButton = closeButton
      ? 'banner-container-none'
      : 'banner-container'
    return (
      <>
        <Header />
        <div className="home-container">
          <Sidebar />
          <div>
            <div className={bannerButton}>
              <div className="banner-logo-container" data-testid="banner">
                <img
                  className="banner-logo"
                  alt="nxt watch logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                />
                <div>
                  <button
                    type="button"
                    data-testid="close"
                    className="close-button-banner"
                    onClick={this.onClickCloseButton}
                  >
                    <GrFormClose />
                  </button>
                </div>
              </div>

              <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
              <button type="button">GET IT NOW</button>
            </div>

            <div className="home-video-container">
              <div className="search-input-container">
                <input
                  type="search"
                  className="input-box"
                  placeholder="search"
                  value={search}
                  onChange={this.onChangeSearchInput}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-icon-button"
                  onClick={this.onClickSearchInput}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.renderBasedOnApiStatus()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
