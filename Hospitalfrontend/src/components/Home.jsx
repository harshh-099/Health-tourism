"use client"

import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import AppContext from "../Context/Context"
import { useTranslation } from "react-i18next"

const Home = ({ selectedCategory, selectedCountry, selectedState, selectedCity }) => {
  const { t } = useTranslation()
  const { data, isError, refreshData } = useContext(AppContext)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isDataFetched, setIsDataFetched] = useState(false)
  const [currency, setCurrency] = useState("USD")
  const [exchangeRates, setExchangeRates] = useState({
    USD: 1,
    EUR: 0.92,
    GBP: 0.8,
    JPY: 149.5,
    
    INR: 83.5,
  })

  useEffect(() => {
    if (!isDataFetched) {
      refreshData()
      setIsDataFetched(true)
    }
  }, [refreshData, isDataFetched])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products")
        setProducts(response.data)
        setFilteredProducts(response.data)
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [data])

  const formatPrice = (price) => {
    const symbols = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      
      INR: "₹",
    }

    const convertedPrice = (price * exchangeRates[currency]).toFixed(2)
    return `${symbols[currency]}${convertedPrice}`
  }

  // Filter products when filters change
  useEffect(() => {
    if (products.length > 0) {
      let filtered = [...products]

      // Apply country filter if selected
      if (selectedCountry) {
        filtered = filtered.filter((product) => product.country.toLowerCase() === selectedCountry.toLowerCase())
      }

      // Apply state filter if selected
      if (selectedState) {
        filtered = filtered.filter((product) => product.state.toLowerCase() === selectedState.toLowerCase())
      }

      // Apply city filter if selected
      if (selectedCity) {
        filtered = filtered.filter((product) => product.city.toLowerCase() === selectedCity.toLowerCase())
      }

      // Apply category filter if selected
      if (selectedCategory) {
        filtered = filtered.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase())
      }

      setFilteredProducts(filtered)
    }
  }, [selectedCountry, selectedCategory, selectedState, selectedCity, products])

  if (isError) {
    return (
      <h2
        style={{ padding: "10rem", textAlign: "center", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
      >
        Something went wrong...
      </h2>
    )
  }

  return (
    <>
      {/* SVG Definitions for reuse */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5f7fa" />
            <stop offset="100%" stopColor="#e8f5e9" />
          </linearGradient>
          <linearGradient id="buttonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#43a047" />
            <stop offset="100%" stopColor="#66bb6a" />
          </linearGradient>
          <filter id="dropShadow" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.1" />
          </filter>
        </defs>
      </svg>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))",
          gap: "24px",
          padding: "24px",
          position: "relative",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          background: "#f9f9f9",
        }}
      >
        {/* Background SVG pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            opacity: 0.03,
            pointerEvents: "none",
          }}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#43a047" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                width: "100%",
                height: "15rem",
                display: "flex",
                flexDirection: "column",
                background: "white",
                borderRadius: "12px",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                cursor: "pointer",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)"
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.12)"
                e.currentTarget.style.borderColor = "rgba(67, 160, 71, 0.2)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)"
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.05)"
              }}
            >
              {/* Top accent bar */}
              <div
                style={{
                  height: "4px",
                  width: "100%",
                  background: "linear-gradient(90deg,rgb(42, 173, 228),rgb(74, 205, 234))",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              ></div>

              {/* Reflection overlay element */}
              <div
                style={{
                  position: "absolute",
                  top: "-100%",
                  left: "-100%",
                  right: "-100%",
                  bottom: "-100%",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)",
                  transform: "rotate(30deg)",
                  animation: "reflectionSweep 6s ease-in-out infinite",
                  pointerEvents: "none",
                }}
              ></div>

              <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit", height: "100%" }}>
                <div
                  style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "20px",
                    height: "100%",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div>
                    <h5
                      style={{
                        margin: "0 0 12px 0",
                        color: "#2e2e2e",
                        fontWeight: "600",
                        fontSize: "16px",
                        letterSpacing: "0.3px",
                      }}
                    >
                      {product.name.toUpperCase()}
                    </h5>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#555",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginRight: "6px" }}
                        >
                          <path
                            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                            stroke="#555"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3 12H21"
                            stroke="#555"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 3C14.5013 5.76254 15.9228 9.29451 16 13C15.9228 16.7055 14.5013 20.2375 12 23C9.49872 20.2375 8.07725 16.7055 8 13C8.07725 9.29451 9.49872 5.76254 12 3Z"
                            stroke="#555"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {product.country}
                      </div>
                      <span
                        style={{
                          backgroundColor: "#e8f5e9",
                          color: "#2e7d32",
                          padding: "4px 10px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "600",
                          letterSpacing: "0.4px",
                          border: "1px solid rgba(67, 160, 71, 0.2)",
                        }}
                      >
                        {product.category}
                      </span>
                    </div>
                    {/* Display state and city information */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#555",
                        fontSize: "13px",
                        marginBottom: "8px",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginRight: "6px" }}
                      >
                        <path
                          d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                          stroke="#555"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="10"
                          r="3"
                          stroke="#555"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {product.city}, {product.state}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "12px",
                      }}
                    >
                      <h5
                        style={{
                          fontWeight: "700",
                          margin: "0",
                          color: "#43a047",
                          fontSize: "20px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginRight: "6px" }}
                        >
                          <path
                            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                            fill="#43a047"
                          />
                          <path d="M12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z" fill="#43a047" />
                        </svg>
                        {formatPrice(product.price)}
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            const currencies = Object.keys(exchangeRates)
                            const currentIndex = currencies.indexOf(currency)
                            const nextIndex = (currentIndex + 1) % currencies.length
                            setCurrency(currencies[nextIndex])
                          }}
                          style={{
                            marginLeft: "8px",
                            background: "none",
                            border: "1px solid #e0e0e0",
                            borderRadius: "4px",
                            padding: "2px 6px",
                            fontSize: "12px",
                            color: "#666",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#43a047"
                            e.currentTarget.style.color = "#43a047"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "#e0e0e0"
                            e.currentTarget.style.color = "#666"
                          }}
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ marginRight: "4px" }}
                          >
                            <path
                              d="M21 14l-3-3m0 0l-3 3m3-3v9"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M3 10l3 3m0 0l3-3m-3 3V4"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {currency}
                        </button>
                      </h5>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#43a047",
                          fontWeight: "600",
                          background: "#e8f5e9",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          animation: "pulseFade 2s ease-in-out infinite",
                        }}
                      >
                        {t("bestValue")}
                      </div>
                    </div>
                    <button
                      style={{
                        width: "100%",
                        background: "linear-gradient(135deg,rgb(27, 229, 240),rgb(73, 219, 210))",
                        border: "none",
                        borderRadius: "6px",
                        padding: "10px 0",
                        color: "white",
                        fontWeight: "600",
                        fontSize: "14px",
                        letterSpacing: "0.5px",
                        cursor: "pointer",
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.2s ease",
                        boxShadow: "0 2px 8px rgba(67, 160, 71, 0.3)",
                      }}
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.02)"
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(54, 172, 212, 0.4)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)"
                        e.currentTarget.style.boxShadow = "0 2px 8px rgba(49, 178, 234, 0.3)"
                      }}
                    >
                      <span
                        style={{
                          position: "relative",
                          zIndex: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginRight: "8px" }}
                        >
                          <path
                            d="M12 5V19"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19 12L12 19L5 12"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {t("seeDetails")}
                      </span>

                      {/* Button reflection */}
                      <div
                        style={{
                          position: "absolute",
                          top: "-100%",
                          left: "-100%",
                          right: "-100%",
                          bottom: "-100%",
                          background:
                            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)",
                          transform: "rotate(25deg)",
                          animation: "buttonReflection 2s ease-in-out infinite",
                          zIndex: 1,
                        }}
                      ></div>
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "60px 20px",
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ margin: "0 auto 20px" }}
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#43a047"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M8 12H16" stroke="#43a047" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 16V8" stroke="#43a047" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#2e2e2e",
                marginBottom: "8px",
              }}
            >
              {t("noHospitals")}
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#666",
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              {t("tryChanging")}
            </p>
          </div>
        )}
      </div>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes reflectionSweep {
            0% {
              transform: translateX(-100%) rotate(30deg);
              opacity: 0;
            }
            30% {
              opacity: 0.7;
            }
            70% {
              opacity: 0.7;
            }
            100% {
              transform: translateX(100%) rotate(30deg);
              opacity: 0;
            }
          }

          @keyframes buttonReflection {
            0% {
              transform: translateX(-100%) rotate(25deg);
            }
            100% {
              transform: translateX(100%) rotate(25deg);
            }
          }

          @keyframes pulseFade {
            0%, 100% {
              opacity: 0.8;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
            }
          }

          @keyframes cardPulse {
            0% {
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            50% {
              box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(67, 160, 71, 0.1);
            }
            100% {
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
          }

          @keyframes textPulse {
            0% {
              opacity: 0.9;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0.9;
            }
          }
        `}
      </style>
    </>
  )
}

export default Home
