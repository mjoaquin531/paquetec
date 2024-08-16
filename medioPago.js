// Mercado Pago Public Key
const mp = new MercadoPago('YOUR_PUBLIC_KEY', {
    locale: 'es-AR' // Set locale
});

// Card Form Setup
const cardForm = mp.cardForm({
    amount: "100.00",
    autoMount: true,
    form: {
        id: "form-checkout",
        cardholderName: {
            id: "form-checkout__cardholderName",
            placeholder: "Titular de la tarjeta",
        },
        cardholderEmail: {
            id: "form-checkout__cardholderEmail",
            placeholder: "E-mail",
        },
        cardNumber: {
            id: "form-checkout__cardNumber",
            placeholder: "Número de la tarjeta",
        },
        expirationDate: {
            id: "form-checkout__expirationDate",
            placeholder: "MM/YY",
        },
        securityCode: {
            id: "form-checkout__securityCode",
            placeholder: "CVV",
        }
    },
    callbacks: {
        onFormMounted: error => {
            if (error) return console.warn("Form Mounted handling error: ", error);
            console.log("Form mounted");
        },
        onSubmit: event => {
            event.preventDefault();

            const formData = cardForm.getCardFormData();

            fetch("/process_payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(result => {
                if (result.status === "approved") {
                    alert("Pago aprobado!");
                } else {
                    alert("Hubo un problema con tu pago.");
                }
            })
            .catch(error => {
                console.error("Error al procesar el pago:", error);
            });
        }
    }
});

document.getElementById('mercadoPagoBtn').addEventListener('click', function() {
    // Aquí iría la lógica de integración con Mercado Pago
    mercadoPago.checkout({
        preference: {
            id: 'PREFERENCE_ID'
        }
    });
});
