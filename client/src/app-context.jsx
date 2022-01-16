import React, { createContext, useContext } from 'react';

interface ContextProps {
   payment: void
};

const AppContext = createContext<Partial<{}>>({})

export function AppWrapper() {
   return (

   );
};

export default function useAppContext() {

}