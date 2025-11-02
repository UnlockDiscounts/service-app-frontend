import './App.css';
import Navbar from './components/navbar';
import AppRoutes from './components/appRoutes'


function App() {
  return (
    <>
      <Navbar />
      <div className="pt-8 m-9 mb-0">
        <AppRoutes />
      </div>
 
    </>
  );
}

export default App;
