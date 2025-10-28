import './App.css';
import Navbar from './components/navbar';
import AppRoutes from './components/appRoutes'
import MendoraFooter from './components/footer';


function App() {
  return (
    <>
      <Navbar />
      <div className="pt-16 m-9 mb-0">
        <AppRoutes />
      </div>
      <MendoraFooter/>
    </>
  );
}

export default App;
