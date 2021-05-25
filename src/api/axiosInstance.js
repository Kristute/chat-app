import axios from "axios";

export default axios.create({
  baseURL: "https://api.jsonbin.io/v3/b",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "X-Master-Key": process.env.REACT_APP_API_KEY,
    "X-Collection-Id": process.env.REACT_APP_API_COLLECTION,
  },
});
