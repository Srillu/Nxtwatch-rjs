import {Switch, Route, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'

import Login from './components/Login'
import Home from './components/Home'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import TrendingRoute from './components/TrendingRoute'
import GamingRoute from './components/GamingRoute'

import './App.css'

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/trending" component={TrendingRoute} />
      <ProtectedRoute exact path="/gaming" component={GamingRoute} />
      <ProtectedRoute exact path="/videos/:id" component={VideoItemDetails} />
      <Route exact path="/bad-path" component={NotFound} />
      <Redirect to="/bad-path" />
    </Switch>
  </>
)

export default App
