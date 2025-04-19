const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

// Menu button functionality
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// Scroll reveal animations
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// [Previous scroll reveal configurations...]

// Booking Form Submission
document.addEventListener('DOMContentLoaded', function() {
  const bookingForm = document.getElementById('bookingForm');
  
  if (bookingForm) {
    // Date validation
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    
    if (checkInInput && checkOutInput) {
      const today = new Date().toISOString().split('T')[0];
      checkInInput.min = today;
      
      checkInInput.addEventListener('change', function() {
        checkOutInput.min = this.value;
        if (checkOutInput.value && checkOutInput.value < this.value) {
          checkOutInput.value = this.value;
        }
      });
      
      checkOutInput.addEventListener('change', function() {
        if (this.value < checkInInput.value) {
          this.value = checkInInput.value;
        }
      });
    }

    // Form submission
    bookingForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = {
        name: this.elements['name'].value,
        email: this.elements['email'].value,
        phone: this.elements['phone'].value,
        checkIn: this.elements['check-in'].value,
        checkOut: this.elements['check-out'].value,
        guests: this.elements['guests'].value,
        roomType: this.elements['roomType'].value,
        roomPrice: this.elements['roomPrice'].value
      };

      try {
        console.log('Form data being submitted:', formData);
        const response = await fetch('http://localhost:3000/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        const result = await response.json();
        
        if (result.success) {
          alert(`Booking successful! Your booking ID is: ${result.bookingId}`);
          bookingForm.reset();
        } else {
          alert(`Booking failed: ${result.error}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing your booking');
      }
    });
  }

  // Read More Button Functionality
  const readMoreBtn = document.getElementById('readMoreBtn');
  const aboutMore = document.getElementById('aboutMore');
  
  if (readMoreBtn && aboutMore) {
    readMoreBtn.addEventListener('click', function() {
      aboutMore.classList.toggle('active');
      
      // Change button text based on state
      if (aboutMore.classList.contains('active')) {
        readMoreBtn.textContent = 'Read Less';
      } else {
        readMoreBtn.textContent = 'Read More';
      }
    });
  }
});

// [Rest of your existing code...]
