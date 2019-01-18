import React from 'react';

const GTAG_SRC = `https://www.googletagmanager.com/gtag/js`;

exports.onRenderBody = (
  { setHeadComponents, setPostBodyComponents },
  pluginOptions
) => {
  if (
    process.env.NODE_ENV !== 'production' ||
    !pluginOptions.trackingId
  ) {
    return null;
  }

  const anonymize = pluginOptions.anonymize || false;

  const gtagScript = (
    <script
      async
      key="gatsby-plugin-gtag-gtag-js"
      src={`${GTAG_SRC}?id=${pluginOptions.trackingId}`}
    />
  );

  const scriptStr = `
    window.GATSBY_GTAG_PLUGIN_GA_TRACKING_ID = (
      '${pluginOptions.trackingId}'
    );
    window.GATSBY_GTAG_PLUGIN_ANONYMIZE = ${anonymize};

    let options = {
      send_page_view: false
    };
    if (${anonymize}) {
      options.anonymize_ip = true;
    }

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', '${pluginOptions.trackingId}', options);
  `;
  const trackScript = (
    <script
      key="gatsby-plugin-gtag-inline-script"
      dangerouslySetInnerHTML={{ __html: scriptStr }}
    />
  );

  const setComponents = pluginOptions.head
    ? setHeadComponents
    : setPostBodyComponents;

  return setComponents([gtagScript, trackScript]);
};
