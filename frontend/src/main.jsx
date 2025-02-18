import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Vendors from './pages/Vendors';
import Accounts from './pages/Accounts';
import { AppRouter } from './components/AppRouter';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/vendors" element={<Vendors />} />
        </Routes>
      </BrowserRouter> */}
      <AppRouter />
    </QueryClientProvider>
  </StrictMode>
);
