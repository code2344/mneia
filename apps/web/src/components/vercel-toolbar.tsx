import { useAuth } from '@/auth/use-auth';
import { useEffect } from 'react';

export default function VercelToolbarGated() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    const allowedUserIds = (import.meta.env.VITE_VERCEL_TOOLBAR_USER_IDS ?? "")
      .split(",")
      .map((id: string) => id.trim())
      .filter(Boolean);
    
    if (!user || !allowedUserIds.includes(user.id)) {
      return;
    }

    void import("@vercel/toolbar/vite").then(({ mountVercelToolbar }) => {
      mountVercelToolbar();
    });
  }, [user, isLoading]);

  return null;
}