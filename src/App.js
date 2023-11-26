import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from 'react-router-dom'


import Page1 from './views/Page1'
import Page2 from './views/Page2'
import Page3 from './views/Page3'
// import NotFound from './views/Not-found'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page1/>}/>
        <Route path="/page2" element={<Page2/>} />
        <Route path="/page3" element={<Page3/>} />
        {/* <Route component={NotFound} path="**" />
        <Redirect to="**" /> */}
      </Routes>
    </Router>
  )
}

export default App