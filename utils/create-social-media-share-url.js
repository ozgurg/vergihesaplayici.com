const createFacebookShareUrl = (url, title) => createSocialMediaShareUrl("facebook", url, title);
const createTwitterShareUrl = (url, title) => createSocialMediaShareUrl("twitter", url, title);
const createWhatsAppShareUrl = (url, title) => createSocialMediaShareUrl("whatsapp", url, title);
const createTelegramShareUrl = (url, title) => createSocialMediaShareUrl("telegram", url, title);
const createRedditShareUrl = (url, title) => createSocialMediaShareUrl("reddit", url, title);
const createEmailShareUrl = (url, title) => createSocialMediaShareUrl("email", url, title);

const createSocialMediaShareUrl = (site, url, title) => {
    switch (site) {
        case "facebook":
            return `https://www.facebook.com/sharer/sharer.php?u=${url}`;

        case "twitter":
            return `https://twitter.com/intent/tweet?url=${url}&text=${title}`;

        case "whatsapp":
            return `https://wa.me/?text=${url}`;

        case "telegram":
            return `https://telegram.me/share/url?url=${url}&text=${title}`;

        case "reddit":
            return `https://www.reddit.com/submit?url=${url}&title=${title}`;

        case "email":
            return `mailto:?subject=${title}&body=${url}`;
    }

    throw new Error(`Unknown social media site: ${site}`);
};

export {
    createFacebookShareUrl,
    createTwitterShareUrl,
    createWhatsAppShareUrl,
    createTelegramShareUrl,
    createRedditShareUrl,
    createEmailShareUrl
};
