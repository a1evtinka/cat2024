import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainPage from './pages/main-page.tsx'
import ruRU from 'antd/locale/ru_RU';
import CreateEventPage from './pages/create-event-page'
import AboutPage from './pages/about-page/index.tsx'
import projectTheme from './app/style/antdStyle.tsx'
import { ConfigProvider } from 'antd'

const router = createBrowserRouter([
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/create",
        element: <CreateEventPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      }         
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <ConfigProvider
    theme={projectTheme}
    locale={ruRU}
  >
    <RouterProvider router={router} />
  </ConfigProvider>
  </React.StrictMode>,
)
