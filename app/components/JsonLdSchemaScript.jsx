import { serializeBlogPostSchemaForLd } from "../blog/blogPostQueries";

/** Renders `<script type="application/ld+json">` from Sanity `schema` (wrappers stripped when serializing). */
export default function JsonLdSchemaScript({ schema }) {
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
