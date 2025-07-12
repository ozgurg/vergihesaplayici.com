const encode = (url: URL): string => encodeURIComponent(url.href);


export const createFacebookShareUrl = (url: URL): URL => new URL(`https://www.facebook.com/sharer/sharer.php?u=${encode(url)}`);

export const createXShareUrl = (url: URL): URL => new URL(`https://x.com/intent/tweet?url=${encode(url)}`);

export const createWhatsAppShareUrl = (url: URL): URL => new URL(`https://wa.me/?text=${encode(url)}`);

export const createTelegramShareUrl = (url: URL): URL => new URL(`https://telegram.me/share/url?url=${encode(url)}`);

export const createRedditShareUrl = (url: URL): URL => new URL(`https://www.reddit.com/submit?url=${encode(url)}`);
