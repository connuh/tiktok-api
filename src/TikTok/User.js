/**
 * @author Conner
 * @since 24/07/21
 */

// Handlers
import Request from "./handlers/Request";

// Constants
import Errors from "../constants/Errors";

// User Class
class User {
  /**
   * @param {Object} _ 
   */
  constructor(_) {
    this.session = _.session;
  }

  /** 
   * @returns {Promise<Object>}
   */
  async get() {
    let {
      status_code,
      status_msg,
      user
    } = await Request.get("ACCOUNT_INFO", this.session);

    if(typeof status_code !== "number")
      throw Errors.MALFORMED_RESPONSE;

    if(status_code > 0)
      throw status_msg || "N/A";

    return user;
  }

  /**
   * @param {String} username
   * @param {String} object
   * @returns {Promise<Object>}
   */
  setUsername = async (username, proxy) => await Request.post("UPDATE_USERNAME", this.session, `unique_id=${username}`, proxy);

  /**
   * @param {String} bio 
   * @returns {Promise<Object>} 
   */
  setBio = async bio => await Request.post("UPDATE_PROFILE", this.session, `signature=${bio}`);

  /**
   * 
   * @param {String} nickname 
   * @returns {Promise<Object>}
   */
  setNickname = async nickname => await Request.post("UPDATE_PROFILE", this.session, `nickname=${nickname}`);
}

export default User;