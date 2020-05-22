import { ORG_NAME, PLATFORM_URL } from '../../lib/constants';

export default function OrgLink({ href, children, ...props }) {
  return (
    <a href={`${PLATFORM_URL}${href || ''}`} rel="noopener noreferrer" target="_blank" {...props}>
      {children || (href ? `${PLATFORM_URL}${href}` : ORG_NAME)}
    </a>
  );
}
