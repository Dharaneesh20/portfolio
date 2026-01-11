// Google Analytics utility functions

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

// Initialize Google Analytics
export const initGA = (measurementId: string) => {
  // Create script element for gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer?.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: true,
    // Enable enhanced measurement
    allow_google_signals: true,
    allow_ad_personalization_signals: false,
  });

  console.log('Google Analytics initialized with ID:', measurementId);
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  }
};

// Track custom events
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, eventParams);
  }
};

// Track button/link clicks
export const trackClick = (
  elementName: string,
  elementType: string,
  additionalData?: Record<string, any>
) => {
  trackEvent('click', {
    element_name: elementName,
    element_type: elementType,
    ...additionalData,
  });
};

// Track external link clicks
export const trackExternalLink = (url: string, linkText: string) => {
  trackEvent('external_link_click', {
    link_url: url,
    link_text: linkText,
  });
};

// Track file downloads
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
  });
};

// Track form submissions
export const trackFormSubmit = (formName: string, success: boolean) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
  });
};

// Track search queries
export const trackSearch = (searchTerm: string) => {
  trackEvent('search', {
    search_term: searchTerm,
  });
};

// Track social media clicks
export const trackSocialClick = (platform: string, action: string) => {
  trackEvent('social_interaction', {
    platform: platform,
    action: action,
  });
};

// Track project/certification views
export const trackContentView = (
  contentType: string,
  contentId: string,
  contentName: string
) => {
  trackEvent('view_item', {
    content_type: contentType,
    content_id: contentId,
    content_name: contentName,
  });
};

// Track section scrolls
export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', {
    section_name: sectionName,
  });
};

// Track time on page
export const trackTimeOnPage = (pageName: string, timeInSeconds: number) => {
  trackEvent('time_on_page', {
    page_name: pageName,
    time_seconds: timeInSeconds,
  });
};

// Track user engagement
export const trackEngagement = (
  engagementType: string,
  engagementValue?: string | number
) => {
  trackEvent('user_engagement', {
    engagement_type: engagementType,
    engagement_value: engagementValue,
  });
};
