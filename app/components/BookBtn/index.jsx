"use client";
import Link from "next/link";
import styles from "./styles.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { client } from "../../../sanity/lib/client";

const BOOK_BUTTON_QUERY = `*[_type == "bookButton"][0]{
    _id,
    link
}`;

export default function BookBtn({ label = "Book Now" }) {
    const [bookButton, setBookButton] = useState(null);
    useEffect(() => {
        const fetchBookButton = async () => {
            const data = await client.fetch(BOOK_BUTTON_QUERY);
            setBookButton(data);
        };
        fetchBookButton();
    }, []);
    return (
        bookButton && (
        <Link href={bookButton?.link} className={styles.bookBtn}>{label}</Link>
        )
    );
}