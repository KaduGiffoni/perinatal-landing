import { createContext, useContext, useState } from "react";

type SceneState = {
  theme: string;

  setTheme: (theme: string) => void;
};

const SceneContext = createContext<SceneState | null>(null);

export function SceneProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("intro");

  return (
    <SceneContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  const context = useContext(SceneContext);

  if (!context) {
    throw new Error("useScene must be used inside SceneProvider");
  }

  return context;
}
