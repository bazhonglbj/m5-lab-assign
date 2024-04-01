import React, { useState,Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from 'react-bootstrap';
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
  const [show, setShow] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

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

  const openModal = (index) => {
    setSelectedItemIndex(index);
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const item = selectedItemIndex !== -1 ? items[selectedItemIndex] : {};

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
          <img src={`/products/${item.img}`} onClick={() => openModal(index)} style={{ width: '100px', height: 'auto', cursor: 'pointer' }} alt={item.name} />
        </div>
      ))}
      
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{item.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={`/products/${item.img}`} style={{ width: '100px', height: 'auto' }} alt={item.name} />
          <p>Rating: 3.5/5</p>
          <p>Quantity: {item.quantity}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(selectedItemIndex, e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
          <Button variant="primary" onClick={() => addToCart(selectedItemIndex)}>Add to cart</Button>
        </Modal.Footer>
      </Modal>

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


