// Payment handling utilities
function handlePaymentError(error) {
    console.error('Payment error:', error);
    alert('Payment failed. Please try again.');
}

function handlePaymentSuccess(response) {
    console.log('Payment successful:', response);
    // You can add additional success handling here
}

// Initialize payment form validation
document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('razorpay-payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Payment form validation can be added here
        });
    }
}); 