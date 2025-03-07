import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { config, getCurrentUser } from "@/lib/appwrite"; // Ensure correct path
import { Models } from "react-native-appwrite";

// Define the structure of the user document returned by Appwrite
interface User {
  account_id: string;
  email: string;
  username: string;
  avatar: string;
  // Add any other properties from the document here
}

// Define the context's type
interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null; // Use the User type here
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with the correct type or undefined if no provider is used
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Create a custom hook to use the global context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

// Define the props for the GlobalProvider component, including children
interface GlobalProviderProps {
  children: ReactNode;
}

// Define the GlobalProvider component
const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null); // Change to User type
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the current user in useEffect
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
