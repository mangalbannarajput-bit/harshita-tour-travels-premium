/* =====================================================
   HARSHITA TOUR & TRAVELS
   PREMIUM BOOKING SYSTEM
   GITHUB ONLY VERSION
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

  const random =
    Math.floor(1000 + Math.random() * 9000);

  return `HTT-${year}-${random}`;

}


/* ================= REMAINING AMOUNT ================= */

function calculateRemaining() {

  const totalInput =
    document.getElementById("totalAmount");

  const advanceInput =
    document.getElementById("advanceAmount");

  const remainingInput =
    document.getElementById("remainingAmount");

  if (
    !totalInput ||
    !advanceInput ||
    !remainingInput
  ) {
    return;
  }

  const total =
    Number(totalInput.value) || 0;

  const advance =
    Number(advanceInput.value) || 0;

  const remaining =
    Math.max(total - advance, 0);

  remainingInput.value = remaining;

}


/* ================= MESSAGE ================= */

function showBookingMessage(
  message,
  type = "success"
) {

  const result =
    document.getElementById(
      "bookingResult"
    );

  if (!result) {
    return;
  }

  result.textContent = message;

  result.dataset.type = type;

}


/* =====================================================
   GET ALL BOOKINGS
   ===================================================== */

function getBookings() {

  const saved =
    localStorage.getItem(
      "htt_bookings"
    );

  if (!saved) {
    return [];
  }

  try {

    return JSON.parse(saved);

  } catch (error) {

    console.error(
      "Booking data error:",
      error
    );

    return [];

  }

}


/* =====================================================
   SAVE ALL BOOKINGS
   ===================================================== */

function saveBookings(bookings) {

  localStorage.setItem(
    "htt_bookings",
    JSON.stringify(bookings)
  );

}


/* =====================================================
   SUBMIT BOOKING
   ===================================================== */

function submitBooking(event) {

  event.preventDefault();

  const form =
    document.getElementById(
      "bookingForm"
    );

  if (!form) {
    return;
  }


  /* ================= CUSTOMER ================= */

  const name =
    document
      .getElementById("customerName")
      ?.value
      .trim() || "";


  const mobile =
    document
      .getElementById("customerMobile")
      ?.value
      .trim() || "";


  /* ================= JOURNEY ================= */

  const journey =
    document
      .getElementById("journeyName")
      ?.value || "";


  const date =
    document
      .getElementById("journeyDate")
      ?.value || "";


  const passengers =
    Number(
      document
        .getElementById("passengers")
        ?.value
    ) || 1;


  const seatNumber =
    document
      .getElementById("seatNumber")
      ?.value
      .trim() || "";


  const pickup =
    document
      .getElementById("pickupPoint")
      ?.value
      .trim() || "";


  const vehicle =
    document
      .getElementById("vehicle")
      ?.value || "";


  /* ================= PAYMENT ================= */

  const total =
    Number(
      document
        .getElementById("totalAmount")
        ?.value
    ) || 0;


  const advance =
    Number(
      document
        .getElementById("advanceAmount")
        ?.value
    ) || 0;


  const remaining =
    Math.max(
      total - advance,
      0
    );


  /* ================= VALIDATION ================= */

  if (!name) {

    showBookingMessage(
      "⚠️ कृपया ग्राहक का नाम डालें।",
      "error"
    );

    return;

  }


  if (
    !/^[6-9]\d{9}$/.test(
      mobile
    )
  ) {

    showBookingMessage(
      "⚠️ कृपया सही 10 अंकों का मोबाइल नंबर डालें।",
      "error"
    );

    return;

  }


  if (!journey) {

    showBookingMessage(
      "⚠️ कृपया यात्रा चुनें।",
      "error"
    );

    return;

  }


  if (advance > total) {

    showBookingMessage(
      "⚠️ Advance राशि कुल किराये से अधिक नहीं हो सकती।",
      "error"
    );

    return;

  }


  /* ================= CREATE BOOKING ================= */

  const booking = {

    bookingId:
      generateBookingId(),

    customerName:
      name,

    mobile:
      mobile,

    journey:
      journey,

    journeyDate:
      date,

    passengers:
      passengers,

    seatNumber:
      seatNumber,

    pickupPoint:
      pickup,

    vehicle:
      vehicle,

    totalAmount:
      total,

    advanceAmount:
      advance,

    remainingAmount:
      remaining,

    status:
      "Pending",

    createdAt:
      new Date().toISOString()

  };


  /* ================= SAVE ================= */

  const bookings =
    getBookings();

  bookings.push(
    booking
  );

  saveBookings(
    bookings
  );


  /* ================= LAST BOOKING ================= */

  localStorage.setItem(
    "htt_last_booking",
    JSON.stringify(
      booking
    )
  );


  /* ================= SUCCESS ================= */

  showBookingMessage(

    `✅ Booking Successfully Saved!

Booking ID: ${booking.bookingId}

ग्राहक: ${booking.customerName}

यात्रा: ${booking.journey}

यात्री: ${booking.passengers}

कुल राशि: ₹${booking.totalAmount}

Advance: ₹${booking.advanceAmount}

बाकी: ₹${booking.remainingAmount}`,

    "success"

  );


  /* ================= RESET ================= */

  form.reset();


  const remainingInput =
    document.getElementById(
      "remainingAmount"
    );

  if (remainingInput) {

    remainingInput.value =
      "0";

  }


  /* ================= SCROLL ================= */

  const result =
    document.getElementById(
      "bookingResult"
    );

  if (result) {

    result.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }


  console.log(
    "🚩 Booking saved:",
    booking
  );

}


/* =====================================================
   FIND BOOKING
   ===================================================== */

function findBooking() {

  const input =
    document.getElementById(
      "bookingId"
    );

  const message =
    document.getElementById(
      "bookingMessage"
    );

  if (
    !input ||
    !message
  ) {
    return;
  }


  const searchId =
    input.value
      .trim()
      .toUpperCase();


  if (!searchId) {

    message.textContent =
      "⚠️ कृपया Booking ID डालें।";

    return;

  }


  const bookings =
    getBookings();


  const booking =
    bookings.find(
      function (item) {

        return (
          item.bookingId ===
          searchId
        );

      }
    );


  if (!booking) {

    message.textContent =
      "❌ Booking ID नहीं मिली।";

    return;

  }


  /* ================= BOOKING FOUND ================= */

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

      <b>मोबाइल:</b>
      ${booking.mobile}

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

      <b>सीट:</b>
      ${booking.seatNumber || "-"}

      <br>

      <b>Pickup:</b>
      ${booking.pickupPoint}

      <br>

      <b>Vehicle:</b>
      ${booking.vehicle}

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


/* =====================================================
   DELETE ALL BOOKINGS
   ===================================================== */

function clearAllBookings() {

  const confirmDelete =
    confirm(
      "क्या आप सभी bookings हटाना चाहते हैं?"
    );

  if (!confirmDelete) {
    return;
  }

  localStorage.removeItem(
    "htt_bookings"
  );

  localStorage.removeItem(
    "htt_last_booking"
  );

  alert(
    "सभी bookings delete हो गईं।"
  );

}


/* ================= CONTACT ================= */

function showContactMessage() {

  alert(

    "🚩 Harshita Tour & Travels\n\n" +

    "Contact details जल्द ही activate होंगे।"

  );

}


/* =====================================================
   PAGE READY
   ===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function () {


    /* ================= AMOUNT ================= */

    const totalInput =
      document.getElementById(
        "totalAmount"
      );

    const advanceInput =
      document.getElementById(
        "advanceAmount"
      );


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


    /* ================= BOOKING FORM ================= */

    const bookingForm =
      document.getElementById(
        "bookingForm"
      );


    if (bookingForm) {

      bookingForm.addEventListener(
        "submit",
        submitBooking
      );

    }


    /* ================= MOBILE MENU ================= */

    const navLinks =
      document.querySelectorAll(
        "#navMenu a"
      );


    navLinks.forEach(
      function (link) {

        link.addEventListener(
          "click",
          function () {

            const nav =
              document.getElementById(
                "navMenu"
              );

            if (nav) {

              nav.classList.remove(
                "active"
              );

            }

          }
        );

      }
    );


    console.log(
      "🚩 Harshita Tour & Travels — GitHub Only System Ready"
    );

  }
);
