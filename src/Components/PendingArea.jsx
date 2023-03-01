import React from "react";
import Order from "./Order";

const PendingArea = ({
  pendingOrders,
  onRemoveOrder,
  onCompleteOrder,
  setCompletedOrders,
}) => {
  const handleRemoveOrder = (orderId) => {
    onRemoveOrder(orderId);
  };

  const handleCompleteOrder = (order) => {
    onCompleteOrder(order);
    setCompletedOrders((prevState) => [...prevState, order]);
  };

  return (
    <div className="pending-area">
      <h2>Pending Orders</h2>
      <div className="orders">
        {pendingOrders.length === 0 ? (
          <div>No pending orders</div>
        ) : (
          pendingOrders.map((order) => (
            <Order
              key={order.id}
              id={order.id}
              type={order.type}
              onRemoveOrder={handleRemoveOrder}
              onCompleteOrder={handleCompleteOrder}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PendingArea;
