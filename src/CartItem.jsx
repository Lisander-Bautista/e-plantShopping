import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart     = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // 1. Total general
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const costNumber = parseFloat(item.cost.substring(1));
      total += costNumber * item.quantity;
    });
    return total.toFixed(2);
  };

  // 2. Subtotal por artículo
  const calculateTotalCost = (item) => {
    const costNumber = parseFloat(item.cost.substring(1));
    return (costNumber * item.quantity).toFixed(2);
  };

  // 3. Continuar comprando
  const handleContinueShopping = (e) => {
    e.preventDefault();
    if (typeof onContinueShopping === 'function') {
      onContinueShopping(e);
    }
  };

  // 4. Checkout (placeholder)
  const handleCheckout = (e) => {
    e.preventDefault();
    alert('Funcionalidad de checkout en desarrollo');
  };

  // 5. Incrementar cantidad
  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name:     item.name,
      quantity: item.quantity + 1
    }));
  };

  // 6. Decrementar o eliminar si pasa a cero
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name:     item.name,
        quantity: item.quantity - 1
      }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // 7. Eliminar directamente
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>

      {cart.length === 0 && (
        <p className="empty-cart">Tu carrito está vacío.</p>
      )}

      {cart.map(item => (
        <div className="cart-item" key={item.name}>
          <img 
            className="cart-item-image" 
            src={item.image} 
            alt={item.name} 
          />

          <div className="cart-item-details">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-cost">{item.cost}</div>

            <div className="cart-item-quantity">
              <button
                className="cart-item-button cart-item-button-dec"
                onClick={() => handleDecrement(item)}
              >
                –
              </button>
              <span className="cart-item-quantity-value">
                {item.quantity}
              </span>
              <button
                className="cart-item-button cart-item-button-inc"
                onClick={() => handleIncrement(item)}
              >
                +
              </button>
            </div>

            <div className="cart-item-total">
              Subtotal: ${calculateTotalCost(item)}
            </div>

            <button
              className="cart-item-delete"
              onClick={() => handleRemove(item)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      <div className="cart-actions">
        <button
          className="get-started-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>

        <button
          className="get-started-button1"
          onClick={handleCheckout}
          disabled={cart.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;