import './App.scss';
import { useAuthContext } from './contexts/AuthContext';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
// import Sidebar from './components/Sidebar';
// import Calendar from './pages/Frontend/AllPages/Calendar'
import Routes from './pages/Routes'

function App() {
  const { isAppLoading } = useAuthContext()

  if (isAppLoading)
    return (
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  return (
    <div className='example'> 
      <Routes />
    </div>
  );
}

export default App;
