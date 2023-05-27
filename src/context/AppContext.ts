import React from "react";

export const AppContext = React.createContext({
  setIsLoading: (isLoading: boolean) => {},
});
