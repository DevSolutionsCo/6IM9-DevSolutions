let events = JSON.parse(localStorage.getItem('events')) || [
    { name: 'Evento 1', image: 'evento1.png', date: '01/06/2024', time: '18:00', location: 'Lugar 1', price: '50' },
    { name: 'Evento 2', image: 'evento2.png', date: '15/06/2024', time: '20:00', location: 'Lugar 2', price: '70' },
    { name: 'Evento 3', image: 'evento3.png', date: '30/06/2024', time: '19:00', location: 'Lugar 3', price: '60' }
];
let currentSlide = 0;
let editIndex = -1;

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

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel img');
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'inactive');
        if (i === index) {
            slide.classList.add('active');
        } else {
            slide.classList.add('inactive');
        }
    });
    currentSlide = index;
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
    const currentPath = window.location.pathname;
    if (currentPath.includes('Entrada.html')) {
        window.location.href = 'ActivarEvento.html';
    } else {
        window.location.href = 'event.html';
    }
}

function loadEventDetails() {
    const index = localStorage.getItem('viewEventIndex');
    if (index !== null) {
        const event = events[index];
        document.getElementById('eventTitle').textContent = event.name;
        document.getElementById('eventImage').src = event.image;
        document.getElementById('eventDate').textContent = event.date;
        document.getElementById('eventTime').textContent = event.time;
        document.getElementById('eventLocation').textContent = event.location;
        document.getElementById('eventPrice').textContent = event.price;
        editIndex = index;
    }
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

    // Verifica que todos los campos estén completos
    if (eventName && eventImageURL && eventDate && eventTime && eventLocation && eventPrice) {
        // Agrega el nuevo evento al array
        events.push({ name: eventName, image: eventImageURL, date: eventDate, time: eventTime, location: eventLocation, price: eventPrice });
        // Guarda los eventos en el almacenamiento local
        saveEvents();
        // Redirige a la página de inicio
        window.location.href = 'index.html';
    } else {
        // Muestra un mensaje de error si algún campo está vacío
        alert('Por favor, completa todos los campos.');
    }
}
