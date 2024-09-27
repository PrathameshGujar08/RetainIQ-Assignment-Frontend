import React from 'react'
import styles from './sidebar.module.css'
import Image from 'next/image'
import { RxLightningBolt } from "react-icons/rx";
import { FaMeta } from "react-icons/fa6";
import { RiTShirt2Line } from "react-icons/ri";
import { LuSettings } from "react-icons/lu";
import { CgDesktop } from "react-icons/cg";
import { IoImageOutline } from "react-icons/io5";

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <Image src={'/images/RetainIQ-logo.png'} alt="logo" width={50} height={40} />
            <div className={styles.optionsDiv}>
                <RxLightningBolt size={28} />
                <IoImageOutline size={28} />
                <FaMeta size={26} />
                <RiTShirt2Line size={28} />
            </div>
            <div className={styles.settings}>
                <CgDesktop size={28} />
                <LuSettings size={28} />
            </div>
        </div>
    )
}

export default Sidebar