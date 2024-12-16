import React, { createContext, useState, useEffect } from "react";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currencies, setCurrencies] = useState([]); // Available currencies list
  const [selectedCurrency, setSelectedCurrency] = useState("UZS"); // Default currency
  const [rates, setRates] = useState({}); // Exchange rates

  // Fetch currencies and rates based on selectedCurrency
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/f8813bb4add84f2c50eec192/latest/${selectedCurrency}`
        );
        const data = await response.json();
        if (data.result === "success") {
          setCurrencies(Object.keys(data.conversion_rates)); // List of currencies
          setRates(data.conversion_rates); // Exchange rates for the selected currency
        } else {
          console.error("Failed to fetch currencies");
        }
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, [selectedCurrency]); // Rerun when selectedCurrency changes

  const value = {
    currencies, // Available currency codes
    selectedCurrency, // Current selected currency
    setSelectedCurrency, // Function to change selected currency
    rates, // Exchange rates based on selected currency
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
