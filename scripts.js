import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://add-to-cart-9f2e3-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList")

const inputEl = document.getElementById('input-field');
const buttonEl = document.getElementById('add-button');
const listEl = document.getElementById('shopping-list');


buttonEl.addEventListener("click", () => {
    let inputValue = inputEl.value;

    //pushing to the database
    push(shoppingListInDB, inputValue);
    
    clearInputField();

    //we remove this because it keeps duplicating the input
    //addListItem(inputValue);
});

onValue(shoppingListInDB, function (snapshot) {

    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val());

        clearList();

        for (const item of itemsArray) {
            let currentItem = item;
            let currentItemID = item[0];
            let currentItemValue = item[1];

            addListItem(currentItem);
        }
    } else {
        listEl.innerHTML = "No items here yet...";
    }
    
})

const clearInputField = () => inputEl.value = "";
const clearList = () => listEl.innerHTML = '';

const addListItem = (item) => {
    let itemID = item[0];
    let itemValue = item[1];
    //listEl.innerHTML += `<li> ${itemValue} </li>`
    //a new way rather than innerHTML
    let newEl = document.createElement("li");
    newEl.textContent = itemValue; 

    newEl.addEventListener("click", () => {
        let exactLocationOfIteminDB = ref(database, `shoppingList/${itemID}`);
        
        remove(exactLocationOfIteminDB);
    });

    listEl.append(newEl);
}

