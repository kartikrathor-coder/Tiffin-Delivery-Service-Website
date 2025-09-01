//JS Execute//
document.addEventListener("DOMContentLoaded", () => {
    console.log("JS Loaded")
})

//Navbar functionality//


//Review Form Submission//
const reviewForm = document.getElementById("submit-review");
const btn = reviewForm.querySelector("button");
const reviewRight = document.querySelector(".review-right");
const delBtn = document.querySelectorAll(".delete-btn");

if (reviewForm) {
    reviewForm.addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("Form Submitted");

        //Gettong Values from the User//
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const review = document.getElementById("review").value.trim();
        const ratingInput = document.querySelector('input[name="rating"]:checked');
        const rating = ratingInput ? ratingInput.value : null;

        // Validate form
        if (!name || !email || !review || !rating) {
            alert("Please fill in all fields and select a rating.");
            return;
        }

        // New review object
        const newReview = {
            id: Date.now(),
            name: name,
            review: review,
            rating: rating
        };

        // Get existing reviews from localStorage
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        // Add new review
        reviews.push(newReview);
        // Save back to localStorage
        localStorage.setItem("reviews", JSON.stringify(reviews));

        // Add to UI
        addReviewToUI(newReview);

        reviewForm.reset();
        alert("Thank you for your review!");
    });
}

// Function to display review on UI//
function addReviewToUI(review) {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerHTML = `
        <img src="Graphics/default.jpg" alt="User">
        <button class="delete-btn">❌</button>
        <div class="card_details">
            <p>"${review.review}"</p>
            <h4>${review.name}</h4>
            <div class="stars">${"⭐".repeat(review.rating)}</div>
        </div>
    `;
    const reviewRight = document.getElementById("review-right");
    reviewRight.appendChild(newCard);

 // Delete button functionality
    const deleteBtn = newCard.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
        deleteReview(review.id, newCard);
    });

    reviewRight.appendChild(newCard);
}

//Review Deletion//
function deleteReview(id, cardElement) {
    // Remove from UI
    cardElement.remove();

    // Remove from LocalStorage
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews = reviews.filter(r => r.id !== id);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    console.log("Review deleted:", id);
}

// Load reviews from localStorage on page load
window.addEventListener("DOMContentLoaded", function() {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.forEach(addReviewToUI);
});

//Debug Log//
btn.addEventListener("click", function() {
    console.log("Button clicked");
});

// Contact Section functionality //
const contactForm = document.getElementById("contact-form");
let formMessage = document.getElementById("form-msg");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // prevent page reload
        console.log("Form Submitted");

        // Getting Values from User //
        let userName = document.getElementById("user-name").value.trim();
        let userEmail = document.getElementById("user-email").value.trim();
        let phone = document.getElementById("user-number").value.trim();
        let message = document.getElementById("user-message").value.trim();

        let msgDiv = document.getElementById("form-msg");

        console.log("Name:", userName);
        console.log("Email:", userEmail);
        console.log("Phone:", phone);
        console.log("Message:", message);

        // Validation //
        if (userName === "" || userEmail === "" || phone === "" || message === "") {
            msgDiv.style.color = "red";
            msgDiv.textContent = "Please fill all the Details."
        } else {
            msgDiv.style.color = "green";
            msgDiv.textContent = "Message sent successfully.";
            console.log("Form Submitted");
        }

        // Email Validation //
       let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log("Email:", userEmail);
        if (!userEmail.match(emailPattern)) {
            formMessage.innerHTML = "⚠️ Enter a valid email address.";
            formMessage.style.color = "red";
            return;
        }

        // Phone Number Validation //
        if (!/^\d{10}$/.test(phone)) {
            formMessage.innerHTML = "⚠️ Enter a valid 10-digit number.";
            formMessage.style.color = "red";
            return;
        }

        // Saving Values in LocalStorage //
        let contactData = {
            name: userName,
            email: userEmail,
            number: phone,
            message: message,
            date: new Date().toLocaleString()
        };

        console.log(contactData);

        let savedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
        savedContacts.push(contactData);
        localStorage.setItem("contacts", JSON.stringify(savedContacts));

        // Success Message //
        formMessage.innerHTML = "✅ Thank you! Your message has been saved.";
        formMessage.style.color = "green";

        // Reset Form //
        contactForm.reset();
    });
}