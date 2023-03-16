import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'

const VideoItem = props => {
  const {eachDetails} = props
  const {
    id,
    name,
    profileImageUrl,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
  } = eachDetails

  const time = formatDistanceToNow(new Date(publishedAt))

  return (
    <Link to={`/videos/${id}`} style={{textDecoration: 'none'}}>
      <li key={id} className="video-list-item">
        <img
          alt="video thumbnail"
          src={thumbnailUrl}
          className="thumbnail-url"
        />
        <div className="video-content-container">
          <img
            alt="channel logo"
            src={profileImageUrl}
            className="profile-image-url"
          />
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
                color: '#475569',
                fontSize: '14px',
                fontFamily: 'Roboto',
              }}
            >
              {title}
            </p>
            <p
              style={{
                color: '#64748b',
                fontSize: '14px',
                fontFamily: 'Roboto',
              }}
            >
              {name}
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
                {viewCount} Views
              </p>

              <p
                style={{
                  color: '#64748b',
                  fontSize: '14px',
                  fontFamily: 'Roboto',
                  marginTop: '0px',
                }}
              >
                {time}
              </p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default VideoItem
