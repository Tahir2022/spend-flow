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