import React from "react";
import Order from "./Order";

const CompletedArea = ({ completedOrders }) => {
  const uniqueOrders = completedOrders.filter(
    (order, index) =>
      completedOrders.findIndex((o) => o.id === order.id) === index
  );

  return (
    <div className="completed-area">
      <h2>Completed Area</h2>
      {uniqueOrders.map((order) => (
        <Order key={order.id} id={order.id} type={order.type} />
      ))}
    </div>
  );
};

export default CompletedArea;
