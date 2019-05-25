/**
 * Code from OutboundLink module in gatsby-plugin-google-analytics
 * modified for gtag
 */

import React from 'react';
import PropTypes from 'prop-types';

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

export { OutboundLink };
