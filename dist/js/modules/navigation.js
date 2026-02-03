export const initNavigation = () => {
  const navToggle = document.querySelector(".nav__toggle");
  const navMenu = document.querySelector(".nav__menu");

  if (!navToggle || !navMenu) return;

  const overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  document.body.appendChild(overlay);

  const closeMenu = () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
    overlay.classList.remove("is-active");
  };

  const openMenu = () => {
    navMenu.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
    overlay.classList.add("is-active");
  };

  const toggleMenu = () => {
    if (navMenu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  navToggle.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeMenu);

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.classList.contains("open")) {
      closeMenu();
    }
  });
};
