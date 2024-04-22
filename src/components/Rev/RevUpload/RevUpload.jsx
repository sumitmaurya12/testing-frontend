import React, { useState } from 'react'
import styles from './revupload.module.css'
import axios from 'axios';
import toast,{ Toaster} from "react-hot-toast";
const RevUpload = () => {
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [showDownload, setShowDownload] = useState(false);
    const [uploadingText,setUploadingText] = useState("");
  const handleUpload =async()=>{
    setShowDownload(false);
    if (!selectedFiles) {
        toast.error("Please select atleast one file");
        return;
      }
      const fd = new FormData();
      // eslint-disable-next-line no-lone-blocks
      {selectedFiles && setUploadingText("Processing Pdf...")}
      fd.append('file', selectedFiles);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/v1/upload-rev`,
          fd
        );
        console.log(response);
        if(response.status === 201){
          setShowDownload(true);
        }
      } catch (error) {
        console.log("Error in post request", error);
        toast.error("Somthing went wrong. Please try again")
        setUploadingText("Somthing went wrong. Please try again")
      }
  }

  const handleDownload = async()=>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/export-rev`, {
          responseType: "blob",
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "masked_document.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        if(response.status === 404){
            toast("Somthing went wrong please try again");
        }
      } catch (error) {
        console.log(error);
        toast("Somthing went wrong please try again");
      }
  }
  return (
    <div className={styles.main__fileupload}>
      <div className={styles.form__container}>
        <span className={styles.heading}>REV</span>
        <div className={styles.input__container}>
          <span className={styles.input__header}>File Upload</span>
          <input
            onChange={(e) => {
              setSelectedFiles(e.target.files[0]);
            }}
            className={styles.upload__input}
            type="file"
          />
          <label className={styles.input__label}>NOTE: For Pdf file Make sure</label>
          <label className={styles.input__label}>The text is OCRd, i.e. you can copy it</label>
        </div>
        <div className={styles.button__container}>
          <button className={styles.hero__button}
          onClick={handleUpload} 
          >
            Upload
            </button>
        </div>
        <div className={styles.button__container}>
          {showDownload && (<button className={styles.hero__button}
          onClick={handleDownload}
          >Download</button>)}
          {!showDownload && (<div 
          onClick={handleDownload}
          >{uploadingText}</div>)}
        </div>
      </div>
      <Toaster/>
    </div>
  )
}

export default RevUpload