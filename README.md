# gatsby-plugin-gtag

### Add Google Analytics gtag.js to a site

Does the same thing as
[gatsby-plugin-google-analytics](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-google-analytics),
but instead of adding [deprecated analytics.js](https://developers.google.com/analytics/devguides/collection/gtagjs/migration)
script, it uses
[gtag.js](https://developers.google.com/analytics/devguides/collection/gtagjs/). Includes Outbound Link module.

## Install

```bash
npm install --save gatsby-plugin-gtag
```

## Use

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        // your google analytics tracking id
        trackingId: `UA-XXXXXXXX-X`,
        // Puts tracking script in the head instead of the body
        head: false,
        // enable ip anonymization
        anonymize: true,
      },
    },
  ],
};
```

## Outbound Links

Use like any other anchor tag in your component:

```jsx
import React from 'react';
import { OutboundLink } from 'gatsby-plugin-gtag';

export default () => (
  <div>
    <OutboundLink href="https://developers.google.com/gtagjs/reference/event">
      Check out the gtag API docs!
    </OutboundLink>
  </div>
);
```

## `trackCustomEvent`

```jsx
import React from 'react';
import { trackCustomEvent } from 'gatsby-plugin-gtag';

export default () => (
  <div>
    <button
      onClick={e => {
        // To stop the page reloading
        e.preventDefault();
        // Lets track that custom click
        trackCustomEvent({
          // string - required - The object that was interacted with (e.g.video)
          category: 'Special Button',
          // string - required - Type of interaction (e.g. 'play')
          action: 'Click',
          // string - optional - Useful for categorizing events (e.g. 'Spring Campaign')
          label: 'Gatsby Plugin Example Campaign',
          // number - optional - Numeric value associated with the event. (e.g. A product ID)
          value: 43,  
          // nonInteraction - optional - Boolean for setting the event as a non-interaction event. https://support.google.com/analytics/answer/1033068#NonInteractionEvents
          nonInteraction:false,
          // transport - optional - String for setting the transport type. "image","beacon" or "xhr". 
          //https://developers.google.com/analytics/devguides/collection/gtagjs/sending-data#specify_different_transport_mechanisms
          transport: "xhr",
        });
        //... Other logic here
      }}
    >
      Tap that!
    </button>
  </div>
);
```

## Options

#### head

Puts tracking script in the head instead of the body. Default is false (render in the body)

#### anonymize

Adds `anonymize_ip` flag when calling `gtag`. More info
[here](https://developers.google.com/analytics/devguides/collection/gtagjs/ip-anonymization).

## Testing in development mode

By default `gatsby-plugin-gtag` will only load and run google analytics when `process.env.NODE_ENV === 'production'`.
To enable gtag in development mode set the environment variable `GATSBY_GTAG_DEBUG=true gatsby develop`.

## License

MIT
