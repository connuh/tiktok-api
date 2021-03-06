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
   * @param {String} proxy
   * @returns {Promise<Boolean>} 
   */
  async setBio(bio, proxy = null) {
    let {
      status_code,
      status_msg
    } = await Request.post("UPDATE_PROFILE", this.session, `signature=${bio}`, proxy);

    if(typeof status_code !== "number")
      throw Errors.MALFORMED_RESPONSE;

    if(status_code > 0)
      throw status_msg;

    return true;
  }


  /**
   * 
   * @param {String} nickname 
   * @param {String} proxy
   * @returns {Promise<Boolean>}
   */
  async setNickname(nickname, proxy = null) {
    let {
      status_code,
      status_msg
    } = await Request.post("UPDATE_PROFILE", this.session, `nickname=${nickname}`, proxy);

    if(typeof status_code !== "number")
      throw Errors.MALFORMED_RESPONSE;

    if(status_code > 0)
      throw status_msg;

    return true;
  }
}

export default User;