const stripe = Stripe('your_publishable_key');

document.querySelector('#payment-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const { clientSecret } = await fetch(`/payment/create-payment-intent/${listingId}`, {
        method: 'POST',
    }).then((res) => res.json());

    const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
                name: 'Customer Name',
            },
        },
    });

    if (error) {
        console.error('Payment failed:', error);
        alert('Payment failed');
    } else {
        alert('Payment successful');
        window.location.href = `/listings/${listingId}`;
    }
});
