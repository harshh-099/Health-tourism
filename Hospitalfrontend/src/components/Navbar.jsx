"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useTranslation } from 'react-i18next'

const Navbar = ({ onSelectCategory, onSearch, onChangeLanguage, currentLanguage }) => {
  const { t } = useTranslation()
  
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme")
    return storedTheme ? storedTheme : "light-theme"
  }
  const [selectedCategory, setSelectedCategory] = useState("")
  const [theme, setTheme] = useState(getInitialTheme())
  const [input, setInput] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState("")
  const [categories, setCategories] = useState([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // State for states and cities
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")

  useEffect(() => {
    fetchData()
    fetchCountries()
    fetchCategories()
    fetchStates()
  }, [])

  // Update cities when state changes
  useEffect(() => {
    if (selectedState) {
      fetchCities(selectedState)
    } else {
      setCities([])
      setSelectedCity("")
    }
  }, [selectedState])

  const fetchData = async (value) => {
    try {
      const response = await axios.get("http://localhost:8080/api/products")
      setSearchResults(response.data)
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const fetchCountries = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products")
      // Extract unique countries from products
      const uniqueCountries = [...new Set(response.data.map((product) => product.country))]
      setCountries(uniqueCountries)
    } catch (error) {
      console.error("Error fetching countries:", error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products")
      // Extract unique categories from products
      const uniqueCategories = [...new Set(response.data.map((product) => product.category))]
      setCategories(uniqueCategories)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  // Function to fetch states
  const fetchStates = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products")
      // Extract unique states from products
      const uniqueStates = [...new Set(response.data.map((product) => product.state))]
      setStates(uniqueStates)
    } catch (error) {
      console.error("Error fetching states:", error)
    }
  }

  // Function to fetch cities based on selected state
  const fetchCities = async (state) => {
    try {
      const response = await axios.get("http://localhost:8080/api/products")
      // Filter products by selected state and extract unique cities
      const citiesInState = response.data
        .filter(product => product.state === state)
        .map(product => product.city)
      const uniqueCities = [...new Set(citiesInState)]
      setCities(uniqueCities)
    } catch (error) {
      console.error("Error fetching cities:", error)
    }
  }

  const handleChange = async (value) => {
    setInput(value)
    if (value.length >= 1) {
      setShowSearchResults(true)
      try {
        const response = await axios.get(`http://localhost:8080/api/products/search?keyword=${value}`)
        setSearchResults(response.data)
        setNoResults(response.data.length === 0)
        console.log(response.data)
      } catch (error) {
        console.error("Error searching:", error)
      }
    } else {
      setShowSearchResults(false)
      setSearchResults([])
      setNoResults(false)
    }
  }

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
    // Pass the selected country to parent component for filtering
    if (onSelectCategory) {
      onSelectCategory(selectedCategory, country, selectedState, selectedCity)
    }
    setIsMenuOpen(false)
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    if (onSelectCategory) {
      onSelectCategory(category, selectedCountry, selectedState, selectedCity)
    }
    setIsMenuOpen(false)
  }

  // Handlers for state and city selection
  const handleStateSelect = (state) => {
    setSelectedState(state)
    setSelectedCity("") // Reset city when state changes
    if (onSelectCategory) {
      onSelectCategory(selectedCategory, selectedCountry, state, "")
    }
    setIsMenuOpen(false)
  }

  const handleCitySelect = (city) => {
    setSelectedCity(city)
    if (onSelectCategory) {
      onSelectCategory(selectedCategory, selectedCountry, selectedState, city)
    }
    setIsMenuOpen(false)
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Toggle language between English and Hindi
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en'
    if (onChangeLanguage) {
      onChangeLanguage(newLanguage)
    }
  }

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowSearchResults(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <style>
        {`
          .navbar-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background-color: #f8f9fa;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          .navbar-content {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            padding: 0.75rem 1.5rem;
            max-width: 1400px;
            margin: 0 auto;
          }
          
          .navbar-brand {
            font-size: 1.5rem;
            font-weight: 700;
            color: #0288d1;
            text-decoration: none;
            display: flex;
            align-items: center;
          }
          
          .navbar-brand:hover {
            color: #0277bd;
          }
          
          .navbar-logo {
            margin-right: 0.5rem;
            display: inline-flex;
          }
          
          .navbar-menu {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          
          .navbar-nav {
            flex-direction:row;
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 0.5rem;
          }
          
          .nav-item {
            position: relative;
          }
          
          .nav-link {
            color: #424242;
            text-decoration: none;
            padding: 0.5rem 0.75rem;
            border-radius: 4px;
            font-weight: 500;
            font-size: 0.95rem;
            transition: all 0.2s ease;
            display: block;
          }
          
          .nav-link:hover, .nav-link.active {
            color: #0288d1;
            background-color: rgba(2, 136, 209, 0.08);
          }
          
          .dropdown-toggle {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            cursor: pointer;
          }
          
          .dropdown-toggle::after {
            content: '';
            display: inline-block;
            width: 0.4rem;
            height: 0.4rem;
            border-right: 2px solid #424242;
            border-bottom: 2px solid #424242;
            transform: rotate(45deg);
            margin-top: -0.2rem;
            transition: transform 0.2s ease;
          }
          
          .dropdown-toggle[aria-expanded="true"]::after {
            transform: rotate(-135deg);
            margin-top: 0.2rem;
          }
          
          .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 1000;
            display: none;
            min-width: 12rem;
            padding: 0.5rem 0;
            margin: 0.125rem 0 0;
            background-color: #fff;
            border-radius: 0.375rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            max-height: 16rem;
            overflow-y: auto;
          }
          
          .dropdown-menu.show {
            display: block;
            animation: fadeIn 0.2s ease;
          }
          
          .dropdown-item {
            display: block;
            width: 100%;
            padding: 0.5rem 1rem;
            clear: both;
            font-weight: 400;
            color: #212529;
            text-align: inherit;
            text-decoration: none;
            white-space: nowrap;
            background-color: transparent;
            border: 0;
            cursor: pointer;
          }
          
          .dropdown-item:hover, .dropdown-item:focus {
            color: #0288d1;
            background-color: rgba(2, 136, 209, 0.08);
          }
          
          .search-container {
            position: relative;
            width: 100%;
            max-width: 300px;
          }
          
          .search-input {
            width: 100%;
            padding: 0.5rem 1rem 0.5rem 2.5rem;
            border: 1px solid #e0e0e0;
            border-radius: 50px;
            font-size: 0.9rem;
            transition: all 0.2s ease;
            background-color: #f5f5f5;
          }
          
          .search-input:focus {
            outline: none;
            border-color: #0288d1;
            background-color: #fff;
            box-shadow: 0 0 0 3px rgba(2, 136, 209, 0.1);
          }
          
          .search-icon {
            position: absolute;
            left: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            color: #757575;
            pointer-events: none;
          }
          
          .search-results {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            z-index: 1000;
            margin-top: 0.5rem;
            background-color: #fff;
            border-radius: 0.375rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            max-height: 16rem;
            overflow-y: auto;
            animation: fadeIn 0.2s ease;
          }
          
          .search-result-item {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid #f0f0f0;
            cursor: pointer;
            transition: background-color 0.2s ease;
          }
          
          .search-result-item:last-child {
            border-bottom: none;
          }
          
          .search-result-item:hover {
            background-color: rgba(2, 136, 209, 0.08);
          }
          
          .search-result-link {
            color: #424242;
            text-decoration: none;
            display: block;
          }
          
          .no-results {
            padding: 0.75rem 1rem;
            color: #757575;
            text-align: center;
            font-style: italic;
          }
          
          .theme-toggle, .language-toggle {
            background: none;
            border: none;
            color: #424242;
            font-size: 1.25rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
          }
          
          .theme-toggle:hover, .language-toggle:hover {
            background-color: rgba(0, 0, 0, 0.05);
            color: #0288d1;
          }
          
          .menu-toggle {
            display: none;
            background: none;
            border: none;
            color: #424242;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.25rem;
          }
          
          .language-toggle {
            font-size: 0.9rem;
            font-weight: 600;
            padding: 0.4rem 0.8rem;
            border-radius: 4px;
            background-color: #f0f0f0;
            color: #424242;
            margin-left: 0.5rem;
          }
          
          .language-toggle:hover {
            background-color: #e0e0e0;
          }
          
          @media (max-width: 992px) {
            .menu-toggle {
              display: block;
            }
            
            .navbar-menu {
              position: fixed;
              top: 60px;
              left: 0;
              right: 0;
              background-color: #fff;
              flex-direction: column;
              align-items: flex-start;
              padding: 1rem;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              transform: translateY(-100%);
              opacity: 0;
              visibility: hidden;
              transition: all 0.3s ease;
              z-index: 999;
            }
            
            .navbar-menu.open {
              transform: translateY(0);
              opacity: 1;
              visibility: visible;
            }
            
            .navbar-nav {
              flex-direction: column;
              width: 100%;
            }
            
            .nav-item {
              width: 100%;
            }
            
            .dropdown-menu {
              position: static;
              box-shadow: none;
              margin-left: 1rem;
              width: calc(100% - 1rem);
            }
            
            .search-container {
              width: 100%;
              max-width: none;
              margin-top: 1rem;
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          /* Dark theme styles */
          body.dark-theme .navbar-container {
            background-color: #1a1a1a;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          }
          
          body.dark-theme .navbar-brand {
            color: #4fc3f7;
          }
          
          body.dark-theme .navbar-brand:hover {
            color: #81d4fa;
          }
          
          body.dark-theme .nav-link {
            color: #e0e0e0;
          }
          
          body.dark-theme .nav-link:hover, 
          body.dark-theme .nav-link.active {
            color: #4fc3f7;
            background-color: rgba(79, 195, 247, 0.1);
          }
          
          body.dark-theme .dropdown-toggle::after {
            border-color: #e0e0e0;
          }
          
          body.dark-theme .dropdown-menu {
            background-color: #2a2a2a;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }
          
          body.dark-theme .dropdown-item {
            color: #e0e0e0;
          }
          
          body.dark-theme .dropdown-item:hover, 
          body.dark-theme .dropdown-item:focus {
            color: #4fc3f7;
            background-color: rgba(79, 195, 247, 0.1);
          }
          
          body.dark-theme .search-input {
            background-color: #333;
            border-color: #444;
            color: #e0e0e0;
          }
          
          body.dark-theme .search-input:focus {
            border-color: #4fc3f7;
            box-shadow: 0 0 0 3px rgba(79, 195, 247, 0.2);
          }
          
          body.dark-theme .search-icon {
            color: #bdbdbd;
          }
          
          body.dark-theme .search-results {
            background-color: #2a2a2a;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }
          
          body.dark-theme .search-result-item {
            border-bottom-color: #444;
          }
          
          body.dark-theme .search-result-item:hover {
            background-color: rgba(79, 195, 247, 0.1);
          }
          
          body.dark-theme .search-result-link {
            color: #e0e0e0;
          }
          
          body.dark-theme .no-results {
            color: #bdbdbd;
          }
          
          body.dark-theme .theme-toggle,
          body.dark-theme .language-toggle {
            color: #e0e0e0;
          }
          
          body.dark-theme .theme-toggle:hover,
          body.dark-theme .language-toggle:hover {
            background-color: rgba(255, 255, 255, 0.1);
            color: #4fc3f7;
          }
          
          body.dark-theme .menu-toggle {
            color: #e0e0e0;
          }
          
          body.dark-theme .language-toggle {
            background-color: #333;
            color: #e0e0e0;
          }
          
          body.dark-theme .language-toggle:hover {
            background-color: #444;
          }
          
          @media (max-width: 992px) {
            body.dark-theme .navbar-menu {
              background-color: #1a1a1a;
            }
          }
        `}
      </style>

      <header className="navbar-container">
        <div className="navbar-content">
          <a className="navbar-brand" href="/">
            <span className="navbar-logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            S & H
          </a>
          
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" href="/">{t('home')}</a>
              </li>
              
              {/* <li className="nav-item">
                <div 
                  className="nav-link dropdown-toggle" 
                  onClick={() => document.getElementById('countryDropdown').classList.toggle('show')}
                  aria-expanded={document.getElementById('countryDropdown')?.classList.contains('show')}
                >
                  {selectedCountry ? `${t('country')}: ${selectedCountry}` : t('filterByCountry')}
                </div>
                <div className="dropdown-menu" id="countryDropdown">
                  <button className="dropdown-item" onClick={() => handleCountrySelect("")}>
                    {t('allCountries')}
                  </button>
                  {countries.map((country, index) => (
                    <button key={index} className="dropdown-item" onClick={() => handleCountrySelect(country)}>
                      {country}
                    </button>
                  ))}
                </div>
              </li> */}
              
              {/* State Filter */}
              <li className="nav-item">
                <div 
                  className="nav-link dropdown-toggle" 
                  onClick={() => document.getElementById('stateDropdown').classList.toggle('show')}
                  aria-expanded={document.getElementById('stateDropdown')?.classList.contains('show')}
                >
                  {selectedState ? `${t('state')}: ${selectedState}` : t('filterByState')}
                </div>
                <div className="dropdown-menu" id="stateDropdown">
                  <button className="dropdown-item" onClick={() => handleStateSelect("")}>
                    {t('allStates')}
                  </button>
                  {states.map((state, index) => (
                    <button key={index} className="dropdown-item" onClick={() => handleStateSelect(state)}>
                      {state}
                    </button>
                  ))}
                </div>
              </li>
              
              {/* City Filter */}
              <li className="nav-item">
                <div 
                  className="nav-link dropdown-toggle" 
                  onClick={() => document.getElementById('cityDropdown').classList.toggle('show')}
                  aria-expanded={document.getElementById('cityDropdown')?.classList.contains('show')}
                >
                  {selectedCity ? `${t('city')}: ${selectedCity}` : t('filterByCity')}
                </div>
                <div className="dropdown-menu" id="cityDropdown">
                  <button className="dropdown-item" onClick={() => handleCitySelect("")}>
                    {t('allCities')}
                  </button>
                  {cities.map((city, index) => (
                    <button key={index} className="dropdown-item" onClick={() => handleCitySelect(city)}>
                      {city}
                    </button>
                  ))}
                </div>
              </li>
              
              <li className="nav-item">
                <div 
                  className="nav-link dropdown-toggle" 
                  onClick={() => document.getElementById('categoryDropdown').classList.toggle('show')}
                  aria-expanded={document.getElementById('categoryDropdown')?.classList.contains('show')}
                >
                  {selectedCategory ? `${t('specialty')}: ${selectedCategory}` : t('filterBySpecialty')}
                </div>
                <div className="dropdown-menu" id="categoryDropdown">
                  <button className="dropdown-item" onClick={() => handleCategorySelect("")}>
                    {t('allSpecialties')}
                  </button>
                  {categories.map((category, index) => (
                    <button key={index} className="dropdown-item" onClick={() => handleCategorySelect(category)}>
                      {category}
                    </button>
                  ))}
                </div>
              </li>
            </ul>
            
            <div className="search-container">
              <span className="search-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <input
                className="search-input"
                type="search"
                placeholder={t('searchPlaceholder')}
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
              />
              
              {showSearchResults && (
                <div className="search-results">
                  {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <div key={result.id} className="search-result-item">
                        <a href={`/product/${result.id}`} className="search-result-link">
                          {result.name}
                        </a>
                      </div>
                    ))
                  ) : (
                    noResults && <div className="no-results">No product with such name</div>
                  )}
                </div>
              )}
            </div>
            
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark-theme" ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 1V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 21V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            
            {/* Language toggle button */}
            <button 
              className="language-toggle" 
              onClick={toggleLanguage} 
              aria-label="Toggle language"
            >
              {currentLanguage === 'en' ? t('hindi') : t('english')}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar