// TRUSTCONNECT — interactive demo functionality

// 1. MOBILE NAVIGATION

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });
}


// 2. PROVIDER INFORMATION

const providers = {
  john: {
    name: "John Electrical Services",
    category: "Electrical",
    location: "Kaduna, Nigeria",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=85",
    description: "Electrical installations, home wiring, lighting, fault finding and general electrical maintenance. Contact this sample provider to describe the job you need done."
  },

  david: {
    name: "David Plumbing Services",
    category: "Plumbing",
    location: "Kaduna, Nigeria",
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1000&q=85",
    description: "Pipe repairs, leak detection, bathroom fittings, blocked drains and general plumbing maintenance."
  },

  techfix: {
    name: "TechFix Solutions",
    category: "Technology",
    location: "Kaduna, Nigeria",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1591238372338-22d30c883a86?auto=format&fit=crop&w=1000&q=85",
    description: "Laptop troubleshooting, operating system installation, computer upgrades and phone or computer repairs."
  },

  cleanpro: {
    name: "CleanPro Services",
    category: "Cleaning",
    location: "Kaduna, Nigeria",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=85",
    description: "Home and office cleaning, deep cleaning and regular property upkeep."
  },

  masterwood: {
    name: "MasterWood Services",
    category: "Carpentry",
    location: "Kaduna, Nigeria",
    rating: "4.5",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1000&q=85",
    description: "Furniture repairs, shelves, fittings, doors and custom woodwork."
  },

  brightcoat: {
    name: "BrightCoat Painters",
    category: "Painting",
    location: "Kaduna, Nigeria",
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1000&q=85",
    description: "Interior and exterior painting, wall preparation and finishing for homes and offices."
  },

  autocare: {
    name: "AutoCare Garage",
    category: "Automotive",
    location: "Kaduna, Nigeria",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1000&q=85",
    description: "Vehicle servicing, diagnostics, maintenance and general mechanical repairs."
  },

  perfectfit: {
    name: "PerfectFit Tailors",
    category: "Tailoring",
    location: "Kaduna, Nigeria",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1000&q=85",
    description: "Clothing alterations, repairs, fittings and custom outfits."
  }
};


// 3. HOMEPAGE SEARCH

const homeSearchForm = document.getElementById("homeSearchForm");

if (homeSearchForm) {
  homeSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const term = document.getElementById("homeSearchInput").value.trim();

    if (!term) {
      document.getElementById("homeSearchInput").focus();
      return;
    }

    window.location.href =
      "providers.html?search=" + encodeURIComponent(term);
  });
}


// 4. PROVIDER DIRECTORY SEARCH AND FILTERS

const providerGrid = document.getElementById("providerGrid");

if (providerGrid) {
  const searchInput = document.getElementById("providerSearchInput");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = Array.from(providerGrid.querySelectorAll(".provider-card"));
  const noResults = document.getElementById("noResults");
  const resultCount = document.getElementById("resultCount");
  const clearSearch = document.getElementById("clearSearch");
  const resetFilters = document.getElementById("resetFilters");

  const params = new URLSearchParams(window.location.search);

  const requestedSearch = params.get("search") || "";
  const requestedCategory = params.get("category") || "all";

  searchInput.value = requestedSearch;

  let activeCategory = filterButtons.length &&
    Array.from(filterButtons).some(
      btn => btn.dataset.category === requestedCategory
    )
      ? requestedCategory
      : "all";


  function updateActiveButton() {
    filterButtons.forEach(btn => {
      btn.classList.toggle(
        "active",
        btn.dataset.category === activeCategory
      );
    });
  }


  function applyFilters() {
    const term = searchInput.value.trim().toLowerCase();

    let shown = 0;

    cards.forEach(card => {
      const text = (
        card.dataset.search + " " + card.textContent
      ).toLowerCase();

      const categoryMatch =
        activeCategory === "all" ||
        card.dataset.category === activeCategory;

      const searchMatch =
        !term || text.includes(term);

      const visible = categoryMatch && searchMatch;

      card.hidden = !visible;

      if (visible) {
        shown++;
      }
    });

    resultCount.textContent =
      shown + (shown === 1 ? " professional" : " professionals");

    noResults.hidden = shown !== 0;
  }


  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.category;

      updateActiveButton();
      applyFilters();
    });
  });


  searchInput.addEventListener("input", applyFilters);


  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    activeCategory = "all";

    updateActiveButton();
    applyFilters();

    searchInput.focus();
  });


  if (resetFilters) {
    resetFilters.addEventListener("click", () => {
      searchInput.value = "";
      activeCategory = "all";

      updateActiveButton();
      applyFilters();
    });
  }


  updateActiveButton();
  applyFilters();
}


// 5. CONTACT REQUEST FORM

function openRequestModal(providerName) {
  let modal = document.getElementById("requestModal");

  if (!modal) {
    modal = document.createElement("div");

    modal.id = "requestModal";
    modal.className = "modal-backdrop";

    modal.innerHTML = `
      <div class="request-modal" role="dialog" aria-modal="true" aria-labelledby="requestTitle">

        <button type="button" class="modal-close" aria-label="Close">×</button>

        <div id="requestFormArea">

          <span class="eyebrow">GET IN TOUCH</span>

          <h2 id="requestTitle">Send a service request</h2>

          <p>Share a few details so the professional knows how they may be able to help.</p>

          <form id="serviceRequestForm">

            <div class="form-group">
              <label for="requestProvider">Professional</label>
              <input id="requestProvider" name="provider" readonly>
            </div>

            <div class="form-group">
              <label for="customerName">Your name</label>
              <input
                id="customerName"
                name="customerName"
                required
                minlength="2"
                placeholder="Enter your name"
              >
            </div>

            <div class="form-group">
              <label for="customerPhone">Phone number</label>
              <input
                id="customerPhone"
                name="phone"
                type="tel"
                required
                placeholder="e.g. 08012345678"
              >
            </div>

            <div class="form-group">
              <label for="serviceLocation">Your location</label>
              <input
                id="serviceLocation"
                name="location"
                required
                placeholder="Area or town"
              >
            </div>

            <div class="form-group">
              <label for="jobDescription">Describe the job</label>
              <textarea
                id="jobDescription"
                name="description"
                required
                minlength="10"
                placeholder="Explain what you need help with..."
              ></textarea>
            </div>

            <button class="button button-full" type="submit">
              Submit request <span>→</span>
            </button>

          </form>
        </div>

        <div class="form-success" id="formSuccess">

          <div class="success-icon">✓</div>

          <h3>Request saved!</h3>

          <p>
            Your demo request has been saved in this browser.
            It has not been sent to the provider because this
            prototype does not yet have a backend.
          </p>

          <button class="button button-dark" id="closeSuccess" type="button">
            Done
          </button>

        </div>

      </div>
    `;

    document.body.appendChild(modal);


    // Close modal with the X button

    modal.querySelector(".modal-close").addEventListener("click", closeRequestModal);


    // Close modal when clicking outside the form

    modal.addEventListener("click", event => {
      if (event.target === modal) {
        closeRequestModal();
      }
    });


    // Close after successful submission

    modal.querySelector("#closeSuccess").addEventListener("click", closeRequestModal);


    // Submit the service request

    modal.querySelector("#serviceRequestForm").addEventListener("submit", event => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      const request = {
        provider: formData.get("provider"),
        customerName: formData.get("customerName"),
        phone: formData.get("phone"),
        location: formData.get("location"),
        description: formData.get("description"),
        createdAt: new Date().toISOString()
      };

      const savedRequests = JSON.parse(
        localStorage.getItem("trustConnectRequests") || "[]"
      );

      savedRequests.push(request);

      localStorage.setItem(
        "trustConnectRequests",
        JSON.stringify(savedRequests)
      );

      modal.querySelector("#requestFormArea").style.display = "none";

      modal.querySelector("#formSuccess").classList.add("show");
    });
  }


  modal.querySelector("#requestProvider").value = providerName;

  modal.querySelector("#requestFormArea").style.display = "block";

  modal.querySelector("#formSuccess").classList.remove("show");

  modal.classList.add("open");

  document.body.style.overflow = "hidden";

  modal.querySelector("#customerName").focus();
}


// Close the contact form

function closeRequestModal() {
  const modal = document.getElementById("requestModal");

  if (modal) {
    modal.classList.remove("open");
  }

  document.body.style.overflow = "";
}


// Listen for clicks on contact buttons

document.addEventListener("click", event => {
  const contactButton = event.target.closest(".contact-trigger");

  if (contactButton) {
    openRequestModal(contactButton.dataset.provider);
  }
});


// 6. INDIVIDUAL PROVIDER PROFILE

const profileContent = document.getElementById("profileContent");

if (profileContent) {
  const id = new URLSearchParams(window.location.search).get("id");

  const provider = providers[id];

  if (!provider) {
    profileContent.innerHTML = `
      <div class="empty-state">

        <h3>Professional not found</h3>

        <p>That profile may not exist in this demo directory.</p>

        <a class="button button-dark" href="providers.html">
          Back to professionals
        </a>

      </div>
    `;
  } else {
    profileContent.innerHTML = `
      <article class="profile-hero-card">

        <img
          src="${provider.image}"
          alt="${provider.category} professional at work"
        >

        <div class="profile-detail">

          <span class="pill">${provider.category}</span>

          <h1>${provider.name}</h1>

          <div class="profile-meta">

            <span>⌖ ${provider.location}</span>

            <span class="rating">
              ★ ${provider.rating}
              <small>Sample rating</small>
            </span>

          </div>

          <p class="profile-description">
            ${provider.description}
          </p>

          <div class="profile-actions">

            <button
              class="button contact-trigger"
              data-provider="${provider.name}"
            >
              Contact this professional <span>→</span>
            </button>

            <a class="button button-dark" href="providers.html">
              Back to directory
            </a>

          </div>

          <p class="profile-note">
            This is a sample profile for demonstration.
            Provider details and rating are not verified.
          </p>

        </div>
      </article>
    `;
  }
}
