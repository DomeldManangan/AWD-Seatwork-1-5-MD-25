// Bus seat data (each bus starts with 20 seats)
let buses = {
    bus1: 20,
    bus2: 20,
    bus3: 20
};

// Function to check available seats
function checkAvailability() {
    let selectedBus = document.getElementById("busSelect").value;
    let availableSeats = buses[selectedBus];

    document.getElementById("availableSeats").textContent = `Available Seats: ${availableSeats}`;
}

// Function to reserve 5 seats
function reserveSeats() {
    let selectedBus = document.getElementById("busSelect").value;

    if (buses[selectedBus] >= 5) {
        buses[selectedBus] -= 5;
        document.getElementById("message").textContent = "Reservation Successful!";
        checkAvailability(); // Update seat count
    } else {
        document.getElementById("message").textContent = "Not enough seats available.";
    }
}




document.addEventListener("DOMContentLoaded", function () {
    let buses = {
        bus1: 20,
        bus2: 20,
        bus3: 20
    };

    let modal = document.getElementById("availabilityModal");
    let modalSeats = document.getElementById("modalSeats");
    let closeModal = document.querySelector(".close");

    function checkAvailability() {
        let selectedBus = document.getElementById("busSelect").value;
        let availableSeats = buses[selectedBus];

        // Show modal and update seat count
        modal.style.display = "block";
        modalSeats.textContent = `Available Seats: ${availableSeats}`;
    }

    function reserveSeats() {
        let selectedBus = document.getElementById("busSelect").value;
        if (buses[selectedBus] >= 5) {
            buses[selectedBus] -= 5;
            document.getElementById("message").textContent = "Reservation Successful!";
        } else {
            document.getElementById("message").textContent = "Not enough seats available.";
        }
    }

    // Close modal when clicking the close button
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close modal when clicking outside it
    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    document.querySelector("button:nth-of-type(1)").addEventListener("click", checkAvailability);
    document.querySelector("button:nth-of-type(2)").addEventListener("click", reserveSeats);
});