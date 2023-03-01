import React from "react";
import Bot from "./Bot";

const BotArea = ({
  botCount,
  onAddBot,
  onRemoveBot,
  pendingOrders,
  setPendingOrders,
  completedOrders,
  setCompletedOrders,
}) => {
  const handleAddBot = () => {
    onAddBot();
    processOrder();
  };

  const handleRemoveBot = () => {
    onRemoveBot();
  };

  const processOrder = () => {
    const availableBots = Array.from(Array(botCount)).map((_, index) => index);
    let ordersToProcess = [...pendingOrders];

    while (ordersToProcess.length > 0 && availableBots.length > 0) {
      const botIndex = availableBots.shift();
      const order = ordersToProcess.shift();

      setTimeout(() => {
        setCompletedOrders((prevOrders) => [...prevOrders, order]);

        if (ordersToProcess.length === 0) {
          setPendingOrders([]);
        }
      }, 10000);
    }
  };

  return (
    <div className="bot-area">
      <h2>Bot Area</h2>
      <div className="bot-count">{`Bot count: ${botCount}`}</div>
      <button onClick={handleAddBot}>+ Bot</button>
      <button onClick={handleRemoveBot}>- Bot</button>
      <div className="bots">
        {Array.from(Array(botCount)).map((_, index) => (
          <Bot
            key={index}
            order={pendingOrders.length > index ? pendingOrders[index] : null}
          />
        ))}
      </div>
    </div>
  );
};

export default BotArea;
