import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';

const AccessibilityMenu = () => {
  const { settings, updateSettings } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleFontSizeChange = (direction) => {
    const currentSize = parseInt(settings.fontSize) || 16;
    const newSize = direction === 'increase' ? currentSize + 2 : currentSize - 2;
    if (newSize >= 12 && newSize <= 24) {
      updateSettings({ ...settings, fontSize: newSize });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Accessibility options"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="accessibility-menu"
        >
          {/* Theme Options */}
          <div className="py-1" role="none">
            <div className="px-4 py-2">
              <p className="text-sm font-medium text-gray-900">Theme</p>
              <div className="mt-2 space-y-2">
                <button
                  className={`w-full flex items-center px-4 py-2 text-sm text-gray-700 ${
                    settings.theme === 'light'
                      ? 'bg-gray-100 text-gray-900'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => updateSettings({ ...settings, theme: 'light' })}
                  role="menuitem"
                >
                  <svg
                    className="mr-3 h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  Light Mode
                </button>
                <button
                  className={`w-full flex items-center px-4 py-2 text-sm text-gray-700 ${
                    settings.theme === 'dark'
                      ? 'bg-gray-100 text-gray-900'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => updateSettings({ ...settings, theme: 'dark' })}
                  role="menuitem"
                >
                  <svg
                    className="mr-3 h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                  Dark Mode
                </button>
              </div>
            </div>
          </div>

          {/* Font Size Controls */}
          <div className="py-1" role="none">
            <div className="px-4 py-2">
              <p className="text-sm font-medium text-gray-900">Font Size</p>
              <div className="mt-2 flex items-center justify-between">
                <button
                  onClick={() => handleFontSizeChange('decrease')}
                  className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-label="Decrease font size"
                  role="menuitem"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <span className="text-sm text-gray-900">
                  {settings.fontSize || 16}px
                </span>
                <button
                  onClick={() => handleFontSizeChange('increase')}
                  className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-label="Increase font size"
                  role="menuitem"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Contrast Options */}
          <div className="py-1" role="none">
            <div className="px-4 py-2">
              <p className="text-sm font-medium text-gray-900">Contrast</p>
              <div className="mt-2 space-y-2">
                <button
                  className={`w-full flex items-center px-4 py-2 text-sm text-gray-700 ${
                    settings.contrast === 'normal'
                      ? 'bg-gray-100 text-gray-900'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() =>
                    updateSettings({ ...settings, contrast: 'normal' })
                  }
                  role="menuitem"
                >
                  Normal Contrast
                </button>
                <button
                  className={`w-full flex items-center px-4 py-2 text-sm text-gray-700 ${
                    settings.contrast === 'high'
                      ? 'bg-gray-100 text-gray-900'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => updateSettings({ ...settings, contrast: 'high' })}
                  role="menuitem"
                >
                  High Contrast
                </button>
              </div>
            </div>
          </div>

          {/* Motion Preferences */}
          <div className="py-1" role="none">
            <div className="px-4 py-2">
              <p className="text-sm font-medium text-gray-900">Motion</p>
              <div className="mt-2 space-y-2">
                <button
                  className={`w-full flex items-center px-4 py-2 text-sm text-gray-700 ${
                    !settings.reducedMotion
                      ? 'bg-gray-100 text-gray-900'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() =>
                    updateSettings({ ...settings, reducedMotion: false })
                  }
                  role="menuitem"
                >
                  Allow Animations
                </button>
                <button
                  className={`w-full flex items-center px-4 py-2 text-sm text-gray-700 ${
                    settings.reducedMotion
                      ? 'bg-gray-100 text-gray-900'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() =>
                    updateSettings({ ...settings, reducedMotion: true })
                  }
                  role="menuitem"
                >
                  Reduce Motion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityMenu;
