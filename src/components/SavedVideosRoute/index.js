import {HiFire} from 'react-icons/hi'

import {Link} from 'react-router-dom'

import savedContext from '../../context/savedContext'

import Sidebar from '../Sidebar'
import Header from '../Header'

const SavedVideosRoute = () => (
  <savedContext.Consumer>
    {value => {
      const {savedList} = value

      const renderBasedOnSavedListLength = savedList.length === 0

      const renderSaved = renderBasedOnSavedListLength ? (
        <>
          <div className="failure-container">
            <img
              alt="no saved videos"
              className="failure-image"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            />
            <div style={{textAlign: 'center'}}>
              <h1>No saved videos found</h1>
              <p>You can save your videos while watching them.</p>
            </div>
          </div>
        </>
      ) : (
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
              Saved Videos
            </h1>
          </div>

          <nav>
            <ul className="trending-container">
              {savedList.map(eachItem => (
                <li key={eachItem.id}>
                  <Link
                    to={`/videos/${eachItem.id}`}
                    style={{textDecoration: 'none'}}
                    className="trending-video-list-item"
                  >
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
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )

      return (
        <>
          <Header />
          <div className="home-container">
            <Sidebar />
            {renderSaved}
          </div>
        </>
      )
    }}
  </savedContext.Consumer>
)

export default SavedVideosRoute
