// Mock ATM data
const atms = [
    { id: 1, name: "ATM 1", lat: 18.6789, lng: 73.8998, status: "Available" },
    { id: 2, name: "ATM 2", lat: 18.6782, lng: 73.8976, status: "Out of Service" },
    { id: 3, name: "ATM 3", lat: 18.6775, lng: 73.9023, status: "Available" }
];

// Initialize the map
const map = L.map('map').setView([18.6782, 73.8983], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add markers and populate the list
const atmList = document.getElementById('atmList');
function populateATMs(filter = "all", search = "") {
    atmList.innerHTML = ""; // Clear previous results
    atms.forEach(atm => {
        if ((filter === "all" || atm.status === filter) && atm.name.toLowerCase().includes(search.toLowerCase())) {
            // Add marker to map
            L.marker([atm.lat, atm.lng])
                .addTo(map)
                .bindPopup(`<b>${atm.name}</b><br>Status: ${atm.status}`);
            
            // Add card to list
            const card = document.createElement('div');
            card.className = `atm-card ${atm.status === "Available" ? 'available' : 'out'}`;
            card.innerHTML = `
                <h3>${atm.name}</h3>
                <p>Status: ${atm.status}</p>
                <p>Lat: ${atm.lat}, Lng: ${atm.lng}</p>
            `;
            atmList.appendChild(card);
        }
    });
}
populateATMs();

// Filter functionality
document.getElementById('statusFilter').addEventListener('change', e => {
    populateATMs(e.target.value, document.getElementById('search').value);
});
document.getElementById('search').addEventListener('input', e => {
    populateATMs(document.getElementById('statusFilter').value, e.target.value);
});
