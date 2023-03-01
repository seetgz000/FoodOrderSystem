import React, { useState } from "react";

const OrderForm = ({ onAddOrder }) => {
  const [orderType, setOrderType] = useState("normal");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newOrder = {
      id: Date.now(),
      type: orderType,
      status: "pending",
    };
    onAddOrder(newOrder);
  };

  const handleOrderTypeChange = (event) => {
    setOrderType(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Order</h2>
      <div>
        <label htmlFor="orderType">Order Type:</label>
        <select
          id="orderType"
          value={orderType}
          onChange={handleOrderTypeChange}>
          <option value="normal">Normal</option>
          <option value="vip">VIP</option>
        </select>
      </div>
      <button type="submit">Add Order</button>
    </form>
  );
};

export default OrderForm;
