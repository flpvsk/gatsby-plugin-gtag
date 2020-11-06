import React from 'react';

const antiFlickerStr = trackingId => `
(function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
(a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
})(window,document.documentElement,'async-hide','dataLayer',4000,
{'${trackingId}':true});
`;

const antiFlickerStyle = (
  <style>{`.async-hide { opacity: 0 !important}`}</style>
);

const antiFlickerScript = ({ trackingId }) => (
  <script
    key="gatsby-plugin-gtag-inline-script"
    dangerouslySetInnerHTML={{ __html: antiFlickerStr(trackingId) }}
  />
);

export { antiFlickerStyle, antiFlickerScript };
