import React, { useState, useEffect } from 'react' // we need this now also in component files
import axios from 'axios'
import './index.css'

const useNotes = (url) => {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    axios.get(url).then(response => {
      setNotes(response.data)
    })
  }, [url])
  return notes
}

// by default, our bundler only recognizes regular JS code.
// the below is not that. It is JSX and is transpiled into JS code through Babel
// we need to define a Loader in the webpack.config.js to handle this
const App = () => {
  const [counter, setCounter] = useState(0)
  const [values, setValues] = useState([])
  const notes = useNotes(BACKEND_URL)

  const handleClick = () => {
    setCounter(counter + 1)
    setValues(values.concat(counter))
  }

  return (
    <div className="container">
      hello webpack {counter} clicks
      <button onClick={handleClick}>
        press
      </button>
      <div>{notes.length} notes on server {BACKEND_URL}</div>
    </div>
  )
}

export default App

// ---------------------------------
// Here is a look at how Babel transpiles the above code from JSX to regular ES6 code

// const App = () =>
//   react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
//     'div',
//     null,
//     'hello webpack'
//   )

// And then, ES5 code since browsers do not support ES6 by default

// var App = function App() {
//     return _react2.default.createElement('div', null, 'hello webpack')
// };

