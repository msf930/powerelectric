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

const VALUE_ITEM_CONTAINER_QUERY = `*[_type == "valueItemContainer"][0]{
    _id,
    valueItems[]->{
        _id,
        title,
        icon { asset->{ _id, url } },
        pageLink
    }
}`;
export default function ValueCont({ city = "" }) {
    const [valueItems, setValueItems] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await client.fetch(VALUE_ITEM_CONTAINER_QUERY);
            setValueItems(data);
            
        };
        fetchData();
        console.log(valueItems);
    }, []);
    return (
        <div className={styles.valueCont}>
           
            {valueItems?.valueItems && valueItems.valueItems.length > 0 && (
                <div className={styles.valueContInner}>
                    {(valueItems.valueItems ?? []).map((valueItem, index) => (
                        <Link href={valueItem?.pageLink === 1 ? `/contact${city ? `/${city}` : ""}` : valueItem?.pageLink === 2 ? `/about${city ? `/${city}` : ""}` : valueItem?.pageLink === 3 ? `/financing${city ? `/${city}` : ""}` : `/membership${city ? `/${city}` : ""}`} key={index} className={styles.valueItem}>
                            {valueItem.icon?.asset?.url && (
                                <Image src={valueItem.icon.asset.url} alt={valueItem.title} width={65} height={65} />
                            )}
                            <h2>{valueItem.title}</h2>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}