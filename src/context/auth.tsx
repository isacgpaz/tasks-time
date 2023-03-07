import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { User } from "../ts/user";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextProps = {
  user: null | User;
  isAuthenticated: boolean;
  signIn: (user: User) => void;
  isLoading: boolean;
};

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const storagedUser = localStorage.getItem("@taskstime:user");

  useEffect(() => {
    if (storagedUser) {
      setUser(JSON.parse(storagedUser));
    }
    setIsLoading(false);
  }, [storagedUser]);

  function signIn({ categories, name }: User) {
    setUser({
      name,
      categories,
    });

    localStorage.setItem(
      "@taskstime:user",
      JSON.stringify({
        name,
        categories,
      })
    );
  }

  const authContextValues = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      signIn,
      isLoading,
    }),
    [user, isLoading]
  );

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context) {
    return context;
  }

  throw new Error("useAuth must be used within a AuthProvider");
}
