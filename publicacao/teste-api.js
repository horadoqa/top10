const axios = require("axios");
axios.get("https://api.linkedin.com/v2/me", {
  headers: { Authorization: `Bearer ` }
}).then(res => console.log(res.data))
.catch(err => console.error(err.response?.data || err.message));





