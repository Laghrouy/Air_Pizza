import { initNavigation } from "./modules/navigation.js";
import { initLocation } from "./modules/location.js";
import { initMenuDescriptions } from "./modules/menu.js";
import { initOrderButtonPulse } from "./modules/interactions.js";
import { initScrollEffects } from "./modules/scroll.js";

export const initApp = () => {
  initNavigation();
  initLocation();
  initMenuDescriptions();
  initOrderButtonPulse();
  initScrollEffects();
};

document.addEventListener("DOMContentLoaded", initApp);
