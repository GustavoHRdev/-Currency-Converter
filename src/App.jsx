import { useState } from "react";

const App = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (amount <= 0) return alert("Please enter a valid amount!");

    try {
      const res = await fetch(
        `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
      );
      const data = await res.json();
      setResult(`${amount} ${fromCurrency} = ${data.result.toFixed(2)} ${toCurrency}`);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setResult("Failed to fetch exchange rate.");
    }
  };

  return (
    <div className="currency-converter">
      <h2 className="converter-title">Currency Converter</h2>
      <form className="converter-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Enter Amount</label>
          <input
            type="number"
            className="form-input"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group form-currency-group">
  {/* Campo From */}
  <div className="form-section">
    <label className="form-label">From</label>
    <div className="currency-select">
      <img src={`https://flagsapi.com/${fromCurrency.slice(0, 2)}/flat/64.png`} alt="From Flag" />
      <select
        className="currency-dropdown"
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="NPR">NPR</option>
      </select>
    </div>
  </div>

  {/* Botão de troca */}
  <div className="swap-icon" onClick={() => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  }}>
    <svg width="24" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
        fill="#fff"
      />
    </svg>
  </div>

  {/* Campo To */}
  <div className="form-section">
    <label className="form-label">To</label>
    <div className="currency-select">
      <img src={`https://flagsapi.com/${toCurrency.slice(0, 2)}/flat/64.png`} alt="To Flag" />
      <select
        className="currency-dropdown"
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="NPR">NPR</option>
      </select>
    </div>
  </div>
</div>


        <div className="button-container">
          <button type="submit" className="submit-button">
            Get Exchange Rate
          </button>
          {result && <p className="exchange-rate-result">{result}</p>}
        </div>
      </form>
    </div>
  );
};

export default App;
