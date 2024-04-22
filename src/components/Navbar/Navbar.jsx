import React from 'react'
import styles from './navbar.module.css'
import LOGO_IMG from '../../assets/images/almo.png'
const Navbar = () => {
  return (
    <div className={styles.main__navbar}>
        <img src={LOGO_IMG}
        className={styles.logo}
        alt='logo'
        style={{height:"5rem"}}
        />
    </div>
  )
}

export default Navbar