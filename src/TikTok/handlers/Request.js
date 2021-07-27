/**
 * @author Conner
 * @since 24/07/21
 */

// Dependenices
import p from "phin";
import agent from "https-proxy-agent";

// Utils
import Encryption from "../../Encryption";

// Constants
import Endpoints from "../../constants/Endpoints";

// Variables
const USER_AGENT = "okhttp/3.12.1";

// Request Class
class Request {
  /**
   * @param {String} endpoint 
   * @param {String} session
   * @param {String} data
   * @param {String} proxy
   * @returns {Promise<Object>}
   * 
   * TODO: Make an actual request builder here, too lazy as of right now.
   */
  static get = async (endpoint, session, data, proxy = null) => await(await p({
    url: `${Endpoints["BASE_URL"]}/${Endpoints[endpoint].replace("<user>", data)}`,
    headers: {
      "User-Agent": USER_AGENT,
      "Cookie": session ? `sessionid=${session}` : null,
      "X-Gorgon": Encryption.getHeaders(Endpoints[endpoint].replace("<user>", data).split("?")[1], `sessionid=${this.session}`, ""),
      "X-Khronos": Math.floor(new Date().getTime() / 1000).toString(),
    },
    core: {
      agent: (
        proxy ? new agent(`http://${proxy}`) : null
      )
    },
    parse: "json",
  })).body;

  /**
   * @param {String} endpoint 
   * @param {String} session 
   * @param {String} body 
   * @param {String} proxy
   * @returns {Promise<Object>} 
   */
  static post = async (endpoint, session, body, proxy = null) => await(await p({
    method: "POST",
    url: `${Endpoints["BASE_URL"]}/${Endpoints[endpoint]}`,
    headers: {
      "User-Agent": USER_AGENT,
      "Cookie": session ? `sessionid=${session}` : null,
      "X-Gorgon": Encryption.getHeaders(Endpoints[endpoint].split("?")[1], `sessionid=${this.session}`, ""),
      "X-Khronos": Math.floor(new Date().getTime() / 1000).toString(),
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: body,
    core: {
      agent: (
        proxy ? new agent(`http://${proxy}`) : null
      )
    },
    parse: "json"
  })).body;
}

export default Request;