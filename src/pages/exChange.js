import React, { useState, useEffect } from "react";

const ExchangeRate = () => {
  const [currencies, setCurrencies] = useState([]); // List of currencies
  const [fromCurrency, setFromCurrency] = useState("USD"); // Default 'From' currency
  const [toCurrency, setToCurrency] = useState("EUR"); // Default 'To' currency
  const [amount, setAmount] = useState(1); // Input amount
  const [convertedAmount, setConvertedAmount] = useState(null); // Conversion result
  const [loading, setLoading] = useState(false); // Loading state

  const API_URL = `https://v6.exchangerate-api.com/v6/f8813bb4add84f2c50eec192/latest/`;

  // Fetch available currencies when the component mounts
  useEffect(() => {
    fetch(API_URL + "USD")
      .then((response) => response.json())
      .then((data) => {
        const currencyList = Object.keys(data.conversion_rates);
        setCurrencies(currencyList);
      })
      .catch((error) => console.error("Error fetching currencies:", error));
  }, []);

  const handleConvert = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    setLoading(true); // Show loading
    try {
      const response = await fetch(API_URL + fromCurrency);
      const data = await response.json();
      const rate = data.conversion_rates[toCurrency];
      const result = amount * rate;
      setConvertedAmount(result);
    } catch (error) {
      console.error("Error converting currency:", error);
    } finally {
      setLoading(false); // Hide loading
    }
  };

  return (
    <div className="min-h-[100px]  flex items-center justify-center bg-gray-100 mr-[20px]">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Currency Exchange
        </h1>

        <div className="flex items-center justify-between space-x-4 mb-4">
          {/* Amount input */}
          <div className="flex-1">
            <label htmlFor="amount" className="block text-gray-600 mb-1">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter amount"
            />
          </div>

          {/* From currency selector */}
          <div className="flex-1">
            <label htmlFor="fromCurrency" className="block text-gray-600 mb-1">
              From
            </label>
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          {/* To currency selector */}
          <div className="flex-1">
            <label htmlFor="toCurrency" className="block text-gray-600 mb-1">
              To
            </label>
            <select
              id="toCurrency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Convert button */}
        <button
          onClick={handleConvert}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          {loading ? "Converting..." : "Convert"}
        </button>

        {/* Display conversion result */}
        {convertedAmount !== null && (
          <div className="mt-6 bg-green-100 text-green-800 p-4 rounded-md">
            <p className="text-center font-medium">
              {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangeRate;
