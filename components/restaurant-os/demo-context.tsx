"use client";

import { createContext, useContext } from "react";

type DemoShellContextValue = {
  presentation: boolean;
  setPresentation: (value: boolean) => void;
};

export const DemoShellContext = createContext<DemoShellContextValue>({
  presentation: false,
  setPresentation: () => {},
});

export function useDemoShell() {
  return useContext(DemoShellContext);
}
