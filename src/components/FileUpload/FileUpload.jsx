import React, { useState } from "react";
import styles from "./fileupload.module.css";
import useDataContext from "../../hooks/useDataContext";
import axios from "axios";
import toast,{ Toaster} from "react-hot-toast";
const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const {setData,setCounter} = useDataContext();
  const [showDownload, setShowDownload] = useState(false);
  const [uploadingText,setUploadingText] = useState("");
  const [directoryName,setDirectoryName] = useState("");
  const [errorData,setErrorData] = useState();
  
  let fileNames;
  const handleDirectoryName =(e)=>{
    setDirectoryName(e.target.value);
  }
  

  const handleUpload = async () => {
    if(!directoryName.trim()){
      toast("Please enter directory to proceed further",{
        icon: '⚠',
      });
      return;
    }
    if (!selectedFiles) {
      toast("Please select atleast one file",{
        icon: '⚠',
      });
      return;
    }
    setData(null);
    setShowDownload(false);
    // eslint-disable-next-line no-lone-blocks
    {selectedFiles.length > 0 && setUploadingText("Uploading...")}

     const fileArray = Array.from(selectedFiles);
     // Extract file names from the array
     fileNames = fileArray.map(file => file.name);
     
     fileNames = fileArray.map(file => {
      const parts = file.name.split('.');
      const fileNameWithoutExtension = parts.slice(0, -1).join('.');
      const extension = parts[parts.length - 1];
      const randomDigits = Math.floor(Math.random() * 90000) + 10000;
      const modifiedFileName = `${fileNameWithoutExtension}-${randomDigits}.${extension}`;
      return modifiedFileName;
  });
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/get-signed-url`,
        fileNames
      );
      const signedUrls = response?.data?.signedUrls;

      if(response.status === 201){
        await uploadFilesWithSignedUrls(signedUrls);
      } 
    } catch (error) {
      toast.error("Somthing went wrong. Please try again")
      console.log("Error in post request", error);
      setUploadingText("Somthing went wrong");
    }
  };

  const uploadFilesWithSignedUrls = async (signedUrls) => {
    try {
      const uploadPromises = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        
        const signedUrl = signedUrls[i];
        const uploadPromise = await fetch(
          signedUrl,
          {
            method:'PUT',
            body:file,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "content-type": 'application/octet-stream'
            }
          }
        )
        uploadPromises.push(uploadPromise);
      }
      await Promise.all(uploadPromises);
      setUploadingText("Processing the pdf...")

      // Call backend to start processing
    await startBackendProcessing();
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    }
  }

  
const startBackendProcessing = async () => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/start-processing`,
      {fileNames,directoryName}
    );
    console.log(fileNames,directoryName);
    console.log(response);
    if(response.status === 201){
      setShowDownload(true);
      setUploadingText("");
      setData(response?.data?.data[0]);
      setCounter(response?.data?.counter);
      setErrorData(response?.data?.errorData);
    }
  } catch (error) {
    toast.error("Somthing went wrong. Please try again")
    console.log("Error in post request", error);
    setUploadingText("Somthing went wrong");
  }
}
  const handleDownload = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/export`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "receipt.txt");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong. Please try again")
    }
  };
  return (
    <div className={styles.main__fileupload}>
      <div className={styles.form__container}>
        <span className={styles.heading}>Document Processing</span>
        <div className={styles.input__container}>
        <input type="text"
        placeholder="Enter Directory" 
        className={styles.input_directory}
        value={directoryName}
        onChange={handleDirectoryName}
        />
          <span className={styles.input__header}>File Upload</span>
          <input
            onChange={(e) => {
              setSelectedFiles(e.target.files);
            }}
            className={styles.upload__input}
            type="file"
            accept=".pdf"
            multiple
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
        <div className={styles.error_table_container}>
          <label className={styles.input__header}> Error/Exception</label>
          {errorData && errorData.length > 0 &&(<table>
            <thead>
              <th>Directory</th>
              <th>File Name</th>
              <th>Error</th>
            </thead>
            <tbody>
              {errorData?.map((item,index)=>(
                <tr key={index}>
                  <td>{item.directory}</td>
                  <td>{item.filename}</td>
                  <td>{item.error}</td>
                </tr>
              ))}
            </tbody>
          </table>)}
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default FileUpload;
