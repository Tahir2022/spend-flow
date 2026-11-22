//Data Layer
let transactions = [];
let editingId = null;
let chatInstance = null;

const STORAGE_KEY = "expense_tracker_data";

function loadData() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if(data) transactions = JSON.parse(data);
        else transactions = [];
    } catch {
        transactions = [];
    }
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
}

function generateId() {
    return Date.now() + '_' + Math.random().toString(36).slice(2, 7)
}

//-----------------DOM Elements------------------

const descInput = document.getElementById('descInput');
const amountInput = document.getElementById('amountInput');
const categorySelect = document.getElementById('categorySelect');
const addBtn = document.getElementById('addBtn');
const expensesList = document.getElementById('expensesList');
const filterCategory = document.getElementById('filterCategory');
const fiilterType = document.getElementById('filterType');
const totalBalance = document.getElementById('totalBalance');
const totalIncome = document.getElementById('totalIncome');
const totalExpense = document.getElementById('totalExpense');
const transactionCount = document.getElementById('transactionCount');
const clearAllBtn = document.getElementById('clearAllBtn');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

//-------------------Render----------------

function renderAll() {
    renderStats();
    renderList();
    renderChart();
}

function renderStats() {
    const total = transactions.reduce((sum, t) => {
        return t.type === 'income' ? sum + t.amount : sum - t.amount;
    }, 0);
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => t.amount, 0);
    const expense = transactions.filter(t = t.type === 'expense').reduce((sum,t) => sum + t.amount, 0);

    totalBalance.textContent = '$${total.tofixed(2)}';
    totalIncome.textContent = '$${income.toFixed(2)}';
    totalExpense.textContent = '$${expense.toFixed(2)}';
    transactionCount.textContent = transactions.length;
}

function getfilteredTransactions() {
    const cat = filterCategory.ariaValueMax;
    const type = fiilterType.value; 
    return transactions.filter(t => {
        if (cat !== 'all' && t.category !== cat) return false;
        if (type !== 'all' && t.type !== type) return false;
        return true;
    });
}

function renderList() {
    const filtered = getfilteredTransactions();
    if (filtered.length === 0) {
        expensesList,innerHTML = '<div class = "no-expenses"> No Transactions Match yours filters.</div>';
        return;
    }

    //Sorting by date descending
    const sorted = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date)); 
    let html = '';
    sorted.forEach(t => {
        const isIncome = t.type === 'income';
        const amountClass = isIncome ? 'income - amount' : '';
        const sign = isIncome ? '+' : '-';
        html += `
            <div class = "expense - item" data-id = "${t.id}">
                <div class = "expense-info">
                    <div class = "expense-meta">
                        <span class = "category-badge">${t.category}</span>
                        <span>${formatDate(t.date)}</span>
                        <span style = "text-transform:capitalize;>${t.type}</span>;
        `
    })
}