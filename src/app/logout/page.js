"use client"
import { useRouter } from 'next/navigation';
import { useUser } from '../context/User';
import removeCookie from '@/lib/removeCookie';

export default function Page() {
  const router = useRouter();
  const {user, setUser } = useUser();

  const handleLogout = () => {
    removeCookie('id');
    setUser(null);
    router.push('/home'); // Redirect to login page or home page
  };

  return (
    <div>
        <h1>{user?.email}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
