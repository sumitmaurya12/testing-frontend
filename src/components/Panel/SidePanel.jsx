import React from 'react'
import styles from './sidepanel.module.css'
import useDataContext from '../../hooks/useDataContext'
const SidePanel = () => {
  const {selectedMenu, setSelectedMenu} = useDataContext();
  return (
    <div className={styles.main__sidepanel}>
        <button className={styles.control__button}
        onClick={()=>setSelectedMenu("gsk")}
        style={{backgroundColor : selectedMenu ==="gsk" ? "#DEE2FD":"white"}}
        >
        GSK
        </button>
        <button className={styles.control__button}
        onClick={()=>setSelectedMenu("rev")}
        style={{backgroundColor: selectedMenu ==="rev" ? "#DEE2FD":"white"}}
        >
        REV
        </button>
    </div>
  )
}

export default SidePanel