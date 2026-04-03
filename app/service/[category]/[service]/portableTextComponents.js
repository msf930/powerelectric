export function getPortableTextComponents(styles) {
  return {
    block: {
      normal: ({ children }) => <p className={`${styles.portableTextBlock} ${styles.portableTextP}`}>{children}</p>,
      h1: ({ children }) => <h1 className={`${styles.portableTextBlock} ${styles.portableTextH1}`}>{children}</h1>,
      h2: ({ children }) => <h2 className={`${styles.portableTextBlock} ${styles.portableTextH2}`}>{children}</h2>,
      h3: ({ children }) => <h3 className={`${styles.portableTextBlock} ${styles.portableTextH3}`}>{children}</h3>,
      h4: ({ children }) => <h4 className={`${styles.portableTextBlock} ${styles.portableTextH4}`}>{children}</h4>,
    },
    list: {
      bullet: ({ children }) => <ul className={styles.portableTextUl}>{children}</ul>,
      number: ({ children }) => <ol className={styles.portableTextOl}>{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li className={styles.portableTextLi}>{children}</li>,
      number: ({ children }) => <li className={styles.portableTextLi}>{children}</li>,
    },
    marks: {
      strong: ({ children }) => <strong className={styles.portableTextStrong}>{children}</strong>,
      em: ({ children }) => <em className={styles.portableTextEm}>{children}</em>,
      link: ({ children, value }) => <a href={value?.href} className={styles.portableTextLink} target="_blank" rel="noopener noreferrer">{children}</a>,
    },
  };
}
