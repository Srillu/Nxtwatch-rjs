import React from 'react'

const savedContext = React.createContext({
  savedList: [],
  addSavedItem: () => {},
  removeSavedItem: () => {},
})

export default savedContext
