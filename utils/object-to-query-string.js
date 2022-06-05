import querystring from "querystring";

const objectToQueryString = object => {
    return querystring.stringify(object);
};

export default objectToQueryString;
