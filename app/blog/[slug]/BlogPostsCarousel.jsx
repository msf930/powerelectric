"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";

const INTERVAL_MS = 5000;

function excerptShort(text, maxWords = 16) {
    if (!text || typeof text !== "string") return "";
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (words.length <= maxWords) return text.trim();
    return `${words.slice(0, maxWords).join(" ")}…`;
}

export default function BlogPostsCarousel({ posts }) {
    const [index, setIndex] = useState(0);
    const n = posts?.length ?? 0;

    const goNext = useCallback(() => {
        setIndex((i) => (n ? (i + 1) % n : 0));
    }, [n]);

    const goPrev = useCallback(() => {
        setIndex((i) => (n ? (i - 1 + n) % n : 0));
    }, [n]);

    useEffect(() => {
        if (n <= 1) return;
        const t = setInterval(goNext, INTERVAL_MS);
        return () => clearInterval(t);
    }, [n, goNext]);

    if (!n) return null;

    return (
        <section className={styles.blogCarousel} aria-label="More blog posts">
            <h2 className={styles.blogCarouselTitle}>Similar Posts</h2>
            <div className={styles.blogCarouselViewport}>
                <div
                    className={styles.blogCarouselTrack}
                    style={{
                        width: `${n * 100}%`,
                        transform: `translateX(-${(index * 100) / n}%)`,
                    }}
                >
                    {posts.map((post) => (
                        <article
                            key={post._id}
                            className={styles.blogCarouselSlide}
                            style={{ width: `${100 / n}%` }}
                        >
                            <Link href={`/blog/${post.slug}`} className={styles.blogCarouselCard}>
                                <div className={styles.blogCarouselImageWrap}>
                                    {post.imageUrl && (
                                        <Image
                                            src={post.imageUrl}
                                            alt={post.title}
                                            fill
                                            className={styles.blogCarouselImage}
                                            sizes="(max-width: 768px) 100vw, 400px"
                                        />
                                    )}
                                </div>
                                <div className={styles.blogCarouselText}>
                                    <h3 className={styles.blogCarouselPostTitle}>{post.title}</h3>
                                    <p className={styles.blogCarouselExcerpt}>
                                        {excerptShort(post.excerpt)}
                                    </p>
                                    <span className={styles.blogCarouselReadMore}>Read post →</span>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
            {n > 1 && (
                <div className={styles.blogCarouselControls}>
                    <button
                        type="button"
                        className={styles.blogCarouselArrow}
                        onClick={goPrev}
                        aria-label="Previous post"
                    >
                        ‹
                    </button>
                    <div className={styles.blogCarouselDots}>
                        {posts.map((post, i) => (
                            <button
                                key={post._id}
                                type="button"
                                className={
                                    i === index
                                        ? styles.blogCarouselDotActive
                                        : styles.blogCarouselDot
                                }
                                aria-label={`Go to slide ${i + 1}`}
                                aria-current={i === index}
                                onClick={() => setIndex(i)}
                            />
                        ))}
                    </div>
                    <button
                        type="button"
                        className={styles.blogCarouselArrow}
                        onClick={goNext}
                        aria-label="Next post"
                    >
                        ›
                    </button>
                </div>
            )}
        </section>
    );
}
