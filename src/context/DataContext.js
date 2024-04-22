const { createContext, useState } = require("react");

const DataContext = createContext();

const Provider = ({ children }) => {
 const [data,setData] = useState();
 const [selectedMenu,setSelectedMenu] = useState("gsk");
 const [counter,setCounter] = useState();
 const value ={
  data,
  setData,
  selectedMenu,
  setSelectedMenu,
  counter,
  setCounter
}

  return (
    <DataContext.Provider value={value}>{children}</DataContext.Provider>
  );
};
export { Provider };
export default DataContext;  