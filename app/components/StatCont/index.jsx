"use client";

import { useState, useEffect } from "react";
import { client } from "../../../sanity/lib/client";
import styles from "./styles.module.css";
import StatCounter from "../StatCounter";
export default function StatCont() {
    const STATS_QUERY = `*[_type == "statsContainer"]{
        _id,
        stats[]->{
            _id,
            leadingText,
            value,
            trailingText,
            description,
        }
    }`;
    const [stats, setStats] = useState([]);
    useEffect(() => {
        const fetchStats = async () => {
            const data = await client.fetch(STATS_QUERY);
            setStats(data[0].stats);

        }
        fetchStats();
    }, []);
    return (
        <div className={styles.statCont}>
            <div className={styles.statContInner}>
                <div className={styles.statContInnerBg} aria-hidden />
                <div className={styles.statContInnerContent}>
                {stats.map((stat, index) => (
                    <div key={index} className={styles.statContItem}>
                        <div className={styles.counterCont}>
                            <p>{stat.leadingText}</p>
                            <StatCounter from={0} to={stat.value} duration={2} />
                            <p>{stat.trailingText}</p>
                        </div>
                        <div className={styles.descriptionCont}>
                            <p>{stat.description}</p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}