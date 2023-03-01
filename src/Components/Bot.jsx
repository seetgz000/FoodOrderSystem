import React, { useEffect } from "react";

const Bot = ({ order }) => {
  useEffect(() => {
    if (order) {
      console.log(`Processing order ${order.id}...`);
      setTimeout(() => {
        console.log(`Order ${order.id} processed!`);
      }, 5000);
    }
  }, [order]);

  return (
    <div className="bot">
      {order ? `Bot processing order ${order.id}` : "Bot idle"}
    </div>
  );
};

export default Bot;
