/**
 * @author Conner
 * @since 24/07/21
 */

// Handlers
import Request from "./handlers/Request";

// Constants
import Errors from "../constants/Errors";

// Users Class
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
  async isAvailable(username, proxy = null) {
    // TODO: Use object destructuring to turn this into variables ex: status_code etc, endpoint is currently returning an empty body `{}` so, I'm unable to debug
    let body = await Request.get("CHECK_USERNAME", this.session, username, proxy);

    if(typeof body.status_code !== "number")
      throw Errors.MALFORMED_RESPONSE;

    if(body.status_code > 0)
      throw body.status_msg;

    return body;
  }
}

export default Users;