import { PLATFORM_NAME, PLATFORM_URL } from '../../lib/constants';

export default function PlatformLink({ href, children, ...props }) {
  return (
    <a href={`${PLATFORM_URL}${href || ''}`} rel="noopener noreferrer" target="_blank" {...props}>
      {children || (href ? `${PLATFORM_URL}${href}` : PLATFORM_NAME)}
    </a>
  );
}
