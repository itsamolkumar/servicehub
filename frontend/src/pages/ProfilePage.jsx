import { useUser } from '../UserContext';

export default function ProfilePage() {
  const { user } = useUser();
  if (!user) return <div className="p-8">Please login to view your profile.</div>;
  return (
    <div className="max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      <div className="mb-2">Name: <span className="font-semibold">{user.name}</span></div>
      <div className="mb-2">Email: {user.email}</div>
      <div className="mb-2">Role: {user.role}</div>
      <div className="mb-2">Mobile: {user.mobile || 'N/A'}</div>
      <div className="mb-2">Address: {user.address || 'N/A'}</div>
    </div>
  );
}
