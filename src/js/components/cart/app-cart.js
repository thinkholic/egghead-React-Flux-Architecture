var React = require('react');
var AppStore = require('../../stores/app-store.js');
var RemoveFromCart = require('./app-removefromcart.js');
var Increase = require('./app-increaseitem.js');
var Decrease = require('./app-decreaseitem.js');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');

function cartItems() {
  return {items: AppStore.getCart()};
}

var Cart = React.createClass({
  mixins: [StoreWatchMixin(cartItems)],

  render: function() {
    var total = 0;
    
    var items = this.state.items.map(function(item, i) {
      var subtotal = item.cost * item.qty;
      total += subtotal;
      return (
        <tr key={i}>
          <td><RemoveFromCart index={i} /></td>
          <td>{item.title}</td>
          <td>{item.qty}</td>
          <td>
            <Increase index={i} />
            <Decrease index={i} />
          </td>
          <td>{subtotal} USD</td>
        </tr>
      );
    });

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
            <th>Qty</th>
            <th></th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="text-right">Total</td>
            <td>{total} USD</td>
          </tr>
        </tfoot>
      </table>
    );
  }
});

module.exports = Cart;