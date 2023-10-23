/**
 * @param {string} from
 * @param {string} to
 * @returns {Promise<number>}
 */
const fetchExchangeRate = async (from, to) => {
    const apiUrl = `https://open.er-api.com/v6/latest/${from}`;
    return await fetch(apiUrl)
        .then(response => response.json())
        .then(response => response.rates[to]);
};

export {
    fetchExchangeRate
};
