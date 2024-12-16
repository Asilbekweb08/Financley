import React, { useState, useContext } from "react";
import { CurrencyContext } from "../../context/currentContext.js"; // Import the context
import "./styles.css";
import { TbMoneybag } from "react-icons/tb";
import { AiFillSetting } from "react-icons/ai";
import UserProfile from "../UserProfileFeture";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openOrder, setIsOpenOrder] = useState(0);

  // Consume the context
  const { currencies, selectedCurrency, setSelectedCurrency } = useContext(CurrencyContext);

  const handleOpen = () => {
    if (openOrder === 0) {
      setIsOpen(true);
      setIsOpenOrder(1);
    } else if (openOrder === 1) {
      setIsOpen(false);
      setIsOpenOrder(0);
    }
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value); // Update the selected currency
  };

  return (
    <>
      <div className="navbar">
        <h1>
          Financely
          <TbMoneybag className="logo-image" />
        </h1>
        <div className="currency-dropdown">
          <select value={selectedCurrency} onChange={handleCurrencyChange}>
            {currencies.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>
        <AiFillSetting className="menu-btn" onClick={handleOpen} />
      </div>
      {isOpen && <UserProfile className="profile" />}
    </>
  );
};

export default Header;
