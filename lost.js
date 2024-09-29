document.addEventListener('DOMContentLoaded', () => {
    const reportForm = document.getElementById('reportForm');
    const itemsList = document.getElementById('itemsList');

    // Fetch and display all items when the page loads
    function fetchItems() {
        fetch('http://localhost:3000/items')
            .then(response => response.json())
            .then(data => {
                displayItems(data);
            })
            .catch(err => {
                console.error('Error fetching items:', err);
            });
    }

    function displayItems(items) {
        itemsList.innerHTML = ''; // Clear the list before adding items
        items.forEach((item) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            itemDiv.innerHTML = `
                <h3>${item.name}</h3>
                <p><strong>Description:</strong> ${item.description}</p>
                <p><strong>Last seen at:</strong> ${item.location}</p>
                <p><strong>Date:</strong> ${item.date}</p>
            `;
            itemsList.appendChild(itemDiv);
        });
    }

    // Fetch items when the page loads
    fetchItems();

    // Handle form submission
    reportForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const itemName = document.getElementById('item-name').value;
        const itemDescription = document.getElementById('item-description').value;
        const itemLocation = document.getElementById('item-location').value;
        const itemDate = document.getElementById('item-date').value;

        // Send item to the backend
        fetch('http://localhost:3000/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: itemName,
                description: itemDescription,
                location: itemLocation,
                date: itemDate
            })
        })
        .then(response => response.json())
        .then(() => {
            // Fetch updated items
            fetchItems();
            reportForm.reset();
        })
        .catch(err => {
            console.error('Error reporting item:', err);
        });
    });
});
