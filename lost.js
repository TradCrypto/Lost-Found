let body = document.getElementById('page');
let sentList = document.getElementById('itemsFoundList');
let missing = ''; // Remove 'missing' declaration from within 'describe'

function describe() {
    let itemName = document.getElementById('item-name').value;
    let itemDescription = document.getElementById('item-description').value;
    let itemLocation = document.getElementById('item-location').value;
    let itemDate = document.getElementById('item-date').value;
    
    // Prepare the new item HTML
    missing = `
    <br><br>
    <hr>
    <div class="item">
        <h1>Missing Item: ${itemName}</h1>
        <p>Description: ${itemDescription}</p>
        <p>School: ${itemLocation}</p>
        <p>Date since lost: ${itemDate}</p><br>
    </div>`;

    sentList.innerHTML += missing;
    
    localStorage["sentlist"] = sentList.innerHTML;
};

function loadPage() {
    if (localStorage["sentlist"]) {
        sentList.innerHTML = localStorage["sentlist"];
    };
};

function deleteItems() {
    localStorage.removeItem("sentlist");
    sentList.innerHTML = '';
};

function visible1() {
    let method = document.getElementById('method');
    if (method.textContent === '⬛ Change to Dark Theme') {
        body.style.backgroundColor = '#212020';
        method.textContent = '🔲 Change to Light Theme';
    } else  if (method.textContent === '🔲 Change to Light Theme') {
        body.style.backgroundColor = '#f0f0f0';
        method.textContent = '⬛ Change to Dark Theme';
    };
};
