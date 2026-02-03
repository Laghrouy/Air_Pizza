const callConfig = {
  grenoble: {
    tel: "+33767621002",
    label: "Grenoble",
  },
  lausanne: {
    tel: "+41213202927",
    label: "Lausanne",
  },
};

const getLabel = (location) => (location === "lausanne" ? "Lausanne" : "Grenoble");

export const initLocation = () => {
  const locationGate = document.getElementById("location-gate");
  const locationButtons = document.querySelectorAll("[data-location-select]");
  const locationOpenButtons = document.querySelectorAll("[data-location-open]");
  const locationCloseButtons = document.querySelectorAll("[data-location-close]");
  const locationLabels = document.querySelectorAll("[data-location-label]");
  const locationStatus = document.getElementById("location-status");
  const locationBadge = document.querySelector("[data-location-badge]");
  const locationToast = document.getElementById("location-toast");
  const callButton = document.querySelector("[data-call-button]");
  let lastFocusedElement = null;
  let toastTimeoutId = null;

  const updateLocationButtons = (location) => {
    locationButtons.forEach((button) => {
      const selected = button.dataset.locationSelect || "grenoble";
      const isSelected = selected === location;
      button.classList.toggle("is-selected", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });
  };

  const setLocationStatus = (message) => {
    if (!locationStatus) return;
    locationStatus.textContent = message;
  };

  const showLocationToast = (message) => {
    if (!locationToast) return;
    locationToast.textContent = message;
    locationToast.classList.add("is-visible");
    if (toastTimeoutId) {
      window.clearTimeout(toastTimeoutId);
    }
    toastTimeoutId = window.setTimeout(() => {
      locationToast.classList.remove("is-visible");
    }, 2200);
  };

  const applyLocation = (location) => {
    const label = getLabel(location);
    document.body.dataset.location = location;
    locationLabels.forEach((labelNode) => {
      labelNode.textContent = label;
    });
    if (locationBadge) {
      locationBadge.textContent = label;
    }
    if (callButton) {
      const config = callConfig[location] || callConfig.grenoble;
      callButton.href = `tel:${config.tel}`;
      callButton.setAttribute("aria-label", `Appeler Air Pizza ${config.label}`);
      callButton.textContent = `Appeler ${config.label}`;
    }
    updateLocationButtons(location);
    setLocationStatus(`Ville sélectionnée : ${label}.`);
    showLocationToast(`Ville sélectionnée : ${label}`);
  };

  const openLocationGate = () => {
    if (!locationGate) return;
    lastFocusedElement = document.activeElement;
    locationGate.classList.add("is-active");
    locationGate.setAttribute("aria-hidden", "false");
    document.body.classList.add("location-locked");
    document.body.classList.add("gate-active");
    document.querySelectorAll("header, main, footer").forEach((node) => {
      node.setAttribute("aria-hidden", "true");
      node.setAttribute("inert", "");
    });
    setLocationStatus(`Sélection actuelle : ${getLabel(document.body.dataset.location)}.`);
    const focusable = locationGate.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
    if (focusable.length) {
      focusable[0].focus();
    }
  };

  const closeLocationGate = () => {
    if (!locationGate) return;
    locationGate.classList.remove("is-active");
    locationGate.setAttribute("aria-hidden", "true");
    document.body.classList.remove("location-locked");
    document.body.classList.remove("gate-active");
    document.querySelectorAll("header, main, footer").forEach((node) => {
      node.removeAttribute("aria-hidden");
      node.removeAttribute("inert");
    });
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  };

  const savedLocation = localStorage.getItem("airpizza-location");
  applyLocation(savedLocation || "grenoble");
  openLocationGate();

  locationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.locationSelect || "grenoble";
      localStorage.setItem("airpizza-location", selected);
      applyLocation(selected);
      closeLocationGate();
    });
  });

  locationOpenButtons.forEach((button) => {
    button.addEventListener("click", openLocationGate);
  });

  locationCloseButtons.forEach((button) => {
    button.addEventListener("click", closeLocationGate);
  });

  if (locationGate) {
    locationGate.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeLocationGate();
      }
      if (event.key === "Tab") {
        const focusable = locationGate.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }
};
