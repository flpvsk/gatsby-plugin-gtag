# gatsby-plugin-gtag
### Add Google Analytics gtag.js to a site

Does the same thing as
[gatsby-plugin-google-analytics](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-google-analytics),
but instead of adding [deprecated analytics.js](https://developers.google.com/analytics/devguides/collection/gtagjs/migration)
script, it uses
[gtag.js](https://developers.google.com/analytics/devguides/collection/gtagjs/).

## Install

```bash
npm install --save gatsby-plugin-gtag`
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
        // enable ip anonymization
        anonymize: true,
      },
    },
  ],
}

```

## Options

#### anonymize

Adds `anonymize_ip` flag when calling `gtag`. More info
[here](https://developers.google.com/analytics/devguides/collection/gtagjs/ip-anonymization).

## License

MIT
