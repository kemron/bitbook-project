const CSPHtmlWebpackPlugin = require("csp-html-webpack-plugin");
const { override } = require("customize-cra");

const DATAFEED_URL =
  process.env.REACT_APP_WS_URL || "wss://www.cryptofacilities.com/ws/v1";

const CSP_POLICY = {
  "default-src": "'self'",
  "connect-src": ["'self'", DATAFEED_URL],
  "font-src": ["https://fonts.gstatic.com"],
  "style-src": [
    "'self'",
    "https://fonts.googleapis.com/css2",
    "'unsafe-inline'",
  ],
  "script-src": "'self'",
};

const CSP_POLICY_OPTIONS = {
  enabled: process.env.NODE_ENV === "production",
  nonceEnabled: {
    "style-src": false,
  },
};

function overrideWebpackConfig(config) {
  config.plugins.push(new CSPHtmlWebpackPlugin(CSP_POLICY, CSP_POLICY_OPTIONS));

  return config;
}

module.exports = {
  webpack: override(overrideWebpackConfig),
};
