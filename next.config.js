const { withContentlayer } = require("next-contentlayer");

module.exports = withContentlayer({
  images: {
    domains: [
      "res.cloudinary.com",
    ],
  },
});
