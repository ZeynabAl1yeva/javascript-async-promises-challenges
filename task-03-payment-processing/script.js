const orders = [
  { id: 101, product: "Laptop", price: 1200, available: true },
  { id: 102, product: "Mouse", price: 25, available: false },
  { id: 103, product: "Monitor", price: 300, available: true },
];
let userBalance = 1500;
const paidOrders = [];
const processingOrders = [];
const paymentHistory = [];
function checkOrder(orderId) {
  return new Promise((resolve, reject) => {
    console.log("Checking order...");
    console.log();
    setTimeout(() => {
      const order = orders.find((order) => order.id == orderId);
      if (order) {
        if (order.available) {
          resolve(order);
        } else {
          reject("Error: Product is not available!");
        }
      } else {
        reject("Error: Order not found!");
      }
    }, 1000);
  });
}
function processPayment(order) {
  return new Promise((resolve, reject) => {
    console.log("Processing payment...");
    console.log();
    setTimeout(() => {
      if (userBalance >= order.price) {
        userBalance -= order.price;
        paidOrders.push(order.id);
        paymentHistory.push({
          orderId: order.id,
          amount: order.price,
          remainingBalance: userBalance,
          date: new Date().toLocaleString(),
        });
        resolve(userBalance);
      } else {
        reject("Error: Insufficient balance!");
      }
    }, 2000);
  });
}
function generateReceipt(order) {
  return new Promise((resolve) => {
    console.log("Generating receipt...");
    console.log();
    setTimeout(() => {
      resolve(
        `Order ID: ${order.id}\nProduct: ${order.product}\nAmount: $${order.price}\nStatus: Paid`
      );
    }, 1000);
  });
}
function addBalance(amount) {
  return new Promise((resolve, reject) => {
    console.log("Adding balance...");
    console.log();
    setTimeout(() => {
      if (typeof amount !== "number" || amount <= 0) {
        reject("Error: Invalid amount!");
      } else {
        userBalance += amount;
        resolve(userBalance);
      }
    }, 1000);
  });
}
async function completePurchase(orderId) {
  let locked = false;
  try {
    if (paidOrders.includes(orderId)) {
      throw "Error: This order has already been paid!";
    }
    if (processingOrders.includes(orderId)) {
      throw "Error: This order is already being processed!";
    }
    processingOrders.push(orderId);
    locked = true;
    const order = await checkOrder(orderId);
    console.log("Order verified!");
    console.log(`Product: ${order.product}`);
    console.log();
    const remainingBalance = await processPayment(order);
    console.log("Payment successful!");
    console.log(`Amount paid: $${order.price}`);
    console.log();
    const receipt = await generateReceipt(order);
    console.log("Receipt generated!");
    console.log(receipt);
    console.log();
    console.log(`Remaining balance: $${remainingBalance}`);
    console.log();
  } catch (error) {
    console.log(error);
    console.log();
  } finally {
    if (locked) {
      const index = processingOrders.indexOf(orderId);
      processingOrders.splice(index, 1);
    }
    console.log("Payment process finished!");
    console.log();
  }
}
function showHistory() {
  console.log("Payment history:");
  paymentHistory.forEach((payment, index) => {
    console.log(
      `${index + 1}. Order: ${payment.orderId} | Amount: $${
        payment.amount
      } | Remaining: $${payment.remainingBalance} | Date: ${payment.date}`
    );
  });
  console.log();
}
async function runTests() {
  await completePurchase(101);
  await completePurchase(101);
  try {
    const newBalance = await addBalance(500);
    console.log(`Balance added! New balance: $${newBalance}`);
    console.log();
  } catch (error) {
    console.log(error);
  }
  await completePurchase(103);
  showHistory();
}
runTests();
