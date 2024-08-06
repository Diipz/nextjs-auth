"use client";

import React, { useEffect } from "react";

export const StripePricingTable = () => {

    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://js.stripe.com/v3/pricing-table.js";
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
  
    }, []);
  
    return React.createElement("stripe-pricing-table", {
      "pricing-table-id": "prctbl_1Pk8IzCDJeDXo2JOVIBVvM77",
      "publishable-key":
        "pk_test_51PjTd0CDJeDXo2JOBiWZeHhN5SuClLfj4EtNFuoxmADaZ7JGyUdMQkfOuAEdMhK8lRQMjHiiEycseGJZDPnlrPD100Z6M0BfhI",
    });
  
  };