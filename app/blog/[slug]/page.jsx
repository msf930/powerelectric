import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/sanityImageUrl";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer";
import { FaArrowRight, FaSquare } from "react-icons/fa";
import NavServer from "../../components/Nav/NavServer";
import styles from "./styles.module.css";
import { PortableText } from "next-sanity";
import { getPortableTextComponents } from "./portableTextComponents";
import BookBtn from "../../components/BookBtn";
import CallBtn from "../../components/CallBtn";
import CategoryForm from "../../components/CategoryForm";
import BlogPostsCarousel from "./BlogPostsCarousel";
import { notFound } from "next/navigation";

const BLOG_POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    content,
    keywords,
    image,
    date
}`;

const ALL_BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    image
}`;

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const [data, allPostsRaw] = await Promise.all([
        client.fetch(BLOG_POST_QUERY, { slug }),
        client.fetch(ALL_BLOG_POSTS_QUERY),
    ]);
    if (!data) notFound();

    const carouselPosts = (allPostsRaw ?? []).map((post) => ({
        ...post,
        imageUrl: post.image ? urlFor(post.image).width(800).height(500).url() : null,
    }));

    const ptComponents = getPortableTextComponents(styles);
    return (
        <div>
            <NavServer />
            <div className={styles.parallaxStrip}>
                    <div className={styles.parallaxStripContent}>
                    <div className={styles.parallaxStripKeywordsContainer}>
                                   
                                    {data.keywords && data.keywords.map((keyword, index) => (
                                        <div key={index}>
                                            <p className={styles.parallaxStripKeywords}>{keyword}</p>
                                        </div>
                                    ))}
                                </div>
                        <h1>{data.title}</h1></div>
                    <div className={styles.parallaxStripImage} aria-hidden />
                </div>
            <div className={styles.blogPostPageInner}>
                <div className={styles.blogPostPageContent}>
                    <div className={styles.blogPostHero}>
                        <div className={styles.blogPostHeroContent}>
                            <div className={styles.blogPostHeroContentLeft}>
                                <div className={styles.blogPostHeroKeywordsContainer}>
                                    {data.keywords && (
                                        <div>
                                            <FaSquare />
                                        </div>
                                    )}
                                    {data.keywords.map((keyword, index) => (
                                        <div key={index}>
                                            <p className={styles.blogPostHeroKeywords}>{keyword}</p>
                                        </div>
                                    ))}
                                </div>
                                <h1 className={styles.blogPostHeroTitle}>{data.title}</h1>
                            </div>
                            <div className={styles.blogPostHeroContentRight}>

                                <Image src={urlFor(data.image).url()} alt={data.title} width={300} height={300} className={styles.blogPostPageImage} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.blogPostContent}>
                        <PortableText value={data.content} components={ptComponents} />
                    </div>
                </div>
                <div className={styles.blogPostButtonContainer}>
                    <BookBtn />
                    <CallBtn />
                </div>
                <BlogPostsCarousel posts={carouselPosts} />
                <CategoryForm />
            </div>

            <Footer />
        </div>
    );
}