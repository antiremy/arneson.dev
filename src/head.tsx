import {
  canonicalUrl,
  ogImage,
  pageTitle,
  siteName,
  siteUrl,
  type PageMeta,
} from "./metadata";

// Rendered to static markup at build time only; the tags mirror what Next's
// Metadata API used to emit so link previews and search results don't change.
export function Head({ meta }: { meta: PageMeta }) {
  const title = pageTitle(meta);
  const url = canonicalUrl(meta.path);
  const image = `${siteUrl}${ogImage.url}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={meta.description} />
      {meta.noindex ? (
        <meta name="robots" content="noindex" />
      ) : (
        <link rel="canonical" href={url} />
      )}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={image} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content={String(ogImage.width)} />
      <meta property="og:image:height" content={String(ogImage.height)} />
      <meta property="og:image:alt" content={ogImage.alt} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={ogImage.alt} />
      <meta name="twitter:image:type" content="image/png" />
      <meta name="twitter:image:width" content={String(ogImage.width)} />
      <meta name="twitter:image:height" content={String(ogImage.height)} />
    </>
  );
}
