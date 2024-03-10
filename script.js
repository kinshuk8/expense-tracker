function addExpense() {
    const expenseName = document.getElementById("expenseName").value.trim();
    const amount = document.getElementById("amount").value.trim();
    const date = document.getElementById("date").value.trim();

    if (!expenseName || !amount || !date) {
        alert("Please fill in all fields.");
        return;
    }

    const expense = {
        name: expenseName,
        amount: amount,
        date: date,
        id: Date.now()
    };

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
}

function displayExpenses() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";
    expenses.forEach(expense => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span class="expense-name">${expense.name}</span> - $<span class="expense-amount">${expense.amount}</span> on <span class="expense-date">${expense.date}</span>
            <button onclick="removeExpense(${expense.id})">Remove</button>
        `;
        expenseList.appendChild(listItem);
    });
    updateTotalAmount(expenses);
}

function removeExpense(id) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const index = expenses.findIndex(expense => expense.id === id);
    if (index !== -1) {
        expenses.splice(index, 1);
    }
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
}

function updateTotalAmount(expenses) {
    const totalAmount = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    document.getElementById("totalAmount").textContent = totalAmount.toFixed(2);
}

displayExpenses();
