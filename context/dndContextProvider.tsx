"use client"
import React, { createContext, FC, ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const DndContext = createContext({});

interface DndContextProviderProps {
  children: ReactNode;
}

export const DndContextProvider: FC<DndContextProviderProps> = ({ children }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DndContext.Provider value={{}}>
        {children}
      </DndContext.Provider>
    </DndProvider>
  );
};
