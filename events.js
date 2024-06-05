let events = JSON.parse(localStorage.getItem('events')) || [
    { name: 'Evento 1', image: 'evento1.png', date: '01/06/2024', time: '18:00', location: 'Lugar 1', price: '50' },
    { name: 'Evento 2', image: 'evento2.png', date: '15/06/2024', time: '20:00', location: 'Lugar 2', price: '70' },
    { name: 'Evento 3', image: 'evento3.png', date: '30/06/2024', time: '19:00', location: 'Lugar 3', price: '60' }
];

let currentSlide = 0;
let editIndex = -1;

window.onload = function() {
    renderCarousel();
};

function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
}

function renderCarousel() {
    const carousel = document.getElementById('carousel');
    carousel.innerHTML = events.map((event, index) => `
        <img src="${event.image}" alt="${event.name}" class="${index === currentSlide ? 'active' : 'inactive'}" onclick="viewEvent(${index})">
    `).join('');
    updateIndicator();
}

function updateIndicator() {
    const indicator = document.querySelector('.carousel-controls .indicator');
    if (indicator) {
        indicator.textContent = `${currentSlide + 1}/${events.length}`;
    }
}

function viewEvent(index) {
    localStorage.setItem('viewEventIndex', index);
    window.location.href = 'event.html';
}

function editEvent() {
    const formContainer = document.getElementById('formContainer');
    const event = events[editIndex];
    document.getElementById('eventName').value = event.name;
    document.getElementById('eventImageURL').value = event.image;
    document.getElementById('eventDateInput').value = event.date;
    document.getElementById('eventTimeInput').value = event.time;
    document.getElementById('eventLocationInput').value = event.location;
    document.getElementById('eventPriceInput').value = event.price;
    formContainer.style.display = 'block';
}

function saveEvent() {
    const eventName = document.getElementById('eventName').value;
    const eventImageURL = document.getElementById('eventImageURL').value;
    const eventDate = document.getElementById('eventDateInput').value;
    const eventTime = document.getElementById('eventTimeInput').value;
    const eventLocation = document.getElementById('eventLocationInput').value;
    const eventPrice = document.getElementById('eventPriceInput').value;

    if (eventName && eventImageURL && eventDate && eventTime && eventLocation && eventPrice) {
        events[editIndex] = { name: eventName, image: eventImageURL, date: eventDate, time: eventTime, location: eventLocation, price: eventPrice };
        saveEvents();
        window.location.href = 'index.html';
    }
}

function deleteEvent() {
    if (editIndex >= 0) {
        events.splice(editIndex, 1);
        saveEvents();
        window.location.href = 'index.html';
    }
}

function addNewEvent() {
    const eventName = document.getElementById('eventName').value;
    const eventImageURL = document.getElementById('eventImageURL').value;
    const eventDate = document.getElementById('eventDateInput').value;
    const eventTime = document.getElementById('eventTimeInput').value;
    const eventLocation = document.getElementById('eventLocationInput').value;
    const eventPrice = document.getElementById('eventPriceInput').value;

    if (eventName && eventImageURL && eventDate && eventTime && eventLocation && eventPrice) {
        events.push({ name: eventName, image: eventImageURL, date: eventDate, time: eventTime, location: eventLocation, price: eventPrice });
        saveEvents();
        window.location.href = 'index.html';
    }
}
