import axios from "axios";

export default {
  // Gets all books
  getUsers: function() {
    return axios.get("https://murmuring-sea-22252.herokuapp.com/users");
  },
  // Gets the book with the given id
  getUser: function(id) {
    return axios.get("https://murmuring-sea-22252.herokuapp.com/users/" + id);
  },
  // Saves a book to the database
  saveUser: function(userData) {
    return axios.post("https://murmuring-sea-22252.herokuapp.com/user", userData);
  }
};
