export function getPortableTextComponentsCopy(styles2) {
  return {
    block: {
      normal: ({ children }) => <p className={`${styles2.portableTextBlock} ${styles2.portableTextP}`}>{children}</p>,
      h1: ({ children }) => <h1 className={`${styles2.portableTextBlock} ${styles2.portableTextH1}`}>{children}</h1>,
      h2: ({ children }) => <h2 className={`${styles2.portableTextBlock} ${styles2.portableTextH2}`}>{children}</h2>,
      h3: ({ children }) => <h3 className={`${styles2.portableTextBlock} ${styles2.portableTextH3}`}>{children}</h3>,
      h4: ({ children }) => <h4 className={`${styles2.portableTextBlock} ${styles2.portableTextH4}`}>{children}</h4>,
    },
    list: {
      bullet: ({ children }) => <ul className={styles2.portableTextUl}>{children}</ul>,
      number: ({ children }) => <ol className={styles2.portableTextOl}>{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li className={styles2.portableTextLi}>{children}</li>,
      number: ({ children }) => <li className={styles2.portableTextLi}>{children}</li>,
    },
    marks: {
      strong: ({ children }) => <strong className={styles2.portableTextStrong}>{children}</strong>,
      em: ({ children }) => <em className={styles2.portableTextEm}>{children}</em>,
      link: ({ children, value }) => <a href={value?.href} className={styles2.portableTextLink} target="_blank" rel="noopener noreferrer">{children}</a>,
    },
  };
}
