import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../hooks/useUser'

export const PrivateRoutes = ({ roles = [] }) => {
  const { user, loading } = useUser();

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}


/*
<PrivateRoutes roles={['admin', 'semiadmin']}>
   routes here
</PrivateRoutes>
*/
