import { useUser } from './UserContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, role }) {
  const { user } = useUser();
  if (!user) return <Navigate to="/auth" />;
  if (role && user.role !== role) return <div className="p-8 text-red-600">Access denied: {role} only</div>;
  return children;
}
