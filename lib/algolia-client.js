import algoliasearch from 'algoliasearch/lite';

export default class AlgoliaClient {
  client = algoliasearch('NNTAHQI9C5', 'ac5d89f9877f9fb09dbdc9a010cca761');

  async search(requests) {
    if (requests.every(({ params: { query } }) => !query)) {
      return {
        results: requests.map(() => {
          return {
            processingTimeMS: 0,
            nbHits: 0,
            hits: [],
            facets: {}
          };
        })
      };
    }

    return this.client.search(requests);
  }
  async searchForFacetValues(requests) {
    return this.client.searchForFacetValues(requests);
  }
}
