import { useState, useEffect } from "react";

const CURRENCIES = [
  { code: "USD", name: "US Dollar", flag: "US" },
{ code: "INR", name: "Indian Rupee", flag: "IN" },
{ code: "EUR", name: "Euro", flag: "EU" }, 
{ code: "JPY", name: "Japanese Yen", flag: "JP" },
{ code: "BRL", name: "Brazilian Real", flag: "BR" },
{ code: "GBP", name: "British Pound", flag: "GB" },
{ code: "AUD", name: "Australian Dollar", flag: "AU" },
{ code: "CAD", name: "Canadian Dollar", flag: "CA" },
{ code: "CNY", name: "Chinese Yuan", flag: "CN" },
{ code: "RUB", name: "Russian Ruble", flag: "RU" },
{ code: "ZAR", name: "South African Rand", flag: "ZA" },
{ code: "KRW", name: "South Korean Won", flag: "KR" },
{ code: "MXN", name: "Mexican Peso", flag: "MX" }
  
  // Adicione mais moedas conforme necessário
];

const App = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/0a2b751c583a266a1394e17c/latest/${fromCurrency}`);
        const data = await res.json();
        setExchangeRates(data.conversion_rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, [fromCurrency]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    setLoading(true);
    setResult(null);

    const rate = exchangeRates[toCurrency];
    if (rate) {
      const convertedAmount = (amount * rate).toFixed(2);
      setResult(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
    } else {
      setResult("Failed to fetch exchange rate.");
    }

    setLoading(false);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  return (
    <div className="currency-converter">
      <h2 className="converter-title">Currency Converter</h2>
      <form className="converter-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="amount-input">
            Enter Amount
          </label>
          <input
            id="amount-input"
            type="number"
            className="form-input"
            required
            min={0.01}
            step="any"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <div className="form-group form-currency-group">
          {/* Campo From */}
          <div className="form-section">
            <label className="form-label" htmlFor="from-currency">
              From
            </label>
            <div className="currency-select">
              <img
                src={
                  CURRENCIES.find(c => c.code === fromCurrency)?.flag === "EU"
                    ? "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
                    : `https://flagsapi.com/${CURRENCIES.find(c => c.code === fromCurrency)?.flag}/flat/64.png`
                }
                alt={`${fromCurrency} flag`}
                className="flag-img"
              />
              <select
                id="from-currency"
                className="currency-dropdown"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {CURRENCIES.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botão de troca */}
          <div className="swap-icon" onClick={handleSwap} title="Swap currencies" tabIndex={0} role="button">
            <svg width="24" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
                fill="#fff"
              />
            </svg>
          </div>

          {/* Campo To */}
          <div className="form-section">
            <label className="form-label" htmlFor="to-currency">
              To
            </label>
            <div className="currency-select">
              <img
                src={
                  CURRENCIES.find(c => c.code === toCurrency)?.flag === "EU"
                    ? "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
                    : `https://flagsapi.com/${CURRENCIES.find(c => c.code === toCurrency)?.flag}/flat/64.png`
                }
                alt={`${toCurrency} flag`}
                className="flag-img"
              />
              <select
                id="to-currency"
                className="currency-dropdown"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {CURRENCIES.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="button-container">
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Loading..." : "Get Exchange Rate"}
          </button>
          {result && <p className="exchange-rate-result">{result}</p>}
        </div>
      </form>
    </div>
  );
};

export default App;
