import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'

import savedContext from './context/savedContext'

import Login from './components/Login'
import Home from './components/Home'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import TrendingRoute from './components/TrendingRoute'
import GamingRoute from './components/GamingRoute'
import SavedVideosRoute from './components/SavedVideosRoute'

import './App.css'

// Replace your code here
class App extends Component {
  state = {savedList: []}

  addSavedItem = videoItem => {
    const {savedList} = this.state

    const saved = savedList.some(
      eachSavedItem => eachSavedItem.id === videoItem.id,
    )

    console.log(saved)
    if (saved) {
      this.setState(prevState => ({
        savedList: prevState.savedList.filter(
          eachItem => eachItem.id !== videoItem.id,
        ),
      }))
    } else {
      this.setState(prevState => ({
        savedList: [...prevState.savedList, videoItem],
      }))
    }
  }

  removeSavedItem = savedDetails => {
    const {savedList} = this.state

    const isRemove = savedList.some(
      eachSavedItem => eachSavedItem.id === savedDetails.id,
    )

    if (isRemove) {
      this.setState(prevState => ({
        savedList: prevState.savedList.filter(
          eachItem => eachItem.id !== savedDetails.id,
        ),
      }))
    }
  }

  render() {
    const {savedList} = this.state
    console.log(savedList)
    return (
      <savedContext.Provider
        value={{
          savedList,
          addSavedItem: this.addSavedItem,
          removeSavedItem: this.removeSavedItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <ProtectedRoute
            exact
            path="/saved-videos"
            component={SavedVideosRoute}
          />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route exact path="/bad-path" component={NotFound} />
          <Redirect to="/bad-path" />
        </Switch>
      </savedContext.Provider>
    )
  }
}
export default App
