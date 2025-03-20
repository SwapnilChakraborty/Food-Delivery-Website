import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { category } from "../utils/data"; // Ensure your data file has an id for each item

const OrderPage = () => {
  const { id } = useParams();
  // Convert id to a number and find the food item from local data
  const foodItem = category.find((item) => item.id === parseInt(id));

  // State for the order quantity
  const [quantity, setQuantity] = useState(1);

  if (!foodItem) {
    return <div>Food item not found.</div>;
  }

  const handleOrder = () => {
    // Here you can integrate order functionality such as API calls to add the order
    alert(`Order placed for ${quantity} ${foodItem.name}(s)!`);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Order: {foodItem.name}</h1>
      <img src={foodItem.img} alt={foodItem.name} style={{ width: "200px" }} />
      <p>{foodItem.desc}</p>
      <p>Discount: {foodItem.off}</p>
      <div style={{ marginTop: "1rem" }}>
        <label>
          Quantity:
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{ marginLeft: "0.5rem", width: "60px" }}
          />
        </label>
      </div>
      <button
        onClick={handleOrder}
        style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderPage;
