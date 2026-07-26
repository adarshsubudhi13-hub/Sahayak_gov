import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function RouteFocusManager() {
  const location = useLocation();

  useEffect(() => {
    // We defer slightly to ensure the new component has mounted
    setTimeout(() => {
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        // Must set tabIndex to -1 to allow focus via JS on non-interactive elements
        mainContent.setAttribute('tabIndex', '-1');
        mainContent.focus();
        // Remove outline to prevent visual distraction
        mainContent.style.outline = 'none'; 
      }
    }, 50);
  }, [location.pathname]);

  return null;
}
