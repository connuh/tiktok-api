/**
 * @author Conner
 * @since 24/07/21
 */

// Imports
import User from "./User";
import Users from "./Users";

// Client Class
class Client {
  /**
   * @param {String} session 
   */
  constructor(session) {
    this.session = session;

    this.user = new User(this);
    this.users = new Users(this);
  }
}

export default Client;