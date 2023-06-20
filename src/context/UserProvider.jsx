import React, { useContext, useState } from "react";

const userContext = React.createContext();

export function useUserContext() {
  return useContext(userContext);
}

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
