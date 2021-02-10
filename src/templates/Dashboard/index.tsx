import { ReactComponent as Logo } from "assets/logo.svg";
import SideNav from "./Sidebar";
import styles from "./styles.module.css";

interface Props {
  Footer?: React.ReactNode;
  Body: React.ReactNode;
  Sidebar: React.ReactNode;
}

export default function DashboardTemplate({ Footer, Body, Sidebar }: Props) {
  return (
    <main className={styles.bitbook}>
      <header className={styles.header}>
        <Logo width={32} height={32} fill="#FF9900" />
        itbook
      </header>
      <SideNav>{Sidebar}</SideNav>

      <section className={styles.body}>{Body}</section>

      {Footer && <footer className={styles.footer}>{Footer}</footer>}
    </main>
  );
}
