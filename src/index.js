import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CurrencyProvider } from "./context/currentContext"; // CurrencyProvider ni import qilish
// Initialize AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease'
  });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CurrencyProvider>
      <App />
    </CurrencyProvider>
  </React.StrictMode>
);



