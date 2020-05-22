export const GA_TRACKING_ID = 'UA-117491914-2';

export const trackPageview = url => {
  try {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url
    });
  } catch (err) {
    console.error('Failed sending metrics', err);
  }
};

export const trackEvent = ({ action, category, label, value }) => {
  try {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value
    });
  } catch (err) {
    console.error('Failed sending metrics', err);
  }
};
