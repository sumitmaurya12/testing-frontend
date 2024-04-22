import React from "react";
import styles from "./datatable.module.css";
import useDataContext from "../../hooks/useDataContext";
const DataTable = () => {
  const { data, counter } = useDataContext();
  const keys = [
    { key: "trackingnumber", value: "Tracking Number" },
    { key: "receivedby", value: "ReceivedBy" },
    { key: "receivedbprofdesignation", value: "Received By Prof Designation" },
    { key: "signaturedate", value: "Signature Date" },
    { key: "fax_date", value: "Fax Date" },
    { key: "productcode", value: "Product Code" },
    { key: "productname", value: "Product Name" },
    { key: "lotnumber", value: "Lot Number" },
    { key: "qty", value: "Qty" },
    { key: "shipmentnumber", value: "Shipment Number" },
    { key: "handwriting", value: "Handwriting" },
    { key: "file_name", value: "File Name" },
  ];

  return (
    <div className={styles.main__datatable}>
      <div className={styles.counter__main}>Counter:{counter}</div>
      <div className={styles.table__container}>
        <label className={styles.table__heading}>Analysis</label>
        <table>
          <thead>
            <tr>
              <th>HEADER</th>
              <th>VALUE</th>
            </tr>
          </thead>
          <tbody>
            {keys?.map((item, index) => (
              <tr key={index}>
                <td>{item.value}</td>
                <td>
                  {data
                    ? Array.isArray(data[item.key])
                      ? data[item.key].join(", ")
                      : data[item.key]
                    : data&&"NA"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
