import Head from 'next/head';

export default ({ children, ...props }) => (
  <Head>
    <title>{`ドキュメント - ${props.title} | Next.js`}</title>
    <meta name="twitter:card" content={props.image ? 'summary_large_image' : 'summary'} />
    <meta name="og:title" content={props.ogTitle || props.title} />
    {props.description ? <meta name="description" content={props.description} /> : null}
    {props.ogDescription ? (
      <meta name="og:description" content={props.ogDescription} />
    ) : (
      <meta name="og:description" content={props.description} />
    )}
    {props.video
      ? [
          <meta name="og:type" content="video" key="0" />,
          <meta name="og:video" content={props.video} key="1" />,
          <meta name="og:video:type" content="video/mp4" key="2" />
        ]
      : null}

    {children}
  </Head>
);
