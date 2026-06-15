import styles from "./styles.module.css";
import StatCounter from "../StatCounter";

export default function StatCont({ stats = [] }) {
  if (!stats.length) return null;

  return (
    <div className={styles.statCont}>
      <div className={styles.statContInner}>
        <div className={styles.statContInnerBg} aria-hidden />
        <div className={styles.statContInnerContent}>
          {stats.map((stat) => (
            <div key={stat._id} className={styles.statContItem}>
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
