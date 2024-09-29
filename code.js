document.addEventListener('DOMContentLoaded', () => {
    const reportForm = document.getElementById('reportForm');
    const itemsList = document.getElementById('itemsList');
    let lostItems = [];

    reportForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const itemName = document.getElementById('item-name').value;
        const itemDescription = document.getElementById('item-description').value;
        const itemLocation = document.getElementById('item-location').value;
        const itemDate = document.getElementById('item-date').value;

        const newItem = {
            name: itemName,
            description: itemDescription,
            location: itemLocation,
            date: itemDate
        };

        lostItems.push(newItem);
        displayItems();

        reportForm.reset();
    });

    function displayItems() {
        itemsList.innerHTML = '';
        lostItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            itemDiv.title=`This is a missing item. The missing item is a/an ${item.name}`
            itemDiv.innerHTML += `
                <h3>${item.name}</h3>
                <p><strong>Description:</strong> ${item.description}</p>
                <p><strong>Last seen at:</strong> ${item.location}</p>
                <p><strong>Date:</strong> ${item.date}</p>
            `;
            itemsList.appendChild(itemDiv);
        });
    }
});
