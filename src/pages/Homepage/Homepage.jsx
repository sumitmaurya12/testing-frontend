import React from 'react'
import styles from './homepage.module.css'
import Navbar from '../../components/Navbar/Navbar'
import DataProcessing from '../../components/DataProcessing/DataProcessing'
import SidePanel from '../../components/Panel/SidePanel'
import useDataContext from '../../hooks/useDataContext'
import Rev from '../../components/Rev/Rev'

const Homepage = () => {
  const {selectedMenu} = useDataContext();
  
  return (
    <div className={styles.main__homepage}>
      <Navbar/>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <SidePanel/>
        {selectedMenu === "gsk" && <DataProcessing/>}
        {selectedMenu === "rev" && <Rev/>}
      </div>
    </div>
  )
}

export default Homepage