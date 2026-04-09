"use client";
import Link from "next/link";
import styles from "./styles.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { client } from "../../../sanity/lib/client";

const CALL_BUTTON_QUERY = `*[_type == "callButton"][0]{
    _id,
    number
}`;

function formatPhoneDisplay(number) {
    if (!number) return "";
    const digits = number.replace(/\D/g, "").replace(/^\+1/, "");
    if (digits.length < 10) return number;
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
}

export default function CallBtn({ label }) {
    const [callButton, setCallButton] = useState(null);
    useEffect(() => {
        const fetchCallButton = async () => {
            const data = await client.fetch(CALL_BUTTON_QUERY);
            setCallButton(data);
        };
        fetchCallButton();
    }, []);
    return (
        callButton && (
            <Link href={`tel:${callButton?.number}`} className={styles.callBtn}>
                {label ?? formatPhoneDisplay(callButton?.number)}
            </Link>
        )
    );
}