/**
 * @author Conner
 * @since 24/07/21
 */

// Handlers
import Request from "./handlers/Request";

// User Class
class Users {
  /**
   * @param {Object} _ 
   */
  constructor(_) {
    this.session = _.session;
  }

    /**
   * @param {String} username 
   * @param {String} proxy
   * @returns {Promise<Object>}
   */
  isAvailable = async (username, proxy) => await Request.get("CHECK_USERNAME", this.session, username, proxy);
}

export default Users;