import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackTimeOnPage } from '../utils/analytics';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const startTime = Date.now();

    // Track page view
    trackPageView(location.pathname, document.title);

    // Track time on page when leaving
    return () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      if (timeSpent > 3) { // Only track if user spent more than 3 seconds
        trackTimeOnPage(location.pathname, timeSpent);
      }
    };
  }, [location]);
};
