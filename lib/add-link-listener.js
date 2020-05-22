import Link from 'next/link';

/**
 * Util to add `next/link` to anchors that weren't added with React Components
 */
export default function addLinkListener(node, { href, as }) {
  const link = new Link({ href, as });

  function onClick(e) {
    if (!e.defaultPrevented) {
      e.nativeEvent = e;
      link.linkClicked(e);
    }
  }
  function onMouseEnter() {
    link.prefetch({ priority: true });
  }

  link.handleRef(node);
  node.addEventListener('click', onClick);
  node.addEventListener('mouseenter', onMouseEnter);

  return () => {
    link.cleanUpListeners();
    node.removeEventListener('click', onClick);
    node.removeEventListener('mouseenter', onMouseEnter);
  };
}
