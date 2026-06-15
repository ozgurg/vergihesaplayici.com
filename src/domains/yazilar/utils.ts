export const parseTitleAsTaxInfo = (title: string): { name: string, code: string } | false => {
    const pattern = /^(.*?)\s*\[([^\]\\]+)\]\s*$/u;
    const matchArray = title.match(pattern);
    if (matchArray) {
        const name = matchArray[1]?.trim() || null;
        const code = matchArray[2]?.trim() || null;
        if (name && code) {
            return { name, code };
        }
    }
    return false;
};

export const parseDate = (date: Date): { timeDateTimeAttr: string, readableDate: string } => {
    const timeDateTimeAttr = date.toISOString().split("T")[0]!; // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time#valid_datetime_values
    const readableDate = date.toLocaleDateString("tr-TR");
    return {
        timeDateTimeAttr,
        readableDate
    };
};

export const getWordCount = (string: string): number => {
    return string.trim()
        .split(/\s+/u)
        .filter(Boolean)
        .length;
};

export const calculateReadingTimeInMinutes = (wordCount: number, wordsPerMinute = 200): number => {
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};
