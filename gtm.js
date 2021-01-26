"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gtmStr = function gtmStr(trackingId) {
  return "\n<!-- Google Tag Manager -->\n(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','" + trackingId + "');\n<!-- End Google Tag Manager -->\n";
};

var gtmScript = function gtmScript(trackingId) {
  return _react2.default.createElement("script", {
    key: "gatsby-plugin-gtm-inline-script",
    dangerouslySetInnerHTML: { __html: gtmStr(trackingId) }
  });
};

exports.default = gtmScript;