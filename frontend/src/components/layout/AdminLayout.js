import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

const AdminLayout = () => {
  return (
    <DashboardLayout activeTab="Admin Panel">
      <Outlet />
    </DashboardLayout>
  );
};

export default AdminLayout;
