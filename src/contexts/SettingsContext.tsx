import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type FontSize = 'small' | 'medium' | 'large';
type IconSize = 'small' | 'medium' | 'large';
type Theme = 'light' | 'dark' | 'colorblind';
type Language = 'english' | 'urdu';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

interface SettingsContextType {
  fontSize: FontSize;
  iconSize: IconSize;
  theme: Theme;
  language: Language;
  userProfile: UserProfile;
  setFontSize: (size: FontSize) => void;
  setIconSize: (size: IconSize) => void;
  setTheme: (theme: Theme) => void;
  setLanguage: (lang: Language) => void;
  setUserProfile: (profile: UserProfile) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [iconSize, setIconSize] = useState<IconSize>('medium');
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('english');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
  });

  // Apply font size to root element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-small', 'font-medium', 'font-large');
    root.classList.add(`font-${fontSize}`);
  }, [fontSize]);

  // Apply icon size to root element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('icon-small', 'icon-medium', 'icon-large');
    root.classList.add(`icon-${iconSize}`);
  }, [iconSize]);

  // Apply theme to root element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark', 'theme-colorblind');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <SettingsContext.Provider
      value={{
        fontSize,
        iconSize,
        theme,
        language,
        userProfile,
        setFontSize,
        setIconSize,
        setTheme,
        setLanguage,
        setUserProfile,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}