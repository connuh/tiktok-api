/**
 * @author Conner
 * @since 24/07/21
 */

// Handlers
import Request from "./handlers/Request";

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
  get = async () => await Request.get("ACCOUNT_INFO", this.session);

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