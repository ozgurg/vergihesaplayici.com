/**
 * @param {string} url
 * @returns {string}
 */
export const createFacebookShareUrl = url => `https://www.facebook.com/sharer/sharer.php?u=${url}`;

/**
 * @param {string} url
 * @param {string} title
 * @returns {string}
 */
export const createXShareUrl = (url, title) => `https://x.com/intent/tweet?url=${url}&text=${title}`;

/**
 * @param {string} url
 * @returns {string}
 */
export const createWhatsAppShareUrl = url => `https://wa.me/?text=${url}`;

/**
 * @param {string} url
 * @param {string} title
 * @returns {string}
 */
export const createTelegramShareUrl = (url, title) => `https://telegram.me/share/url?url=${url}&text=${title}`;

/**
 * @param {string} url
 * @param {string} title
 * @returns {string}
 */
export const createRedditShareUrl = (url, title) => `https://www.reddit.com/submit?url=${url}&title=${title}`;
