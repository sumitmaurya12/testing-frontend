import React, { useEffect } from 'react'
import styles from './dataprocessing.module.css'
import FileUpload from '../FileUpload/FileUpload'
import DataTable from '../DataTable/DataTable'
import axios from 'axios'
import useDataContext from '../../hooks/useDataContext'

const DataProcessing = () => {
  const {setCounter} = useDataContext();
  useEffect(()=>{
    fetchCounter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const fetchCounter = async()=>{
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/counter`,
      );
      const counter = response?.data?.counter;
      setCounter(counter);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={styles.main__hero}>
        <FileUpload/>
        <DataTable/>
    </div>
  )
}

export default DataProcessing