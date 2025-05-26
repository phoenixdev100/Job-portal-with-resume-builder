import React, { createContext, useState, useContext, useEffect } from 'react';

const AccessibilityContext = createContext(null);

export const AccessibilityProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('accessibilitySettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      highContrast: false,
      fontSize: 'medium',
      reducedMotion: false,
      screenReader: false
    };
  });

  useEffect(() => {
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    
    // Apply settings to document
    document.documentElement.style.fontSize = getFontSize(settings.fontSize);
    if (settings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [settings]);

  const getFontSize = (size) => {
    const sizes = {
      small: '14px',
      medium: '16px',
      large: '18px',
      'extra-large': '20px'
    };
    return sizes[size] || sizes.medium;
  };

  const updateSettings = (newSettings) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSettings
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export default AccessibilityContext;
