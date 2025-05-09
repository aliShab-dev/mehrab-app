'use client';

import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

export type PaletteType = 'light-green' | 'green' | 'blue';

interface ThemeContextType {
  palette: PaletteType;
  setPalette: Dispatch<SetStateAction<PaletteType>>;
}

// Create the context
export const ThemeContext = createContext<ThemeContextType | null>(null);


export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [palette, setPalette] = useState<PaletteType>('light-green');

  return (
    <ThemeContext value={{ palette, setPalette }}>
      {children}
    </ThemeContext>
  );
};