import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
const stripePromise = loadStripe("pk_test_51JzF8fKkWmomGiX9Ue6WkLFHppQhlmjuCXdCp2OR3XmMDjHUbhciHQDEly19t7165w86eQw81t2R1YZuRIQLn7SQ00jG1HKETZ");

export default function Payment(itemToBuy) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${process.env.REACT_APP_API_HOST}/payments/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [ itemToBuy ] }),
    })
    .then((res) => res.json())
    .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
} 