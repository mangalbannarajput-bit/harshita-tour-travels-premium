/* =====================================================
   HARSHITA TOUR & TRAVELS
   PREMIUM BOOKING SYSTEM
   SUPABASE CONNECTED VERSION
   ===================================================== */

"use strict";


/* =====================================================
   SUPABASE CONFIGURATION
   ===================================================== */

const SUPABASE_URL =
  "https://eqllcoqqoahimiwhtaxe.supabase.co";

const SUPABASE_FUNCTION =
  `${SUPABASE_URL}/functions/v1/create-booking`;

/*
   यह आपकी PUBLIC anon key है।
   Secret / service_role key यहाँ कभी नहीं डालनी है।
*/

const SUPABASE_PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbGxjb3Fxb2FoaW1pd2h0YXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyODYxOTAsImV4cCI6MjEwMjg2MjE5MH0.IJTlxQWzX_rmXRgS66vvphWNMzTtr-p5NuXEyEcIf7U";


/* =====================================================
   MOBILE MENU
   ===================================================== */

function toggleMenu() {

  const nav =
    document.getElementById("navMenu");

  if (nav) {
    nav.classList.toggle("active");
  }
}


/* =====================================================
   SELECT JOURNEY
   ===================================================== */

function selectJourney(journeyName) {

  const journey =
    document.getElementById("journeyName");

  const booking =
    document.getElementById("booking");

  if (journey) {
    journey.value = journeyName;
  }

  if (booking) {

    booking.scrollIntoView({
      behavior: "smooth"
    });

  }
}


/* =====================================================
   BOOKING ID
   ===================================================== */

function generateBookingId() {

  const year =
    new Date().getFullYear();

  const randomNumber =
    Math.floor(
      1000 + Math.random() * 9000
    );

  return `HTT-${year}-${randomNumber}`;
}


/* =====================================================
   CALCULATE REMAINING
   ===================================================== */

function calculateRemaining() {

  const totalInput =
    document.getElementById(
      "totalAmount"
    );

  const advanceInput =
    document.getElementById(
      "advanceAmount"
    );

  const remainingInput =
    document.getElementById(
      "remainingAmount"
    );

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

  let remaining =
    total - advance;

  if (remaining < 0) {
    remaining = 0;
  }

  remainingInput.value =
    remaining;
}


/* =====================================================
   SHOW MESSAGE
   ===================================================== */

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

  result.textContent =
    message;

  result.dataset.type =
    type;
}


/* =====================================================
   CREATE BOOKING — SUPABASE
   ===================================================== */

async function sendBookingToSupabase(
  bookingData
) {

  const response =
    await fetch(
      SUPABASE_FUNCTION,
      {
        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          "apikey":
            SUPABASE_PUBLIC_KEY,

          "Authorization":
            `Bearer ${SUPABASE_PUBLIC_KEY}`
        },

        body:
          JSON.stringify({

            name:
              bookingData.customerName,

            mobile:
              bookingData.mobile,

            journey:
              bookingData.journey,

            journey_date:
              bookingData.journeyDate,

            passengers:
              bookingData.passengers,

            pickup_point:
              bookingData.pickupPoint,

            vehicle:
              bookingData.vehicle,

            total_amount:
              bookingData.totalAmount,

            advance_amount:
              bookingData.advanceAmount

          })
      }
    );


  let data = null;

  try {

    data =
      await response.json();

  } catch (error) {

    data = null;

  }


  if (!response.ok) {

    console.error(
      "Supabase Function Error:",
      data
    );

    throw new Error(
      data?.message ||
      "Booking database में save नहीं हो सकी।"
    );
  }


  if (
    !data ||
    data.success !== true
  ) {

    throw new Error(
      data?.message ||
      "Booking create नहीं हुई।"
    );

  }


  return data;
}


/* =====================================================
   BOOKING SUBMIT
   ===================================================== */

async function submitBooking(event) {

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
      .getElementById(
        "customerName"
      )
      ?.value
      .trim() || "";


  const mobile =
    document
      .getElementById(
        "customerMobile"
      )
      ?.value
      .trim() || "";


  /* ================= JOURNEY ================= */

  const journey =
    document
      .getElementById(
        "journeyName"
      )
      ?.value || "";


  const date =
    document
      .getElementById(
        "journeyDate"
      )
      ?.value || "";


  const passengers =
    Number(
      document
        .getElementById(
          "passengers"
        )
        ?.value
    ) || 1;


  const pickup =
    document
      .getElementById(
        "pickupPoint"
      )
      ?.value
      .trim() || "";


  const vehicle =
    document
      .getElementById(
        "vehicle"
      )
      ?.value || "";


  /* ================= PAYMENT ================= */

  const total =
    Number(
      document
        .getElementById(
          "totalAmount"
        )
        ?.value
    ) || 0;


  const advance =
    Number(
      document
        .getElementById(
          "advanceAmount"
        )
        ?.value
    ) || 0;


  const remaining =
    Math.max(
      total - advance,
      0
    );


  /* =================================================
     VALIDATION
     ================================================= */

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


  /* =================================================
     TEMP BOOKING OBJECT
     ================================================= */

  const temporaryBookingId =
    generateBookingId();


  const bookingData = {

    bookingId:
      temporaryBookingId,

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


  /* =================================================
     LOADING
     ================================================= */

  showBookingMessage(
    "⏳ आपकी booking सुरक्षित की जा रही है...",
    "loading"
  );


  try {

    /* ===============================================
       SEND TO SUPABASE EDGE FUNCTION
       =============================================== */

    const result =
      await sendBookingToSupabase(
        bookingData
      );


    /* ===============================================
       REAL BOOKING ID
       =============================================== */

    if (
      result.booking_id
    ) {

      bookingData.bookingId =
        result.booking_id;

    }


    /* ===============================================
       STATUS
       =============================================== */

    bookingData.status =
      "Pending";


    /* ===============================================
       LOCAL BACKUP
       =============================================== */

    localStorage.setItem(
      "htt_last_booking",
      JSON.stringify(
        bookingData
      )
    );


    /* ===============================================
       SUCCESS MESSAGE
       =============================================== */

    showBookingMessage(

      `✅ Booking Successfully प्राप्त हुई!

Booking ID: ${bookingData.bookingId}

आपकी booking सुरक्षित रूप से database में save हो गई है।`,

      "success"

    );


    /* ===============================================
       RESET FORM
       =============================================== */

    form.reset();


    const remainingInput =
      document.getElementById(
        "remainingAmount"
      );


    if (remainingInput) {

      remainingInput.value =
        "0";

    }


    /* ===============================================
       SCROLL RESULT
       =============================================== */

    const resultBox =
      document.getElementById(
        "bookingResult"
      );


    if (resultBox) {

      resultBox.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }


    console.log(
      "🚩 Booking saved:",
      result
    );


  } catch (error) {

    console.error(
      "BOOKING ERROR:",
      error
    );


    showBookingMessage(

      `❌ Booking save नहीं हो सकी।

${error.message || "कृपया थोड़ी देर बाद फिर कोशिश करें।"}`,

      "error"

    );

  }

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


  /* ===============================================
     FIRST TRY LOCAL BACKUP
     =============================================== */

  const savedBooking =
    localStorage.getItem(
      "htt_last_booking"
    );


  if (!savedBooking) {

    message.textContent =
      "ℹ️ Booking search का database version अगले चरण में activate होगा।";

    return;
  }


  let booking;


  try {

    booking =
      JSON.parse(
        savedBooking
      );

  } catch (error) {

    message.textContent =
      "❌ Booking data पढ़ने में समस्या हुई।";

    return;
  }


  if (
    booking.bookingId !==
    searchId
  ) {

    message.textContent =
      "❌ इस device पर यह Booking ID नहीं मिली।";

    return;
  }


  /* ===============================================
     BOOKING FOUND
     =============================================== */

  message.innerHTML = `

    <div class="booking-found">

      <strong>
        ✅ Booking मिल गई
      </strong>

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
   CONTACT
   ===================================================== */

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


    /* ===============================================
       CALCULATE REMAINING
       =============================================== */

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


    /* ===============================================
       BOOKING FORM
       =============================================== */

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


    /* ===============================================
       MOBILE MENU
       =============================================== */

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


    /* ===============================================
       SYSTEM READY
       =============================================== */

    console.log(
      "🚩 Harshita Tour & Travels Premium — Supabase Connected"
    );

  }
);
