import React from "react";
import { UserProvider } from "./context/UserContext";
import AppNavigator from "./navigation/AppNavigator";

export default function RootLayout() {
  return (
    <UserProvider>
      <AppNavigator />
    </UserProvider>
  );
}
