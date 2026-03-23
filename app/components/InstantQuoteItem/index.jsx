

export default function InstantQuoteItem({ title, description, image, id }) {
    return (
        <div className={styles.instantQuoteItem}>
            <Image src={urlFor(image).url()} alt={title} width={100} height={100} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}