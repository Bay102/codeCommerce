import React from "react";
import { storeItems } from "../storeItems";
import "./Cart.css";
import { CartItemBase } from "./CartItemBase";

// items can be removed items from cart | total sum of all items calculated | if 0 items in cart checkout disabled

export class Cart extends React.Component {
  continueToShipping = (e) => {
    e.preventDefault();
    this.props.changePage("shipping");
  };

  // updateItemPrice = (itemPrice, itemQuantity) => itemPrice.replace(/[$,]/g, '') * itemQuantity ;

  updateItemPrice = (itemPrice, itemQuantity) => {
    const priceString = itemPrice.replace(/[$,]/g, ""); // remove dollar sign and commas
    const doMath = parseInt(priceString) * itemQuantity;
    const formattedPrice = doMath.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    return formattedPrice;
  };

  totalCartPrice = (cart) => {
    let totalPrice = 0;
    for (const item of Object.values(cart)) {
      const priceString = item.price.replace(/[$,]/g, ""); // remove dollar sign and commas
      let quantityPrices = parseInt(priceString * item.quantity);
      totalPrice = totalPrice += quantityPrices;
    }
    return totalPrice.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  render() {
    const { state, handleQuantityChange, storeItems } = this.props;

    return (
      <div>
        <h2 className="cartH2">CART</h2>
        <div className="cartContainer">
          {Object.values(storeItems).length
            ? Object.entries(storeItems).map(([key, value]) => (
                <div key={key} className="itemWrapper">
                  <CartItemBase
                    state={state}
                    handleQuantityChange={handleQuantityChange}
                    name={`${key}`}
                    quantity={`${value.quantity}`}
                    price={`${value.price}`}
                    image={`${value.image}`}
                  />
                </div>
              ))
            : null}
        </div>

        <div className="continueToCheckout">
          <div className="boxTitle">Cart Summary</div>
          <div className="cartSummary">
            {Object.values(storeItems).length
              ? Object.values(storeItems).map((item, index) => (
                  <div key={index} className="summaryWrapper">
                    <div>{item.name}</div>
                    <div className="summaryItemQuantity">
                      Quantity: {item.quantity}
                    </div>
                    <div className="totalPrice">
                      Total: {this.updateItemPrice(item.price, item.quantity)}
                    </div>
                  </div>
                ))
              : null}
            <div className="totalCartPrice">
              Cart Total: <br /> {this.totalCartPrice(state.storeItems)}
              <button
                onClick={this.continueToShipping}
                className="checkoutButton"
                type="button"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
