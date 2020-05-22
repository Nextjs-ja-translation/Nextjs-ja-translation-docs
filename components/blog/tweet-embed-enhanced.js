import ReactTweetEmbed from 'react-tweet-embed';
import Image from '../image';

const TweetEmbed = ({ id, options, ...rest }) => {
  return (
    <Image
      {...rest}
      renderImage={props => {
        return (
          <div className="tweet-wrapper">
            <ReactTweetEmbed id={props.src} options={options} />
            <style jsx>{`
              .tweet-wrapper {
                height: 100%;
                left: 0;
                position: absolute;
                top: 0;
                width: 100%;
              }

              .tweet-wrapper :global(twitter-widget) {
                margin: 0 !important;
              }
            `}</style>
          </div>
        );
      }}
    />
  );
};

export default TweetEmbed;
