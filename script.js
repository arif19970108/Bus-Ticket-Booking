const seatContainer = document.getElementById('seats');
const totalPriceEl = document.getElementById('totalPrice');
const confirmBtn = document.getElementById('confirmBtn');

const busTypeSelect = document.getElementById('busType');
const seatCount = 24;
let selectedSeats = [];

// Create seats dynamically
for (let i = 1; i <= seatCount; i++) {
  const seat = document.createElement('div');
  seat.classList.add('seat');
  seat.innerText = `S${i}`;
  seat.addEventListener('click', () => toggleSeat(seat, i));
  seatContainer.appendChild(seat);
}

function toggleSeat(seat, index) {
  if (selectedSeats.includes(index)) {
    selectedSeats = selectedSeats.filter(i => i !== index);
    seat.classList.remove('selected');
  } else {
    selectedSeats.push(index);
    seat.classList.add('selected');
  }
  updatePrice();
}

function updatePrice() {
  const busType = busTypeSelect.value;
  let pricePerSeat = 0;
  switch (busType) {
    case 'AC': pricePerSeat = 1200; break;
    case 'Non-AC': pricePerSeat = 800; break;
    case 'Sleeper': pricePerSeat = 1500; break;
    case 'Semi-Sleeper': pricePerSeat = 1000; break;
  }
  const total = pricePerSeat * selectedSeats.length;
  totalPriceEl.innerText = total;
}

busTypeSelect.addEventListener('change', updatePrice);

// Light/Dark Mode Toggle
function toggleTheme() {
  document.body.classList.toggle('light-mode');
}

// Confirmation
confirmBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const contact = document.getElementById('contact').value;
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const date = document.getElementById('date').value;
  const busType = document.getElementById('busType').value;
  const total = totalPriceEl.innerText;
  const seatNumbers = selectedSeats.map(n => `S${n}`).join(', ');

  const ticketData = {
    name, age, gender, contact, from, to, date, busType, total, seatNumbers
  };
  localStorage.setItem('ticketData', JSON.stringify(ticketData));
  window.location.href = 'ticket.html';
});
