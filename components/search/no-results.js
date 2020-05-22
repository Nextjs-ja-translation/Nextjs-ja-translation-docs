import { connectStateResults } from 'react-instantsearch-dom';

const NoResults = ({ searchState, searchResults, searching }) =>
  searchState && searchState.query && !searching && searchResults && searchResults.nbHits === 0 ? (
    <div className="no-results">
      No results for <span>&quot;{searchResults.query}&quot;</span>.<br /> Try again with a
      different keyword.
      <style jsx>{`
        .no-results {
          position: absolute;
          background: #fff;
          padding: 2rem;
          top: 3rem;
          color: #444444;
          font-size: 0.875rem;
          text-align: center;
        }
        .no-results span {
          word-break: break-all;
        }
      `}</style>
    </div>
  ) : null;

// https://www.algolia.com/doc/guides/building-search-ui/going-further/conditional-display/react/
export default connectStateResults(NoResults);
