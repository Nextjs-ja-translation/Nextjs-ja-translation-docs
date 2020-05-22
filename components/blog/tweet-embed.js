import ReactTweetEmbed from 'react-tweet-embed';

const TweetEmbed = props => (
  <div className="tweet-wrapper">
    <ReactTweetEmbed {...props} />
    <style jsx>{`
      .tweet-wrapper {
        margin: 40px 0;
      }
    `}</style>
  </div>
);

export default TweetEmbed;
