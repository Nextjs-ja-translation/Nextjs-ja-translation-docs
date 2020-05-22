import { memo } from 'react';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import AlgoliaClient from '../../lib/algolia-client';
import AutoComplete from './auto-complete';

const searchClient = new AlgoliaClient();

function Search(props) {
  return (
    <InstantSearch indexName="nextjs_docs" searchClient={searchClient}>
      <Configure hitsPerPage={8} />
      <AutoComplete {...props} />
    </InstantSearch>
  );
}

// This may look invalid, but currently the implementation of search doesn't have dynamic
// props, and this avoids querying Algolia multiple times + unnecessary re-renders
export default memo(Search, () => true);
