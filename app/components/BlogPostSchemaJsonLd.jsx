import { serializeBlogPostSchemaForLd } from "../blog/blogPostQueries";

/**
 * Renders JSON-LD from the same `schema` string as BLOG_POST_QUERY (via blogPostQueries).
 */
export default function BlogPostSchemaJsonLd({ schema }) {
    const json = serializeBlogPostSchemaForLd(schema);
    if (!json) return null;
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: json,
            }}
        />
    );
}
