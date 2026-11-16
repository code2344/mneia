import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  AuthContext,
  type User,
} from "./auth-context-value";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function refreshUser() {
    try {
      if (
        import.meta.env.DEV &&
        import.meta.env.VITE_DEV_AUTH_BYPASS === "true"
      ) {
        setUser({
          id: "dev-user",
          firstName: "Ruben",
          email: "ruben@example.com",
        });
        setIsLoading(false);
        return;
      }
      const apiUrl = import.meta.env.VITE_API_URL;
      
      const response = await fetch(`${apiUrl}/auth/me`, {
        credentials: "include",
      });

      if (response.status === 401) {
        setUser(null);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to load authenticated user");
      }

      const data = await response.json();
      setUser(data.user);
    } finally {
      setIsLoading(false);
    }
  }
  
  async function logout() {
    const apiUrl = import.meta.env.VITE_API_URL;
  
    const response = await fetch(`${apiUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    console.log("Logout response:", response.status, await response.text());
  
    if (!response.ok) {
      throw new Error("Failed to log out");
    }
  
    setUser(null);
  }

  useEffect(() => {
    void refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}