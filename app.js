/* =====================================================
   HARSHITA TOUR & TRAVELS
   PREMIUM BOOKING SYSTEM
   ===================================================== */

"use strict";

/* ================= MOBILE MENU ================= */

function toggleMenu() {
  const nav = document.getElementById("navMenu");

  if (nav) {
    nav.classList.toggle("active");
  }
}


/* ================= SELECT JOURNEY ================= */

function selectJourney(journeyName) {

  const journey = document.getElementById("journeyName");
  const booking = document.getElementById("booking");

  if (journey) {
    journey.value = journeyName;
  }

  if (booking) {
    booking.scrollIntoView({
      behavior: "smooth"
    });
  }
}


/* ================= BOOKING ID ================= */

function generateBookingId() {

  const year = new Date().getFullYear();

  const randomNumber =
    Math.floor(1000 + Math.random() * 9000);

  return `HTT-${year}-${randomNumber}`;
}


/* ================= CALCULATE REMAINING ================= */

function calculateRemaining() {

  const totalInput =
    document.getElementById("totalAmount");

  const advanceInput =
    document.getElementById("advanceAmount");

  const remainingInput =
    document.getElementById("remainingAmount");

  if (!totalInput || !advanceInput || !remainingInput) {
    return;
  }

  const total =
    Number(totalInput.value) || 0;

  const advance =
    Number(advanceInput.value) || 0;

  let remaining = total - advance;

  if (remaining < 0) {
    remaining = 0;
  }

  remainingInput.value = remaining;
}


/* ================= SHOW MESSAGE ================= */

function showBookingMessage(message, type = "success") {

  const result =
    document.getElementById("bookingResult");

  if (!result) {
    return;
  }

  result.textContent = message;

  result.dataset.type = type;
}


/* ================= BOOKING SUBMIT ================= */

function submitBooking(event) {

  event.preventDefault();

  const form =
    document.getElementById("bookingForm");

  if (!form) {
    return;
  }


  const name =
    document.getElementById("customerName").value.trim();

  const mobile =
    document.getElementById("customerMobile").value.trim();

  const journey =
    document.getElementById("journeyName").value;

  const date =
    document.getElementById("journeyDate").value;

  const passengers =
    Number(document.getElementById("passengers").value);

  const pickup =
    document.getElementById("pickupPoint").value.trim();

  const vehicle =
    document.getElementById("vehicle").value;

  const total =
    Number(document.getElementById("totalAmount").value) || 0;

  const advance =
    Number(document.getElementById("advanceAmount").value) || 0;

  const remaining =
    Math.max(total - advance, 0);


  /* MOBILE VALIDATION */

  if (!/^[6-9]\d{9}$/.test(mobile)) {

    showBookingMessage(
      "⚠️ कृपया सही 10 अंकों का मोबाइल नंबर डालें।",
      "error"
    );

    return;
  }


  /* AMOUNT VALIDATION */

  if (advance > total) {

    showBookingMessage(
      "⚠️ Advance राशि कुल किराये से अधिक नहीं हो सकती।",
      "error"
    );

    return;
  }


  /* BOOKING ID */

  const bookingId =
    generateBookingId();


  /* TEMPORARY BOOKING OBJECT */

  const bookingData = {

    bookingId: bookingId,

    customerName: name,

    mobile: mobile,

    journey: journey,

    journeyDate: date,

    passengers: passengers,

    pickupPoint: pickup,

    vehicle: vehicle,

    totalAmount: total,

    advanceAmount: advance,

    remainingAmount: remaining,

    status: "Pending",

    createdAt:
      new Date().toISOString()

  };


  /*
     अभी temporary browser storage है।

     अगला version इसे Supabase database में
     permanently save करेगा।
  */

  localStorage.setItem(
    "htt_last_booking",
    JSON.stringify(bookingData)
  );


  /* SUCCESS */

  showBookingMessage(
    `✅ Booking Request प्राप्त हुई!\n\nBooking ID: ${bookingId}\n\nहमारी टीम जल्द ही आपसे संपर्क करेगी।`,
    "success"
  );


  /* RESET FORM */

  form.reset();

  document.getElementById(
    "remainingAmount"
  ).value = "0";


  /* SCROLL TO RESULT */

  const result =
    document.getElementById("bookingResult");

  if (result) {

    result.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }
}


/* ================= FIND BOOKING ================= */

function findBooking() {

  const input =
    document.getElementById("bookingId");

  const message =
    document.getElementById("bookingMessage");

  if (!input || !message) {
    return;
  }


  const searchId =
    input.value.trim().toUpperCase();


  if (!searchId) {

    message.textContent =
      "⚠️ कृपया Booking ID डालें।";

    return;
  }


  const savedBooking =
    localStorage.getItem("htt_last_booking");


  if (!savedBooking) {

    message.textContent =
      "❌ इस device पर कोई booking नहीं मिली।";

    return;
  }


  let booking;

  try {

    booking =
      JSON.parse(savedBooking);

  } catch (error) {

    message.textContent =
      "❌ Booking data पढ़ने में समस्या हुई।";

    return;
  }


  if (booking.bookingId !== searchId) {

    message.textContent =
      "❌ Booking ID नहीं मिली। कृपया सही ID डालें।";

    return;
  }


  /* BOOKING FOUND */

  message.innerHTML = `

    <div class="booking-found">

      <strong>✅ Booking मिल गई</strong>

      <br><br>

      <b>Booking ID:</b>
      ${booking.bookingId}

      <br>

      <b>नाम:</b>
      ${booking.customerName}

      <br>

      <b>यात्रा:</b>
      ${booking.journey}

      <br>

      <b>यात्रा तारीख:</b>
      ${booking.journeyDate}

      <br>

      <b>यात्री:</b>
      ${booking.passengers}

      <br>

      <b>कुल राशि:</b>
      ₹${booking.totalAmount}

      <br>

      <b>Advance:</b>
      ₹${booking.advanceAmount}

      <br>

      <b>बाकी:</b>
      ₹${booking.remainingAmount}

      <br><br>

      <b>Status:</b>
      ${booking.status}

    </div>

  `;
}


/* ================= CONTACT ================= */

function showContactMessage() {

  alert(
    "🚩 Harshita Tour & Travels\n\n" +
    "Contact details जल्द ही activate होंगे।"
  );

}


/* ================= PAGE READY ================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {


    /* CALCULATE REMAINING */

    const totalInput =
      document.getElementById("totalAmount");

    const advanceInput =
      document.getElementById("advanceAmount");


    if (totalInput) {

      totalInput.addEventListener(
        "input",
        calculateRemaining
      );

    }


    if (advanceInput) {

      advanceInput.addEventListener(
        "input",
        calculateRemaining
      );

    }


    /* BOOKING FORM */

    const bookingForm =
      document.getElementById("bookingForm");


    if (bookingForm) {

      bookingForm.addEventListener(
        "submit",
        submitBooking
      );

    }


    /* MOBILE MENU CLOSE */

    const navLinks =
      document.querySelectorAll(
        "#navMenu a"
      );


    navLinks.forEach(function (link) {

      link.addEventListener(
        "click",
        function () {

          const nav =
            document.getElementById(
              "navMenu"
            );

          if (nav) {
            nav.classList.remove("active");
          }

        }
      );

    });


    console.log(
      "🚩 Harshita Tour & Travels Premium System Ready"
    );

  }
);
