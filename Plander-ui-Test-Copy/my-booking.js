<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Bookings - Plander</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
  <link rel="stylesheet" href="style.css">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #333;
      padding: 10px 20px;
      color: white;
    }

    .navbar .logo {
      font-size: 24px;
      font-weight: bold;
    }

    .navbar .nav-links {
      display: flex;
      gap: 10px;
    }

    .navbar .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .navbar .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .navbar .btn-danger {
      background-color: #dc3545;
      color: white;
    }

    .email-input {
      margin: 20px;
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .email-input input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 300px;
    }

    .email-input button {
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .bookings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px;
    }

    .booking-card {
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .booking-card p {
      margin: 8px 0;
    }

    .booking-card button {
      padding: 8px 16px;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .back-to-home {
      margin: 20px;
    }

    .back-to-home button {
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <nav class="navbar">
    <div class="logo">Plander</div>
    <div class="nav-links">
      <button id="backToHomeBtn" class="btn btn-primary">Back to Home</button>
    </div>
  </nav>

  <main id="mainContent">
    <h1 style="margin: 20px;">My Bookings</h1>
    <div class="email-input">
      <label for="userEmail">Enter your email:</label>
      <input type="email" id="userEmail" placeholder="Enter your email">
      <button id="fetchBookingsBtn" class="btn btn-primary">Fetch Bookings</button>
    </div>

    <div id="bookingsContainer" class="bookings-grid">
      <!-- Bookings will be loaded dynamically here -->
    </div>
  </main>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const fetchBookingsBtn = document.getElementById('fetchBookingsBtn');
      const bookingsContainer = document.getElementById('bookingsContainer');
      const backToHomeBtn = document.getElementById('backToHomeBtn');

      // Redirect to index.html
      backToHomeBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
      });

      fetchBookingsBtn.addEventListener('click', async () => {
        const userEmail = document.getElementById('userEmail').value;
        if (!userEmail) {
          alert('Please enter your email.');
          return;
        }

        try {
          const response = await fetch(`http://localhost:8085/api/payments/user/${userEmail}`);
          if (!response.ok) throw new Error('Failed to fetch bookings');
          const bookings = await response.json();
          renderBookings(bookings);
        } catch (error) {
          console.error('Error fetching bookings:', error);
          alert('Failed to fetch bookings. Please try again.');
        }
      });

      function renderBookings(bookings) {
        bookingsContainer.innerHTML = bookings.map(booking => `
          <div class="booking-card">
            <p><strong>Venue ID:</strong> ${booking.venueId}</p>
            <p><strong>Date:</strong> ${booking.date}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
            <p><strong>Amount:</strong> ₹${booking.amount}</p>
            <p><strong>Payment Method:</strong> ${booking.paymentMethod}</p>
            ${isFutureBooking(booking.date, booking.time) ? `<button class="btn btn-danger" onclick="cancelBooking('${booking.id}')">Cancel Booking</button>` : ''}
          </div>
        `).join('');
      }

      function isFutureBooking(date, time) {
        const bookingDateTime = new Date(`${date}T${time}`);
        const currentDateTime = new Date();
        return bookingDateTime > currentDateTime;
      }

      async function cancelBooking(bookingId) {
        try {
          const response = await fetch(`http://localhost:8085/api/payments/${bookingId}`, {
            method: 'DELETE',
          });
          if (!response.ok) throw new Error('Failed to cancel booking');
          alert('Booking cancelled successfully!');
          fetchBookingsBtn.click(); // Refresh the bookings list
        } catch (error) {
          console.error('Error cancelling booking:', error);
          alert('Failed to cancel booking. Please try again.');
        }
      }
    });
  </script>
</body>
</html>