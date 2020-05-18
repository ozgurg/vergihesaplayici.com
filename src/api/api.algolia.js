import algoliasearch from "algoliasearch";


const algolia = algoliasearch(
	process.env.VUE_APP_ALGOLIA_APP_ID,
	process.env.VUE_APP_ALGOLIA_API_KEY
);


export default algolia.initIndex(process.env.VUE_APP_ALGOLIA_INDEX_NAME);