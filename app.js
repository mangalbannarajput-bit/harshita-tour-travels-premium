/* =====================================================
   HARSHITA TOUR & TRAVELS
   PREMIUM BOOKING SYSTEM
   DIRECT SUPABASE API
   ===================================================== */

"use strict";


/* ================= SUPABASE ================= */

const SUPABASE_URL =
  "https://eqllcoqqoahimiwhtaxe.supabase.co";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbGxjb3Fxb2FoaW1pd2h0YXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyODYxOTAsImV4cCI6MjEwMjg2MjE5MH0.IJTlxQWzX_rmXRgS66vvphWNMzTtr-p5NuXEyEcIf7U";

const BOOKINGS_API =
  `${SUPABASE_URL}/rest/v1/Bookings`;


/* ================= MOBILE MENU ================= */

function toggleMenu() {

  const nav =
    document.getElementById("navMenu");

  if (nav) {
    nav.classList.toggle("active");
  }
}


/* ================= SELECT JOURNEY ================= */

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


/* ================= BOOKING ID ================= */

function generateBookingId() {

  const year =
    new Date().getFullYear();

  const random =
    Math.floor(
      1000 + Math.random() * 9000
    );

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

  remainingInput.value =
    remaining;
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

  result.textContent =
    message;

  result.dataset.type =
    type;
}


/* =====================================================
   SAVE BOOKING DIRECTLY TO SUPABASE
   ===================================================== */

async function saveBookingToSupabase(
  booking
) {

  const response =
    await fetch(
      BOOKINGS_API,
      {
        method: "POST",

        headers: {

          "apikey":
            SUPABASE_KEY,

          "Authorization":
            `Bearer ${SUPABASE_KEY}`,

          "Content-Type":
            "application/json",

          "Prefer":
            "return=representation"
        },

        body:
          JSON.stringify({

            "Booking_id":
              booking.bookingId,

            "Joirney_name":
              booking.journey,

            "Journey_date":
              booking.journeyDate || null,

            "Passenger":
              booking.passengers,

            "Seat number":
              booking.seatNumber || null,

            "Pickup_point":
              booking.pickupPoint,

            "Vehicle":
              booking.vehicle,

            "Total_ammount":
              booking.totalAmount,

            "Advance_ammount":
              booking.advanceAmount,

            "Remaining_ammount":
              booking.remainingAmount,

            "Satatus":
              "Pending"

          })
      }
    );


  const text =
    await response.text();

  let data = null;

  try {
    data = JSON.parse(text);
  } catch {
    data = null;
  }


  if (!response.ok) {

    console.error(
      "SUPABASE ERROR:",
      data || text
    );

    throw new Error(
      data?.message ||
      data?.hint ||
      data?.details ||
      "Booking database में save नहीं हुई।"
    );
  }


  return data;
}


/* =====================================================
   SUBMIT BOOKING
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


  /* ================= FORM DATA ================= */

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


  /* ================= BOOKING OBJECT ================= */

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


  /* ================= LOADING ================= */

  showBookingMessage(
    "⏳ Booking सुरक्षित की जा रही है...",
    "loading"
  );


  try {

    /* ================= SAVE ================= */

    await saveBookingToSupabase(
      booking
    );


    /* ================= LOCAL BACKUP ================= */

    localStorage.setItem(
      "htt_last_booking",
      JSON.stringify(
        booking
      )
    );


    /* ================= SUCCESS ================= */

    showBookingMessage(

      `✅ Booking Successfully Confirmed!

Booking ID: ${booking.bookingId}

आपकी booking database में सुरक्षित हो गई है।`,

      "success"

    );


    /* ================= RESET ================= */

    form.reset();


    const remainingInput =
      document.getElementById(
        "remainingAmount"
      );

    if (remainingInput) {
      remainingInput.value = "0";
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


  } catch (error) {

    console.error(
      "BOOKING ERROR:",
      error
    );


    showBookingMessage(

      `❌ Booking save नहीं हो सकी।

${error.message}`,

      "error"

    );

  }
}


/* =====================================================
   FIND LAST BOOKING
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


  const savedBooking =
    localStorage.getItem(
      "
