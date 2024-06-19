import { useEffect, useState } from 'react';
import React from "react";

const Home = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(null);
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);

  const fetchCurrency = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error("Error Fetching", error);
    }
  };

  useEffect(() => {
    fetchCurrency();
  }, []);
  
  console.log(currencies);

  const convertCurrency = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.error("Error Fetching", error);
    } finally {
      setConverting(false);
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        width: "35%",
        border: "3px ",
        padding: "20px",
        paddingTop: "150px",
      }}
    >
      <h2>Your Currency Converter</h2>
      <br />
      <div className="input-group mb-2" style={{ width: "400px" }}>
        <div className="input-group-prepend">
          <select
            className="btn btn-dark"
            aria-label="Default select example"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <input
          type="number"
          className="form-control"
          aria-label="Text input with dropdown button"
          placeholder="Enter the amount here"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <br />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="380"
        height="35"
        color="gray"
        fill="currentColor"
        className="bi bi-arrow-down-up"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"
        />
      </svg>
      <br />
      <br />
      <div className="input-group" style={{ width: "400px" }}>
        <input
          type="text"
          className="form-control"
          aria-label="Text input with dropdown button"
          value={convertedAmount || ""}
          placeholder="Converted Amount"
          readOnly
        />
        <select
          className="btn btn-dark"
          aria-label="Default select example"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option className="form-select" key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <br />
      <br/>
      <button
        className="btn btn-success"
        type="button"
        onClick={convertCurrency}
        style={{
          alignContent: "center",
          height: "50px",
          width: "120px",
          margin: "-20px -50px",
          position: "relative",
          top: "50%",
          left: "40%",
        }}
      >
        {converting ? "Converting..." : "Convert"}
      </button>
    </div>
  );
};

export default Home;

