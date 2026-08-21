// ==========================================
// HARSHITA TOUR & TRAVELS
// PREMIUM BOOKING SYSTEM
// ==========================================


// MOBILE MENU
function toggleMenu() {
  const nav = document.getElementById("navMenu");

  if (nav) {
    nav.classList.toggle("active");
  }
}


// COMING SOON MESSAGE
function comingSoon() {

  alert(
    "🚩 Harshita Tour & Travels\n\n" +
    "Online Booking System जल्द ही शुरू होगा.\n\n" +
    "आपकी यात्रा, हमारी जिम्मेदारी ❤️"
  );

}


// BOOKING SEARCH
function findBooking() {

  const input = document.getElementById("bookingId");
  const message = document.getElementById("bookingMessage");

  if (!input || !message) {
    return;
  }

  const bookingId = input.value.trim();

  if (bookingId === "") {

    message.textContent =
      "⚠️ कृपया अपनी Booking ID डालें।";

    return;
  }

  message.textContent =
    "🔎 Booking खोजी जा रही है...";

  /*
    अभी Database connect नहीं है।

    बाद में यहाँ:
    1. Booking ID verify होगी
    2. Customer details आएंगी
    3. Payment status दिखेगा
    4. Receipt PDF मिलेगी
    5. Booking confirmation दिखेगा
  */

  setTimeout(function () {

    message.textContent =
      "ℹ️ Booking System जल्द ही सक्रिय होगा।";

  }, 1000);

}


// PAGE READY
document.addEventListener("DOMContentLoaded", function () {

  console.log(
    "🚩 Harshita Tour & Travels Premium System Loaded"
  );

});
