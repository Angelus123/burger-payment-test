import React from 'react'
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import './App.css';

function App() {
  const [product] = React.useState({
    name: "Burger",
    price: 5.67,
    description: "Cool meal"
  });

  async function handleToken(token, addresses) {
    const response = await axios.post(
      "https://ry7v05l6on.sse.codesandbox.io/checkout",
      { token, product }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <div className="container">
      <div className="product">
        <h1>{product.name}</h1>
        <h3>On Sale · ${product.price}</h3>
      </div>
      <StripeCheckout
      
        stripeKey="pk_test_51JvijlDzAivBcXY7JmiR1G8IDw11RgOU8xCcXJVymZEo5uUOksTdNP3wYCifoviZyMcHZeODbqa5hUExFeMbkz8q00KH3Jfkg3"
        token={handleToken}
        amount={product.price * 100}
        name="Burger "
        billingAddress
        shippingAddress
      />
    </div>
  );
}
export default App;
