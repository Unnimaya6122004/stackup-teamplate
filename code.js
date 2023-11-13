// Initialize Firebase with your project config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database
const database = firebase.database();

// Function to load latest events
function loadEvents() {
    const eventList = document.getElementById('eventList');

    // Get the latest 5 events
    database.ref('events').limitToLast(5).once('value', snapshot => {
        snapshot.forEach(childSnapshot => {
            const event = childSnapshot.val();
            const eventId = childSnapshot.key;

            // Create a list item for each event
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="event_details.html?id=${eventId}">${event.title}</a>`;
            eventList.appendChild(listItem);
        });
    });
}

// Load events when the page is loaded
document.addEventListener('DOMContentLoaded', loadEvents);

// Initialize Firebase with your project config (same as app.js)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database
const database = firebase.database();

// Function to load event details
function loadEventDetails() {
    const eventDetailsContainer = document.getElementById('eventDetails');

    // Get the event ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    // Get event details
    database.ref('events/' + eventId).once('value', snapshot => {
        const event = snapshot.val();

        // Display event details
        if (event) {
            eventDetailsContainer.innerHTML = `
                <h2>${event.title}</h2>
                <p>Date: ${event.date}</p>
                <p>Location: ${event.location}</p>
                <p>Description: ${event.description}</p>
            `;
        } else {
            eventDetailsContainer.innerHTML = '<p>Event not found.</p>';
        }
    });
}

// Load event details when the page is loaded
document.addEventListener('DOMContentLoaded', loadEventDetails);

