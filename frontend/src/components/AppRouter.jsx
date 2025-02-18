import { BrowserRouter, Routes, Route } from 'react-router';
import { AppNav } from './AppNav';
import App from '../App';
import Accounts from '../pages/Accounts';
import Vendors from '../pages/Vendors';

export function AppRouter() {
  return (
    <BrowserRouter>
      <div className="container">
        <AppNav />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/vendors" element={<Vendors />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
