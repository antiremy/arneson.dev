"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PageDataContextType {
  title: string;
  setTitle: (title: string) => void;
}

const PageDataContext = createContext<PageDataContextType | undefined>(
  undefined,
);

export function PageDataProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState("");
  return (
    <PageDataContext.Provider value={{ title, setTitle }}>
      {children}
    </PageDataContext.Provider>
  );
}

export function usePageData() {
  const context = useContext(PageDataContext);
  if (context === undefined) {
    throw new Error("usePageData must be used within a PageDataProvider");
  }
  return context;
}
