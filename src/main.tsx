import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import React, { ReactNode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { NotificationsProvider } from '@mantine/notifications'

import "./index.css"
import { useLocalStorage } from './Helper/hooks/useLocalStorage'
import { useHotkeys } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
function AppWrapper({ children }: AppWrapperProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>(
    'mantine-color-scheme',
    'light',
  );

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['ctrl+`', () => toggleColorScheme()]]);



  return (
    <>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: colorScheme }}>
          <NotificationsProvider>
            <ModalsProvider>
              <BrowserRouter>
                {children}
              </BrowserRouter>
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

interface AppWrapperProps {
  children: ReactNode | ReactNode[]
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>

    <AppWrapper>
      <App />
    </AppWrapper>

  </React.StrictMode>
)
