import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import ReactPlayer from 'react-player'

import {formatDistanceToNow} from 'date-fns'

import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'

import {MdPlaylistAdd} from 'react-icons/md'

import savedContext from '../../context/savedContext'

import Sidebar from '../Sidebar'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: {},
    apiStatus: apiStatusConstants.initial,
    isClickedLike: false,
    isClickedDislike: false,
  }

  componentDidMount() {
    this.getVideoItemDetails()
  }

  getVideoItemDetails = async () => {
    console.log(this.props)
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/videos/${id}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        id: data.video_details.id,
        description: data.video_details.description,
        title: data.video_details.title,
        thumbnailUrl: data.video_details.thumbnail_url,
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        videoUrl: data.video_details.video_url,
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        videoDetails: updatedData,
      })
      console.log(updatedData)
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoItemDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
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
          <p>
            We are having some trouble to complete your request. Please try
            again.
          </p>
        </div>
        <button
          type="button"
          onClick={this.getVideoItemDetails}
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

  onClickLikeButton = () => {
    const {isClickedDislike} = this.state

    this.setState(prevState => ({
      isClickedLike: !prevState.isClickedLike,
    }))

    if (isClickedDislike) {
      this.setState(prevState => ({
        isClickedDislike: !prevState.isClickedDislike,
      }))
    }
  }

  onClickDislikeButton = () => {
    const {isClickedLike} = this.state

    this.setState(prevState => ({
      isClickedDislike: !prevState.isClickedDislike,
    }))

    if (isClickedLike) {
      this.setState(prevState => ({
        isClickedLike: !prevState.isClickedLike,
      }))
    }
  }

  renderVideoItemDetails = () => (
    <savedContext.Consumer>
      {value => {
        const {addSavedItem, savedList} = value

        const {videoDetails, isClickedLike, isClickedDislike} = this.state

        const toggleClassNameLike = isClickedLike
          ? 'like-toggle-button'
          : 'like-button'

        const toggleClassNameDislike = isClickedDislike
          ? 'like-toggle-button'
          : 'like-button'

        const {
          id,
          description,
          title,
          viewCount,
          publishedAt,
          videoUrl,
          name,
          profileImageUrl,
          subscriberCount,
        } = videoDetails

        const isSaved = savedList.find(eachItem => eachItem.id === id)

        const saveText = isSaved ? 'Saved' : 'Save'

        const savedClassName =
          isSaved !== undefined ? 'like-toggle-button' : 'like-button'

        const onClickSaved = () => {
          addSavedItem({...videoDetails})
        }

        const time = formatDistanceToNow(new Date(publishedAt))

        const s = time.split(' ')

        s.shift()

        const publishedTime = s.join(' ')

        return (
          <div style={{margin: '20px'}}>
            <div className="responsive-container">
              <ReactPlayer url={videoUrl} />
            </div>
            <p>{title}</p>
            <div className="video-save-container">
              <div style={{display: 'flex'}}>
                <p style={{marginRight: '15px'}}>{viewCount}</p>
                <p>{publishedTime} ago</p>
              </div>

              <div className="video-save-container">
                <div
                  style={{
                    marginRight: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <button
                    type="button"
                    className={toggleClassNameLike}
                    onClick={this.onClickLikeButton}
                  >
                    <AiOutlineLike />
                    Like
                  </button>
                </div>
                <div
                  style={{
                    marginRight: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <button
                    type="button"
                    className={toggleClassNameDislike}
                    onClick={this.onClickDislikeButton}
                  >
                    <AiOutlineDislike />
                    Dislike
                  </button>
                </div>
                <div
                  style={{
                    marginRight: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <button
                    type="button"
                    className={savedClassName}
                    onClick={onClickSaved}
                  >
                    <MdPlaylistAdd />
                    {saveText}
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div className="profile-container">
              <img
                alt="channel logo"
                src={profileImageUrl}
                className="video-detail-profile-image"
              />
              <div>
                <p>{name}</p>
                <p>{subscriberCount} Subscribers</p>
                <p>{description}</p>
              </div>
            </div>
          </div>
        )
      }}
    </savedContext.Consumer>
  )

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <Sidebar />
          {this.renderBasedOnApiStatus()}
        </div>
      </>
    )
  }
}

export default VideoItemDetails
