// payment-success.js - Handles QR Code and Print Booking

document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("loggedInUser"); // Check if user is logged in
    if (!user) {
        window.location.href = "login.html"; // Redirect to login page
    } else {
        renderVenues(); // Load venues if logged in
    }
});

document.addEventListener("DOMContentLoaded", () => {
    loadBookingDetails();
    generateQRCode();
});

function loadBookingDetails() {
    const selectedVenue = localStorage.getItem("selectedVenue");
    const selectedDate = localStorage.getItem("selectedDate");
    const selectedTime = localStorage.getItem("selectedTime");
    const selectedQuantity = localStorage.getItem("selectedQuantity");

    if (selectedVenue && selectedDate && selectedTime && selectedQuantity) {
        document.getElementById("successVenue").textContent = selectedVenue;
        document.getElementById("successDate").textContent = selectedDate;
        document.getElementById("successTime").textContent = selectedTime;
        document.getElementById("successQuantity").textContent = selectedQuantity;
    } else {
        alert("No booking details found. Redirecting to home.");
        window.location.href = "index.html";
    }
}

function generateQRCode() {
    const bookingDetails = {
        venue: localStorage.getItem("selectedVenue"),
        date: localStorage.getItem("selectedDate"),
        time: localStorage.getItem("selectedTime"),
        quantity: localStorage.getItem("selectedQuantity"),
    };
    const qrCodeContainer = document.getElementById("qrCode");
    if (qrCodeContainer) {
        qrCodeContainer.innerHTML = "";
        new QRCode(qrCodeContainer, JSON.stringify(bookingDetails));
    }
}

function printBooking() {
    window.print();
}
