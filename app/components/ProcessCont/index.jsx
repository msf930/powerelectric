import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/sanityImageUrl";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import styles from "./styles.module.css";

const PROCESS_CONT_QUERY = `*[_type == "processCont"][0]{
    _id,
    processes[]->{
        _id,
        title,
        description
    }
}`;

export default async function ProcessCont({ category }) {

    const data = await client.fetch(PROCESS_CONT_QUERY);
    if (!data) {
        notFound();
    }
    return (
        <section className={styles.processCont}>
            <h2 className={styles.processContTitle}>Our {category} Service Process</h2>
            <div className={styles.processSteps}>
                {data.processes.map((process) => (
                    <div key={process._id} className={styles.processStep}>
                        <div className={styles.processStepImageContainer}>
                            <Image src="/PESLogo.png" alt={process.title} fill objectFit="contain" />
                        </div>
                        <div className={styles.processStepContent}>
                            <h3 className={styles.processStepTitle}>{process.title}</h3>
                            <p className={styles.processStepDescription}>{process.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}   