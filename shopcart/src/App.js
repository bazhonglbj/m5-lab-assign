import React, { useState,Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const App = () => {
  const [items, setItems] = useState([
    { name: 'Cologne', quantity: 0, img: 'cologne.jpg' },
    { name: 'iWatch', quantity: 0, img: 'iwatch.jpg' },
    { name: 'Mug', quantity: 0, img: 'mug.jpg' },
    { name: 'Wallet', quantity: 0, img: 'wallet.jpg' },
  ]);

  const [cart, setCart] = useState([]);

  const handleQuantityChange = (index, newQuantity) => {
    const newItems = [...items];
    newItems[index].quantity = parseInt(newQuantity, 10);
    setItems(newItems);
  };

  const addToCart = (index) => {
    const itemToAdd = items[index];
    
    const existingItem = cart.find(item => item.name === itemToAdd.name);
    if (existingItem) {
      
      setCart(cart.map(item => item.name === itemToAdd.name ? { ...item, quantity: item.quantity + itemToAdd.quantity } : item));
    } else {
      
      setCart([...cart, itemToAdd]);
    }
  };

  return (
    <div>
      <h2>Shop to React</h2>
      {items.map((item, index) => (
        <div key={item.name}>
          <span>{item.name}</span>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(index, e.target.value)}
          />
          <button onClick={() => addToCart(index)}>Add to cart</button>
          <img src={`/products/${item.img}`} style={{ width: '100px', height: 'auto' }} alt={item.name} />
        </div>
      ))}
      <div>
        <h3>Cart</h3>
        {cart.map((item, index) => (
          <div key={index}>
            <span>{item.name}</span> - <span>Quantity: {item.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;


