import styles from "./styles.module.css";

export enum StatusSignal {
  Info,
  Good,
  Error,
}

interface FooterProps {
  message: string;
  status: StatusSignal;
}

export default function Footer() {
  return (
    <section className={styles.footer}>
      <div className={styles.status}></div>
      <div>I am a footer</div>
    </section>
  );
}
