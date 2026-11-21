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