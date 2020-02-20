/**
 * Code from OutboundLink module in gatsby-plugin-google-analytics
 * modified for gtag
 */

import React from 'react';
import PropTypes from 'prop-types';

// @link https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-google-analytics/src/index.js#L4
const createFunctionWithTimeout = (callback, opt_timeout = 1000) => {
  let called = false;

  const raceCallback = () => {
    if (!called) {
      called = true;
      callback();
    }
  };

  setTimeout(raceCallback, opt_timeout);

  return raceCallback;
};

function OutboundLink(props) {
  return (
    <a
      {...props}
      onClick={e => {
        if (typeof props.onClick === `function`) {
          props.onClick();
        }
        let redirect = true;
        if (
          e.button !== 0 ||
          e.altKey ||
          e.ctrlKey ||
          e.metaKey ||
          e.shiftKey ||
          e.defaultPrevented
        ) {
          redirect = false;
        }
        if (props.target && props.target.toLowerCase() !== `_self`) {
          redirect = false;
        }

        if (window.gtag) {
          window.gtag('event', 'click', {
            event_category: 'outbound',
            event_label: props.href,
            transport_type: 'beacon',
            event_callback: function() {
              if (redirect) {
                document.location = props.href;
              }
            },
          });
        } else {
          if (redirect) {
            document.location = props.href;
          }
        }

        return false;
      }}
    />
  );
}

OutboundLink.propTypes = {
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
};

/**
 * This allows the user to create custom events within their Gatsby projects.
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/events
 */
function trackCustomEvent({
  category,
  action,
  label,
  value,
  nonInteraction = true,
  transport,
  eventCallback,
  callbackTimeout = 1000,
}) {
  if (typeof window !== 'undefined' && window.gtag) {
    const trackingEventOptions = {
      event_category: category,
      event_label: label,
      event_value: value,
      non_interaction: nonInteraction,
      transport_type: transport,
    };

    if (typeof eventCallback === 'function') {
      trackingEventOptions.hitCallback = createFunctionWithTimeout(
        hitCallback,
        callbackTimeout
      );
    }

    window.gtag('event', action, trackingEventOptions);
  }
}

export { OutboundLink, trackCustomEvent };
