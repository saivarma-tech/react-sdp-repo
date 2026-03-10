import { BrowserRouter} from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainNavBar from './pages/MainNavBar';
import AdminNavBar from './admin/AdminNavBar';
import ManagerNavBar from './manager/ManagerNavBar';
import CustomerNavBar from './customer/CustomerNavBar';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);

  useEffect(() => {
    // Initialize admin credentials in sessionStorage on app startup
    if (!sessionStorage.getItem('adminCredentials')) {
      sessionStorage.setItem('adminCredentials', JSON.stringify({
        username: 'admin',
        password: 'admin'
      }));
    }

    // Check sessionStorage for user role
    const adminStatus = sessionStorage.getItem('isAdmin') === 'true';
    const managerStatus = sessionStorage.getItem('isManager') === 'true';
    const customerStatus = sessionStorage.getItem('isCustomer') === 'true';

    setIsAdmin(adminStatus);
    setIsManager(managerStatus);
    setIsCustomer(customerStatus);
  }, []);

  // Listen for storage changes to update user role in real-time
  useEffect(() => {
    const handleStorageChange = () => {
      const adminStatus = sessionStorage.getItem('isAdmin') === 'true';
      const managerStatus = sessionStorage.getItem('isManager') === 'true';
      const customerStatus = sessionStorage.getItem('isCustomer') === 'true';

      setIsAdmin(adminStatus);
      setIsManager(managerStatus);
      setIsCustomer(customerStatus);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
     <BrowserRouter>
         {isAdmin && <AdminNavBar/>}
         {isManager && <ManagerNavBar/>}
         {isCustomer && <CustomerNavBar/>}
         {!isAdmin && !isManager && !isCustomer && <MainNavBar/>}
     </BrowserRouter>
  );
}

export default App;