import axios from "axios";

export default axios.create({
  baseURL: "https://e-sarafa-backend.onrender.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
