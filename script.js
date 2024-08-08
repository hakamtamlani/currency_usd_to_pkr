
// layer api used for real time data 

async function convertToRupees() {
    const apiKey = "AENyrz85mPvcO2PfOtepAcCZ1A8jMq6M"; // Replace with your valid API key
    const apiUrl = "https://api.apilayer.com/exchangerates_data/latest?base=USD&symbols=PKR";
  
    const myHeaders = new Headers();
    myHeaders.append("apikey", apiKey);
  
    const requestOptions = {
        method: 'GET',
        headers: myHeaders
    };
  
    try {
        const response = await fetch(apiUrl, requestOptions);
  
        // Check for HTTP errors
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("API Response:", data); // Debugging
  
        // Check for valid data
        if (data && data.rates && data.rates.PKR) {
            const exchangeRate = data.rates.PKR;
            const usdAmount = parseFloat(document.getElementById("currency").value);
  
            if (isNaN(usdAmount) || usdAmount <= 0) {
                document.getElementById("curen").innerText = "Please enter a valid amount.";
                return;
            }
  
            const rupeesAmount = usdAmount * exchangeRate;
            document.getElementById("curen").innerText =
                rupeesAmount.toFixed(2) + " Pakistani Rupees";
        } else {
            throw new Error("Invalid response data: Missing exchange rate information.");
        }
    } catch (error) {
        console.error("Error fetching the exchange rate:", error.message);
        document.getElementById("curen").innerText = "Error: " + error.message;
    }
  }