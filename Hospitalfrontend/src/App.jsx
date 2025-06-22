"use client"

import "./App.css"
import { useState, useEffect } from "react"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Cart from "./components/Cart.jsx"
import AddProduct from "./components/AddProduct"
import Product from "./components/Product"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppProvider } from "./Context/Context"
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n' // Import the i18n configuration

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import LandingPage from "./components/LandingPage.jsx"

function App() {
  const [cart, setCart] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [language, setLanguage] = useState(localStorage.getItem('i18nextLng') || 'en')

  // Handle language change
  const changeLanguage = (lng) => {
    setLanguage(lng)
    i18n.changeLanguage(lng)
    localStorage.setItem('i18nextLng', lng)
  }

  // Initialize language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('i18nextLng')
    if (savedLang) {
      i18n.changeLanguage(savedLang)
      setLanguage(savedLang)
    }
  }, [])

  const handleFilters = (category, country, state, city) => {
    if (category !== undefined) {
      setSelectedCategory(category)
    }
    if (country !== undefined) {
      setSelectedCountry(country)
    }
    if (state !== undefined) {
      setSelectedState(state)
    }
    if (city !== undefined) {
      setSelectedCity(city)
    }
    console.log("Selected category:", category, "Selected country:", country, "Selected state:", state, "Selected city:", city)
  }

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id)
    if (existingProduct) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  return (
    <I18nextProvider i18n={i18n}>
      <AppProvider>
        <BrowserRouter>
          <Navbar onSelectCategory={handleFilters} onChangeLanguage={changeLanguage} currentLanguage={language} />
          <LandingPage />
          <Routes>
            <Route
              path="/"
              element={
                <Home 
                  addToCart={addToCart} 
                  selectedCategory={selectedCategory} 
                  selectedCountry={selectedCountry}
                  selectedState={selectedState}
                  selectedCity={selectedCity}
                />
              }
            />

            <Route path="/add_product" element={<AddProduct />} />
            <Route path="/product" element={<Product />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </I18nextProvider>
  )
}

export default App