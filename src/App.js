import React, { useState, useEffect } from "react";
import OrderForm from "./Components/OrderForm";
import PendingArea from "./Components/PendingArea";
import CompletedArea from "./Components/CompletedArea";
import BotArea from "./Components/BotArea";

function App() {
  const [normalOrders, setNormalOrders] = useState([]);
  const [vipOrders, setVIPOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [botCount, setBotCount] = useState(0);

  const handleAddOrder = (order) => {
    if (order.type === "normal") {
      setNormalOrders([...normalOrders, order]);
      setPendingOrders([...pendingOrders, order]);
    } else if (order.type === "vip") {
      setVIPOrders([...vipOrders, order]);
      setPendingOrders([order, ...pendingOrders]);
    }
  };

  const handleRemoveOrder = (order) => {
    if (order.type === "normal") {
      const updatedOrders = normalOrders.filter((o) => o.id !== order.id);
      setNormalOrders(updatedOrders);
      setPendingOrders(updatedOrders.filter((o) => o.status === "pending"));
    } else if (order.type === "vip") {
      const updatedOrders = vipOrders.filter((o) => o.id !== order.id);
      setVIPOrders(updatedOrders);
      setPendingOrders(updatedOrders.filter((o) => o.status === "pending"));
    }
  };

  const handleCompleteOrder = (order) => {
    const updatedOrders = pendingOrders.filter((o) => o.id !== order.id);
    setPendingOrders(updatedOrders);
    setCompletedOrders((prevState) => [...prevState, order]);
  };

  const handleAddBot = () => {
    setBotCount(botCount + 1);
  };

  const handleRemoveBot = () => {
    if (botCount > 0) {
      setBotCount(botCount - 1);
    }
  };

  useEffect(() => {
    if (botCount > 0 && pendingOrders.length > 0) {
      const timer = setTimeout(() => {
        processOrder();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [botCount, pendingOrders]);

  const processOrder = () => {
    const updatedOrders = [...pendingOrders];
    let processedCount = 0;
    for (let i = 0; i < botCount && i < updatedOrders.length; i++) {
      if (updatedOrders[i].status !== "pending") {
        // Skip orders that have already been processed
        continue;
      }
      updatedOrders[i].status = "completed";
      handleCompleteOrder(updatedOrders[i]);
      processedCount++;
    }
    if (processedCount > 0) {
      // Remove processed orders from the pendingOrders array
      setPendingOrders(updatedOrders.filter((o) => o.status === "pending"));
    }
  };

  return (
    <div className="App">
      <OrderForm onAddOrder={handleAddOrder} />
      <div className="container">
        <PendingArea
          pendingOrders={pendingOrders}
          onRemoveOrder={handleRemoveOrder}
          onCompleteOrder={handleCompleteOrder}
          setCompletedOrders={setCompletedOrders}
        />
        <CompletedArea completedOrders={completedOrders} />
        <BotArea
          botCount={botCount}
          onAddBot={handleAddBot}
          onRemoveBot={handleRemoveBot}
          pendingOrders={pendingOrders}
          setPendingOrders={setPendingOrders}
          completedOrders={completedOrders}
          setCompletedOrders={setCompletedOrders}
          currentOrder={pendingOrders.length > 0 ? pendingOrders[0] : null}
        />
      </div>
    </div>
  );
}

export default App;
