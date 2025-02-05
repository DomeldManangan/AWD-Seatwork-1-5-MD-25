document.addEventListener("DOMContentLoaded", function () {
    let buses = JSON.parse(localStorage.getItem("buses")) || {
        bus1: new Array(40).fill(false),
        bus2: new Array(40).fill(false),
        bus3: new Array(40).fill(false)
    };

    let userCash = 5000; // Starting cash for the user

    const busButtons = document.querySelectorAll(".bus-btn");
    const modal = document.getElementById("seatModal");
    const modalTitle = document.getElementById("modalTitle");
    const seatGrid = document.getElementById("seatGrid");
    const reserveBtn = document.getElementById("reserveSeats");
    const reservationMessage = document.getElementById("reservationMessage");
    const closeModal = document.querySelector(".close");
    const restartBtn = document.getElementById("restartBtn");
    const paymentModal = document.getElementById("paymentModal");
    const paymentForm = document.getElementById("paymentForm");
    const paymentMessage = document.getElementById("paymentMessage");

    const correctPassword = "domeld"; // Set your password here

    let selectedBus = null;
    let selectedSeats = []; // Store selected seats for reservation

    // Function to open the seat selection modal for the selected bus
    function openModal(bus) {
        selectedBus = bus;
        selectedSeats = []; // Clear previously selected seats
        modalTitle.textContent = `Select Seats for ${bus.toUpperCase()}`;

        // Create a new paragraph for the route information
        const routeInfo = document.createElement("p");
        routeInfo.classList.add("route-info"); // Optional: Add a class for styling

        // Set the route text based on the selected bus
        switch (bus) {
            case 'bus1':
                routeInfo.textContent = "Manila to Baguio";
                break;
            case 'bus2':
                routeInfo.textContent = "Manila to Ilocos Norte";
                break;
            case 'bus3':
                routeInfo.textContent = "Manila to Batangas";
                break;
            default:
                routeInfo.textContent = ""; // Default case if needed
        }

        // Clear previous content and append the new elements
        seatGrid.innerHTML = ""; // Clear the seat grid

        // Append the title and route info to the modal content
        const modalContent = document.querySelector(".modal-content");
        
        // Remove any existing route info before appending a new one
        const existingRouteInfo = modalContent.querySelector(".route-info");
        if (existingRouteInfo) {
            modalContent.removeChild(existingRouteInfo);
        }

        modalContent.appendChild(routeInfo); // Append the route info below the title

        // Loop through the seats and create seat elements
        buses[bus].forEach((seat, index) => {
            const seatDiv = document.createElement("div");
            seatDiv.classList.add("seat");
            if (seat) {
                seatDiv.classList.add("reserved");
            }
            seatDiv.dataset.index = index;
            seatDiv.addEventListener("click", selectSeat);
            seatGrid.appendChild(seatDiv);
        });

        modal.style.display = "block";
    }

    // Function to select a seat
    function selectSeat(event) {
        const seatDiv = event.target;
        const seatIndex = parseInt(seatDiv.dataset.index);

        if (selectedSeats.length < 5 && !buses[selectedBus][seatIndex]) {
            selectedSeats.push(seatIndex);
            seatDiv.classList.add("selected");
        } else if (selectedSeats.includes(seatIndex)) {
            selectedSeats = selectedSeats.filter(seat => seat !== seatIndex);
            seatDiv.classList.remove("selected");
        }

        reservationMessage.textContent = `${5 - selectedSeats.length} more seats to select.`;
    }

    // Function to close the modal
    function closeModalFunc() {
        modal.style.display = "none";
        reservationMessage.textContent = "";
    }

    // Function to handle the payment process
    function handlePayment() {
        const paymentAmount = parseInt(document.getElementById("paymentAmount").value); // Get user input

        if (paymentAmount !== 500) {
            paymentMessage.textContent = "You must enter exactly 500 pesos.";
            return;
        }

        if (userCash < paymentAmount) {
            paymentMessage.textContent = "Insufficient funds. Please enter 500 pesos.";
            return;
        }

        // Deduct the payment from the user's cash
        userCash -= paymentAmount;
        paymentMessage.textContent = `Payment successful! You have ${userCash} pesos remaining.`;

        // Reserve the seats
        reserveSeats();

        // Close the payment modal
        paymentModal.style.display = "none";
    }

    // Function to reserve the selected seats
    function reserveSeats() {
        if (selectedSeats.length !== 5) {
            reservationMessage.textContent = "Please select exactly 5 seats.";
            return;
        }

        selectedSeats.forEach(index => {
            buses[selectedBus][index] = true; // Mark seats as reserved in the buses array
        });

        // Update localStorage
        localStorage.setItem("buses", JSON.stringify(buses));

        // Update the seat grid UI
        const seats = seatGrid.querySelectorAll(".seat");
        selectedSeats.forEach(seatIndex => {
            seats[seatIndex].classList.add("reserved");
        });

        // Clear selected seats and update reservation message
        selectedSeats = [];
        reservationMessage.textContent = "Seats reserved successfully!";
    }

    // Password protected restart function
    function restartPage() {
        const userPassword = prompt("Please enter the password to restart:");

        if (userPassword === correctPassword) {
            alert("Password correct! Restarting...");
            localStorage.removeItem("buses"); // Reset seat data if needed
            location.reload();  // Reload the page to simulate a restart
        } else {
            alert("Incorrect password. Access denied.");
        }
    }

    // Event Listeners
    busButtons.forEach(button => {
        button.addEventListener("click", () => openModal(button.dataset.bus));
    });

    reserveBtn.addEventListener("click", () => {
        if (selectedSeats.length === 5) {
            // Open payment modal if exactly 5 seats are selected
            paymentModal.style.display = "block";
        } else {
            reservationMessage.textContent = "Please select exactly 5 seats before proceeding to payment.";
        }
    });

    closeModal.addEventListener("click", closeModalFunc);
    window.addEventListener("click", (event) => {
        if (event.target == modal) closeModalFunc();
    });

    restartBtn.addEventListener("click", restartPage);
    paymentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        handlePayment();
    });
});