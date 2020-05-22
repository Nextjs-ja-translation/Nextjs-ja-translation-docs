import { PLATFORM_CDN_NAME, PLATFORM_URL } from '../../lib/constants';

export default function PlatformCdnLink({ href, children, ...props }) {
  return (
    <a href={`${PLATFORM_URL}/smart-cdn`} rel="noopener noreferrer" target="_blank" {...props}>
      {PLATFORM_CDN_NAME}
    </a>
  );
}
