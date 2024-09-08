document.getElementById('convert-btn').addEventListener('click', convertCurrency);

async function convertCurrency() {
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const amount = document.getElementById('amount').value;

    if (amount === "" || isNaN(amount)) {
        showError("Por favor, ingrese una cantidad válida.");
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        if (!response.ok) {
            throw new Error('Error al obtener los tipos de cambio.');
        }
        
        const data = await response.json();
        const rate = data.rates[toCurrency];
        
        if (!rate) {
            showError("Moneda no soportada.");
            return;
        }

        const convertedAmount = (amount * rate).toFixed(2);
        document.getElementById('conversion-result').textContent = `Resultado: ${convertedAmount} ${toCurrency}`;
        document.getElementById('error-message').textContent = ""; // Limpiar error si existía
    } catch (error) {
        showError("Error en la conversión. Intente nuevamente.");
    }
}

function showError(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('conversion-result').textContent = "Resultado: --";
}
