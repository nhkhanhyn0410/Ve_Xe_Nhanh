import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import CustomerLoginPage from './pages/auth/CustomerLoginPage';
import CustomerRegisterPage from './pages/auth/CustomerRegisterPage';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <Routes>
        {/* Home/Landing Page */}
        <Route
          path="/"
          element={
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-center max-w-2xl px-4">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">
                  Vé xe nhanh
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Hệ thống đặt vé xe khách trực tuyến
                </p>
                <div className="flex gap-4 justify-center">
                  <a
                    href="/login"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Đăng nhập
                  </a>
                  <a
                    href="/register"
                    className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition"
                  >
                    Đăng ký
                  </a>
                </div>
              </div>
            </div>
          }
        />

        {/* Customer Auth Routes */}
        <Route path="/login" element={<CustomerLoginPage />} />
        <Route path="/register" element={<CustomerRegisterPage />} />

        {/* 404 Not Found */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen bg-gray-50">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="text-gray-600 mt-4">Trang không tồn tại</p>
                <a href="/" className="text-blue-600 hover:underline mt-2 inline-block">
                  Về trang chủ
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App
