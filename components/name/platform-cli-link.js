import { ORG_NAME, PLATFORM_URL } from '../../lib/constants';

export default function PlatformCliLink({ href, children, ...props }) {
  return (
    <a href={`${PLATFORM_URL}/download`} rel="noopener noreferrer" target="_blank" {...props}>
      {ORG_NAME} CLI
    </a>
  );
}
