import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {
  Home,
  Products,
  SingleProduct,
  Cart,
  Error,
} from "./pages";
function App() {
  return (
    <Router>
      <ToastContainer position="bottom-right" />
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/products/:id" children={<SingleProduct />} />
       
        <Route exact path="*">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
