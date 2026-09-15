document.addEventListener("DOMContentLoaded", () => {
  // 1. MOBILE MENU TOGGLE HANDLER
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && mobileMenu) {
    // Toggle menu state on button click
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle("active");
      mobileMenu.classList.toggle("hidden");
    });

    // Close menu when clicking outside of it
    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileMenu.classList.remove("active");
        mobileMenu.classList.add("hidden");
      }
    });

    // Close menu when a navigation link is clicked
    const menuLinks = mobileMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // 2. FORMSPREE JSON SUBMISSION HANDLER
  const discoveryForm = document.getElementById("discovery-form");

  if (discoveryForm) {
    discoveryForm.addEventListener("submit", async function (e) {
      e.preventDefault(); // Prevents default form redirect

      // Read form data into a key-value object
      const formData = new FormData(discoveryForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Retrieve action URL from form's action attribute
      const formActionUrl = discoveryForm.getAttribute("action");

      if (!formActionUrl || formActionUrl.includes("YOUR_FORM_ID")) {
        alert("Please update the form action URL in your HTML with your actual Formspree ID.");
        return;
      }

      try {
        // Post data as a JSON payload to Formspree
        const response = await fetch(formActionUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          alert("Thank you! Your discovery call request has been sent.");
          discoveryForm.reset();
        } else {
          const result = await response.json();
          if (result.errors) {
            alert("Submission error: " + result.errors.map(err => err.message).join(", "));
          } else {
            alert("Submission failed. Please check your form inputs and try again.");
          }
        }
      } catch (error) {
        alert("An error occurred while attempting to send the message. Please check your internet connection.");
      }
    });
  }
});