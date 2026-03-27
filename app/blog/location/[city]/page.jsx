import NavServer from "../../../components/Nav/NavServer";
import styles from "./styles.module.css";
import { client } from "../../../../sanity/lib/client";
import { urlFor } from "../../../../sanity/sanityImageUrl";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../../components/Footer";
import { FaArrowRight } from "react-icons/fa";

import CategoryForm from "../../../components/CategoryForm";
const PAGE_SIZE = 6;

const BLOG_POSTS_FIELDS = `
  _id,
  title,
  slug,
  excerpt,
  keywords,
  image,
  date
`;

const BLOG_COUNT_QUERY = `count(*[_type == "blogPost"])`;

const BLOG_POSTS_PAGE_QUERY = `*[_type == "blogPost"] | order(date desc)[$start...$end] {
  ${BLOG_POSTS_FIELDS}
}`;

function excerptToMaxWords(text, maxWords = 20) {
    if (!text || typeof text !== "string") return "";
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (words.length <= maxWords) return text.trim();
    return `${words.slice(0, maxWords).join(" ")}…`;
}

export default async function BlogPage({ searchParams, params }) {
    const { city } = await params;
    const sp = await searchParams;
    const raw = sp?.page;
    const parsed = typeof raw === "string" ? parseInt(raw, 10) : NaN;
    let page = Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;

    const total = await client.fetch(BLOG_COUNT_QUERY);
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE) || 1);
    page = Math.min(page, totalPages);

    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const blogPosts = await client.fetch(BLOG_POSTS_PAGE_QUERY, { start, end });

    const blogLocationBase = `/blog/location/${city}`;

    return (
        <div>
            <NavServer city={city} />
            <div className={styles.blogPageInner}>
                <div className={styles.parallaxStrip}>
                    <div className={styles.parallaxStripContent}><h1>Blog</h1></div>
                    <div className={styles.parallaxStripImage} aria-hidden />
                </div>
                <div className={styles.blogPostsContainer}>
                    {blogPosts.map((post) => (
                        <div className={styles.blogPost} key={post._id}>
                            <Link href={`/blog/${post.slug.current}${city ? `/${city}` : ""}`}>
                                <Image src={urlFor(post.image).url()} alt={post.title} width={300} height={300} className={styles.blogPostImage} />
                            </Link>
                            <div className={styles.blogPostKeywordsContainer}>
                                {(post.keywords ?? []).map((keyword, index) => (
                                    <span className={styles.blogPostKeywords} key={index}>{keyword}</span>
                                ))}
                            </div>
                            <Link href={`/blog/${post.slug.current}${city ? `/${city}` : ""}`}>
                                <h2 className={styles.blogPostTitle}>{post.title}</h2>
                            </Link>
                            <p className={styles.blogPostExcerpt}>{excerptToMaxWords(post.excerpt)}</p>
                            <Link href={`/blog/${post.slug.current}${city ? `/${city}` : ""}`} className={styles.blogPostLink}>Read More <FaArrowRight /></Link>
                        </div>
                    ))}
                </div>
                {total > 0 && (
                    <nav className={styles.blogPagination} aria-label="Blog pagination">
                        {page > 1 ? (
                            <div className={styles.blogPaginationLinkContainer}>
                                <Link
                                    href={page === 2 ? blogLocationBase : `${blogLocationBase}?page=${page - 1}`}
                                    className={styles.blogPaginationLink}
                                >
                                    Previous
                                </Link>
                            </div>
                        ) : (
                            <span className={styles.blogPaginationDisabled} aria-disabled="true">Previous</span>
                        )}
                        <span className={styles.blogPaginationInfo}>
                            Page {page} of {totalPages}
                        </span>
                        {page < totalPages ? (
                            <div className={styles.blogPaginationLinkContainer}>
                                <Link
                                    href={`${blogLocationBase}?page=${page + 1}`}
                                    className={styles.blogPaginationLink}
                                >
                                    Next
                                </Link>
                            </div>
                        ) : (
                            <span className={styles.blogPaginationDisabled} aria-disabled="true">Next</span>
                        )}
                    </nav>
                )}
            </div>
            
            <CategoryForm city={city} />
            <Footer />
        </div>
    );
}
