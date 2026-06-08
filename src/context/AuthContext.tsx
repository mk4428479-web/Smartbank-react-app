import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type User = { name: string; email: string; avatar?: string };
type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<void>;
  signup: (name: string, email: string) => Promise<void>;
  logout: () => void;
};

const AuthCtx = createContext<AuthState>({} as AuthState);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const raw = typeof window !== "undefined" && localStorage.getItem("sb-user");
    if (raw) setUser(JSON.parse(raw));
  }, []);
  const persist = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem("sb-user", JSON.stringify(u));
    else localStorage.removeItem("sb-user");
  };
  return (
    <AuthCtx.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login: async (email) => {
          await new Promise((r) => setTimeout(r, 500));
          persist({ name: email.split("@")[0] || "Alex Morgan", email });
        },
        signup: async (name, email) => {
          await new Promise((r) => setTimeout(r, 500));
          persist({ name, email });
        },
        logout: () => persist(null),
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}
export const useAuth = () => useContext(AuthCtx);
