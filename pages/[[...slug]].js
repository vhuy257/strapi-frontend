import delve from "dlv";
import ErrorPage from "next/error";
import PreviewBanner from "../components/global/PreviewBanner";
import Layout from "../components/layout";
import BlockManager from "../components/shared/BlockManager";
import { getData, handleRedirection } from "../utils";
import { getLocalizedParams } from "../utils/localize";

const Universals = ({ global, pageData, preview, meta }) => {
  if (pageData === null) {
    // return <ErrorPage statusCode={404} />;
    return <PreviewBanner />
  }
  const blocks = delve(pageData, "attributes.blocks");
  return (
    <Layout global={global} pageData={pageData} meta={meta} type="pages" preview={preview}>
      {blocks && <BlockManager blocks={blocks} />}
    </Layout>
  );
};

// This gets called on every request
export async function getServerSideProps(context) {
  const { slug, locale } = getLocalizedParams(context.query);

  try {
    const data = getData(
      slug,
      locale,
      "page",
      "collectionType",
      context.preview
    );
    const res = await fetch(delve(data, "data"));
    const json = await res.json();

    if (!json.data.length) {
      return handleRedirection(context.preview, null);
    }
    
    return {
      props: { pageData: json.data[0], meta: json.meta, preview: context.preview || null },
    };
  } catch (error) {
    return {
      props: { pageData: null },
    };
  }
}

export default Universals;
