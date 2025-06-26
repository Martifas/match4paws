import { useAuth } from '@/lib/authProvider';
import { User } from '@/lib/queries/users';
import { useEffect, useState } from 'react';

export default function useUserProfile() {
  const authUser = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!authUser?.id) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/user/profile');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [authUser?.id]);

  return { user, isLoading };
}
