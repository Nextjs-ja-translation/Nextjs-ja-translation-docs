import { TWITTER_USER_NAME } from '../../lib/constants';

export default function TwitterLink({ children, ...props }) {
  return (
    <a
      href={`https://twitter.com/${TWITTER_USER_NAME}`}
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      {children || `@${TWITTER_USER_NAME}`}
    </a>
  );
}
