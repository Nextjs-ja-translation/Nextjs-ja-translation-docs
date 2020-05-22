import { mapping } from '../../showcase-manifest';
import Showcase from './index';

export async function getStaticPaths() {
  return {
    paths: Object.keys(mapping).map(key => {
      return { params: { item: key } };
    }),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  return { props: { item: params.item } };
}

export default props => <Showcase {...props} />;
