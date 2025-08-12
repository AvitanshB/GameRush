import AsyncStorage from "@react-native-async-storage/async-storage";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [upcomingGames, setUpcomingGames] = useState([]);

  // Fetch token and set state if available
  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const userToken = await AsyncStorage.getItem("token");
      if (userToken) {
        setToken(userToken);

        const decodedToken = jwtDecode(userToken);
        const userId = decodedToken.userId;
        setUserId(userId);
      } else {
        setToken("");
        setUserId("");
      }
      setIsLoading(false);
    } catch (error) {
      console.log("error in isLoggedIn", error);
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setToken("");
      setUserId("");
      setUpcomingGames([]);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  // Load user on app start
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoading,
        setToken,
        userId,
        setUserId,
        upcomingGames,
        setUpcomingGames,
        logout, // Provide logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
