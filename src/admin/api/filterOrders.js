export function filterOrders({ fullOrders, debSearch, filter }) {
  let filteredOrders = fullOrders;
  if (debSearch.trim() !== "") {
    const search = debSearch.trim().toLowerCase();
    filteredOrders = filteredOrders.filter(
      (order) =>
        order.id.toLowerCase().includes(search) ||
        order.shippingAddress.fullName.toLowerCase().includes(search) ||
        order.shippingAddress.phone.includes(search) ||
        order.shippingAddress.address.toLowerCase().includes(search),
    );
  }

  if (filter !== "ALL") {
    filteredOrders = filteredOrders.filter((order) => order.status === filter);
  }

  return filteredOrders;
}
