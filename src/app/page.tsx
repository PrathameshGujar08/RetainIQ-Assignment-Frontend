'use client'
import styles from "./page.module.css";
import Sidebar from "./components/Sidebar/Sidebar";
import ContentArea from "./components/ContentArea/ContentArea";

export default function Home() {
  return (
    <div className={styles.page}>
      <Sidebar />
      <ContentArea />
    </div>
  )
}
