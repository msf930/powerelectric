import NavServer from "../components/Nav/NavServer";
import styles from "./styles.module.css";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/sanityImageUrl";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import { FaArrowRight } from "react-icons/fa";
import {
    BLOG_LIST_PAGE_SIZE,
    BLOG_LIST_COUNT_QUERY,
    BLOG_LIST_POSTS_PAGE_QUERY,
    BLOG_CATEGORIES_QUERY,
    blogListHref,
    excerptToMaxWords,
} from "./blogPostQueries";

export default async function BlogPage({ searchParams }) {
    const sp = await searchParams;
    const rawPage = sp?.page;
    const parsedPage = typeof rawPage === "string" ? parseInt(rawPage, 10) : NaN;
    let page = Number.isFinite(parsedPage) && parsedPage >= 1 ? parsedPage : 1;

    const rawCategory = sp?.category;
    const categoryParam = Array.isArray(rawCategory) ? rawCategory[0] : rawCategory;
    const categorySlug =
        typeof categoryParam === "string" && categoryParam.trim() !== "" ? categoryParam.trim() : null;
    const filterSlug = categorySlug ?? "";

    const blogCategories = await client.fetch(BLOG_CATEGORIES_QUERY);

    const total = await client.fetch(BLOG_LIST_COUNT_QUERY, { filterSlug });
    const totalPages = Math.max(1, Math.ceil(total / BLOG_LIST_PAGE_SIZE) || 1);
    page = Math.min(page, totalPages);

    const start = (page - 1) * BLOG_LIST_PAGE_SIZE;
    const end = start + BLOG_LIST_PAGE_SIZE;

    const blogPosts = await client.fetch(BLOG_LIST_POSTS_PAGE_QUERY, {
        filterSlug,
        start,
        end,
    });

    return (
        <div>
            <NavServer />
            <div className={styles.blogPageInner}>
                <div className={styles.parallaxStrip}>
                    <div className={styles.parallaxStripContent}><h1>Blog</h1></div>
                    <div className={styles.parallaxStripImage} aria-hidden />
                </div>
                <nav className={styles.blogCategoryFilters} aria-label="Filter posts by category">
                    <Link
                        href={blogListHref("/blog", { page: 1, categorySlug: null })}
                        className={`${styles.blogCategoryButton}${categorySlug == null ? ` ${styles.blogCategoryButtonActive}` : ""}`}
                        aria-current={categorySlug == null ? "page" : undefined}
                    >
                        All
                    </Link>
                    {blogCategories.map((cat) => {
                        const slug = cat.slug?.current;
                        if (!slug) return null;
                        const active = categorySlug === slug;
                        return (
                            <Link
                                key={cat._id}
                                href={blogListHref("/blog", { page: 1, categorySlug: slug })}
                                className={`${styles.blogCategoryButton}${active ? ` ${styles.blogCategoryButtonActive}` : ""}`}
                                aria-current={active ? "page" : undefined}
                            >
                                {cat.title}
                            </Link>
                        );
                    })}
                </nav>
                <div className={styles.blogPostsContainer}>
                    {blogPosts.map((post) => (
                        <div className={styles.blogPost} key={post._id}>
                            <Link href={`/blog/${post.slug.current}`}>
                                <Image src={urlFor(post.image).url()} alt={post.title} width={300} height={300} className={styles.blogPostImage} />
                            </Link>
                            <div className={styles.blogPostKeywordsContainer}>
                                {(post.keywords ?? []).map((keyword, index) => (
                                    <span className={styles.blogPostKeywords} key={index}>{keyword}</span>
                                ))}
                            </div>
                            <Link href={`/blog/${post.slug.current}`}>
                                <h2 className={styles.blogPostTitle}>{post.title}</h2>
                            </Link>
                            <p className={styles.blogPostExcerpt}>{excerptToMaxWords(post.excerpt)}</p>
                            <Link href={`/blog/${post.slug.current}`} className={styles.blogPostLink}>Read More <FaArrowRight /></Link>
                        </div>
                    ))}
                </div>
                {total > 0 && (
                    <nav className={styles.blogPagination} aria-label="Blog pagination">
                        {page > 1 ? (
                            <div className={styles.blogPaginationLinkContainer}>
                                <Link
                                    href={blogListHref("/blog", { page: page - 1, categorySlug })}
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
                                    href={blogListHref("/blog", { page: page + 1, categorySlug })}
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
            <Footer />
        </div>
    );
}
