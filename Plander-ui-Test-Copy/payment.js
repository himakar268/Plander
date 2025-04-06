function loadBookingDetails() {
    const bookingDetails = localStorage.getItem('bookingDetails');
     console.log("payemnt :"+bookingDetails);
    if (!bookingDetails) {
        alert('No booking details found. Please go back and book a venue.');
        window.location.href = 'booking.html';
        return;
    }

    document.getElementById('selectedVenue').textContent = bookingDetails.venue;
    document.getElementById('selectedCapacity').textContent = bookingDetails.availableCapacity;
    document.getElementById('selectedQuantity').textContent = bookingDetails.seatsBooked;
    document.getElementById('selectedDate').textContent = bookingDetails.date;
    document.getElementById('selectedTime').textContent = bookingDetails.time;
    document.getElementById('ratePerHour').textContent = `$${bookingDetails.ratePerHour}`;
    document.getElementById('totalPrice').textContent = `$${bookingDetails.seatsBooked * bookingDetails.ratePerHour}`;
}

async function confirmPayment() {
    const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
    
    if (!bookingDetails) {
        alert('No booking details found. Please go back and book a venue.');
        return;
    }

    const paymentMethodElement = document.querySelector('.payment-form.active input[name=paymentMethod]');
    if (!paymentMethodElement) {
        alert('Please select a payment method.');
        return;
    }

    const totalAmount = bookingDetails.seatsBooked * bookingDetails.ratePerHour;
    
    const paymentPayload = {
        venueId: bookingDetails.venueId,
        date: bookingDetails.date,
        time: bookingDetails.time,
        slot: bookingDetails.seatsBooked,
        userEmail: bookingDetails.userEmail,
        amount: totalAmount,
        paymentMethod: paymentMethodElement.value,
    };

    try {
        const response = await fetch('http://localhost:8083/api/payments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paymentPayload),
        });

        if (!response.ok) {
            throw new Error(`Payment failed: ${response.status} ${response.statusText}`);
        }

        alert(`Payment of ₹${totalAmount} is successful!`);
        localStorage.removeItem('bookingDetails');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error processing payment:', error);
        alert('Payment failed. Please try again.');
    }
}


