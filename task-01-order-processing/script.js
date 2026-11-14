const orders = [
  { id: 1, product: "Laptop", stock: 5 },
  { id: 2, product: "Mouse", stock: 0 },
  { id: 3, product: "Keyboard", stock: 8 },
];
function processOrder(orderId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const order = orders.find((order) => order.id == orderId);
      if (order) {
        if (order.stock > 0) {
          resolve(`Product: ${order.product}`);
          order.stock -= 1;
        } else {
          reject("Product out of stock");
        }
      } else {
        reject("Order not found!");
      }
    }, 2000);
  });
}

Promise.allSettled([processOrder(1), processOrder(2), processOrder(99)])
  .then((results) => {
    results.forEach((result) => {
      if (result.status == "fulfilled") {
        console.log(`Order processed successfully -> ${result.value}`);
        console.log();
      } else {
        console.log(result.reason);
        console.log();
      }
    });
  })
  .finally(() => console.log("Orders process completed"));
