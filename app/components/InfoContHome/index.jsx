"use client";
import { useState, useEffect } from 'react';
import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/sanityImageUrl';
import Image from 'next/image';
import { PortableText } from 'next-sanity';
import styles from './styles.module.css';
import Link from 'next/link';
import BookBtn from '../BookBtn';
import CallBtn from '../CallBtn';
const INFO_SECTION_QUERY = `*[_type == "infoSection"][0]{
    _id,
    title,
    description,
    image,
    imageSecondary,
    bulletPoints
}`;
export default function InfoContHome() {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const data = await client.fetch(INFO_SECTION_QUERY);
            setData(data);
        };
        fetchData();
    }, []);
    return (
        <div className={styles.infoContHome}>
            <div className={styles.infoContHomeInner}>
                {data && (
                    <div className={styles.infoContHomeInnerContent}>
                        <div className={styles.infoContHomeInnerContentImage}>
                            <Image src={urlFor(data.image).url()} alt={data.title} fill className="object-cover" />
                        </div>
                        <div className={styles.infoContHomeInnerContentText}>
                            <h1>{data.title}</h1>
                            <p>{data.description}</p>

                            <ul>
                                {data.bulletPoints.map((bulletPoint, index) => (
                                    <div key={index} className={styles.infoContHomeInnerContentBulletPoint}>
                                        <svg viewBox="0 0 24 24" width={30} height={30} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                        <li key={index}>{bulletPoint}</li>
                                    </div>
                                ))}
                            </ul>
                            <div className={styles.infoContHomeInnerButtonCont}>
                                <BookBtn />
                                <CallBtn />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};