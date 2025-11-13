import { trackerMenu } from "./components/Menu.js";
import { searchInput } from "./components/SearchInput.js";
import { trackerOrderFound } from "./components/TrackedOrder.js";
import { trackImage } from "./components/TrackImage.js";
import { handleSearchByCodeSubmit } from "./handlers/handleSubmit.js";

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('main');
  const header = document.querySelector('header');

  const imageComponent = trackImage();
  const menuComponent = trackerMenu();
  const searchInputComponent = searchInput(handleSearchByCodeSubmit);
  const trackedOrderComponent = trackerOrderFound();

  const appContainer = document.createElement('div');
  appContainer.className = 'app-container';

  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container';

  // Header´s components
  header.appendChild(menuComponent);
  // App´s components
  searchContainer.appendChild(searchInputComponent);
  searchContainer.appendChild(imageComponent);
  appContainer.appendChild(searchContainer);
  appContainer.appendChild(trackedOrderComponent);
  app.appendChild(appContainer);
})