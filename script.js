//JS Execute//
document.addEventListener("DOMContentLoaded", () => {
    console.log("JS Loaded")
})



//Review Form Submission//
const reviewForm = document.getElementById("submit-review");
let btn;
if (reviewForm) {
    btn = reviewForm.querySelector("button");
    const reviewRight = document.querySelector(".review-right");
    const delBtn = document.querySelectorAll(".delete-btn");

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
if (btn) {
    btn.addEventListener("click", function() {
        console.log("Button clicked");
    });
}



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
        let userSubject = document.getElementById("user-subject").value.trim();
        let message = document.getElementById("user-message").value.trim();

        let msgDiv = document.getElementById("form-msg");

        console.log("Name:", userName);
        console.log("Email:", userEmail);
        console.log("Phone:", phone);
        console.log("Subject:", userSubject);
        console.log("Message:", message);

        // Validation //
        if (userName === "" || userEmail === "" || phone === "" || userSubject === "" || message === "") {
            msgDiv.style.color = "red";
            msgDiv.textContent = "Please fill all the Details."
        } else {
            msgDiv.style.color = "green";
            msgDiv.textContent = "Message sent successfully.";
            console.log("Form Submitted");
        }

        // Name Validation //
        if (userName.length < 3) {
            formMessage.innerHTML = "⚠️ Name must be at least 3 characters long.";
            formMessage.style.color = "red";
            return;
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
            subject: userSubject,
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



// Menu Filtering Functionality //
document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-item");
    const mealButtons = document.querySelectorAll(".meal-filters .filter-btn");
    const typeButtons = document.querySelectorAll(".type-filter .filter-btn");
    
    let activeMealFilter = "all";
    let activeTypeFilter = "all";

    function filterMenu() {
        menuItems.forEach(item => {
            const meal = item.getAttribute("data-meal");
            const type = item.getAttribute("data-type");

            // Show all items if both filters are "all"
            if (activeMealFilter === "all" && activeTypeFilter === "all") {
                item.style.display = "block";
            } else {
                const mealMatch = activeMealFilter === "all" || meal === activeMealFilter;
                const typeMatch = activeTypeFilter === "all" || type === activeTypeFilter;
                item.style.display = (mealMatch && typeMatch) ? "block" : "none";
            }
        });
    }

    // Meal Filter Functionality //
    mealButtons.forEach(button => {
        button.addEventListener("click", () => {
            activeMealFilter = button.value;
            mealButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            filterMenu();
        });
    });

    // Type Filters Button //
    typeButtons.forEach(button => {
        button.addEventListener("click", () => {
            activeTypeFilter = button.getAttribute("data-filter");
            typeButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            filterMenu();
        });
    });

    // Run Initially //
    filterMenu();
});



// Order Page functionality
document.addEventListener("DOMContentLoaded", () => {
    console.log("JS Loaded - Order Page");
    
    // Order filtering functionality
    const orderItems = document.querySelectorAll(".order-item");
    const mealButtons = document.querySelectorAll(".meal-order-filters .order-filter");
    const typeButtons = document.querySelectorAll(".type-order-filter .order-filter");
    
    let activeMealOrder = "all";
    let activeTypeOrder = "all";

    function filterOrderItems() {
        orderItems.forEach(item => {
            const meal = item.getAttribute("data-meal");
            const type = item.getAttribute("data-type");

            // Show all items if both filters are "all"
            if (activeMealOrder === "all" && activeTypeOrder === "all") {
                item.style.display = "block";
            } else {
                const mealMatch = activeMealOrder === "all" || meal === activeMealOrder;
                const typeMatch = activeTypeOrder === "all" || type === activeTypeOrder;
                item.style.display = (mealMatch && typeMatch) ? "block" : "none";
            }
        });
    }

    // Meal Filter Functionality
    if (mealButtons.length) {
        mealButtons.forEach(button => {
            button.addEventListener("click", () => {
                activeMealOrder = button.value;
                mealButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                filterOrderItems();
            });
        });
    }

    // Type Filters Button
    if (typeButtons.length) {
        typeButtons.forEach(button => {
            button.addEventListener("click", () => {
                activeTypeOrder = button.getAttribute("data-filter");
                typeButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                filterOrderItems();
            });
        });
    }

    // Run Initially
    filterOrderItems();

    // Order Cart Functionality
    const cartContainer = document.querySelector(".cart");
    const detailForm = document.querySelector(".detail-form");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to render cart
    function renderCart() {
        if (!cartContainer) return;
        
        cartContainer.innerHTML = '<h3><i class="fas fa-shopping-cart"></i> Your Cart</h3>';
        
        if (cart.length === 0) {
            cartContainer.innerHTML += '<p>Your Cart is empty</p>';
            if (detailForm) detailForm.style.display = "none";
            return;
        }
        
        const cartList = document.createElement("div");
        cartList.classList.add("cart-list");
        
        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">₹${item.price} x ${item.quantity}</span>
                </div>
                <button class="remove-btn" data-index="${index}">X</button>
            `;
            cartList.appendChild(cartItem);
        });
        
        cartContainer.appendChild(cartList);
        
        // Calculate and show total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalContainer = document.createElement("div");
        totalContainer.classList.add("total-container");
        totalContainer.innerHTML = `<strong>Total: ₹${total}</strong>`;
        cartContainer.appendChild(totalContainer);
        
        if (detailForm) detailForm.style.display = "block";
        
        // Add event listeners to remove buttons
        const removeButtons = cartContainer.querySelectorAll(".remove-btn");
        removeButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const index = parseInt(e.target.getAttribute("data-index"));
                removeFromCart(index);
            });
        });
    }

    // Add item to cart
    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({name, price: parseInt(price), quantity: 1});
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    // Remove item from cart
    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    // Add to cart buttons
    document.querySelectorAll(".add-btn").forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = button.getAttribute("data-price");
            addToCart(name, price);
        });
    });

    // Form Submission
    const orderForm = document.querySelector(".detail-form form");
    if (orderForm) {
        orderForm.addEventListener("submit", event => {
            event.preventDefault();
            
            // Basic validation
            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const email = document.getElementById("email").value.trim();
            const address = document.getElementById("address").value.trim();
            const delivery = document.querySelector('input[name="delivery"]:checked');
            
            if (!name || !phone || !email || !address || !delivery) {
                alert("Please fill all the required fields.");
                return;
            }
            
            if (cart.length === 0) {
                alert("Your cart is empty. Please add items to your cart.");
                return;
            }
            
            // Save order details
            const orderDetails = {
                customer: { name, phone, email, address },
                deliveryTime: delivery.value,
                items: cart,
                total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                date: new Date().toISOString()
            };
            
            // Save to localStorage
            const orders = JSON.parse(localStorage.getItem("orders")) || [];
            orders.push(orderDetails);
            localStorage.setItem("orders", JSON.stringify(orders));
            
            // Clear cart
            cart = [];
            localStorage.removeItem("cart");
            
            alert("Order placed successfully!");
            renderCart();
            orderForm.reset();
        });
    }

    // Initially Render cart
    renderCart();
});