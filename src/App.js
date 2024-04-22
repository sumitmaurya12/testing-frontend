import './App.css';
import Homepage from './pages/Homepage/Homepage';
import { Provider } from './context/DataContext';
function App() {
  return (
    <div className="App">
      <Provider>
      <Homepage/>
      </Provider>
    </div>
  );
}

export default App;
