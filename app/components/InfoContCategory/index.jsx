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
                        
                        <div className={styles.infoContHomeInnerContentText}>
                            <h1>{data.title}</h1>
                            <p>{data.description}</p>

                            
                            <div className={styles.infoContHomeInnerButtonCont}>
                                <BookBtn />
                                <CallBtn />
                            </div>
                        </div>
                        <div className={styles.infoContHomeInnerContentImage}>
                            <Image src={urlFor(data.imageSecondary).url()} alt={data.title} fill className="object-cover" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};