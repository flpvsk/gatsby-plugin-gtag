exports.onRouteUpdate = ({ location }) => {
  const trackingId = window.GATSBY_GTAG_PLUGIN_GA_TRACKING_ID;
  const anonymize = window.GATSBY_GTAG_PLUGIN_ANONYMIZE || false;

  if (!trackingId || typeof window.gtag !== `function`) {
    return;
  }

  let locationStr = '';

  if (location) {
    locationStr = `${location.pathname}${location.search}${
      location.hash
    }`;
  }

  let anonymizeObj = {};
  if (anonymize) {
    anonymizeObj = { anonymize_ip: true };
  }

  window.gtag('config', trackingId, {
    page_path: locationStr,
    ...anonymizeObj,
  });
};
