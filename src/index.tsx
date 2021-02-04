import React from 'react'
import ReactDom from 'react-dom'
import App from './components/App'

const target = document.getElementById("app");

ReactDom.render(
    <App />
    ,target
)