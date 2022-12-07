import { Container } from '@mantine/core'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import LoginPage from './Components/Logins/LoginPage'
import RegisterPage from './Components/Registers/RegisterPage'
import UserNewPerm from './Components/XinPhep/User/UserNewPerm'
import { staticLinkPaths } from './data/staticPaths'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [papers, setPapers] = useLocalStorage<AskPermissionForm[]>("PAPERS", [])
  const isAdmin = true;
  const isLogin = true;

  const homeRoute = (<Route path={staticLinkPaths.home} element={<h1>Home</h1>} />)
  const loginRoute = (< Route path='login' />);
  const registerRoute = (< Route path='register' />);

  const loginedRoute = () => {
    return (
      <Container>
        <Routes>
          {homeRoute}

          <Route path={staticLinkPaths.xinphep} element={<Outlet />}>
            <Route index element={<h1>View</h1>} />
            <Route path="new" element={<UserNewPerm />} />
            <Route path=":id" element={<h1>Edit</h1>} />

            {isAdmin && (
              <>
                <Route path='admin' element={<Outlet />}>
                  <Route index />
                  <Route path=":id" />
                </Route>
              </>
            )}
          </Route>

          <Route path={staticLinkPaths.thongbao} element={<Outlet />}>
            <Route index />

            {isAdmin && (
              <>
                <Route path='admin' element={<Outlet />}>
                  <Route index />
                  <Route path=":id" />
                  <Route path="new" />
                </Route>
              </>
            )}
          </Route>

          <Route path={staticLinkPaths.user} element={<Outlet />}>
            <Route index />
            {loginRoute}
            {registerRoute}
          </Route>

          <Route path='*' element={<Navigate to={staticLinkPaths.home} />} />
        </Routes>
      </Container >

    )
  }

  const notLoginRoute = () => {
    return (
      <Routes>
        {homeRoute}
        <Route path={staticLinkPaths.user} element={<Outlet />}>
          {loginRoute}
          {registerRoute}
        </Route>

        <Route path='*' element={<Navigate to={staticLinkPaths.home} />} />
      </Routes>
    )

  }

  return isLogin ? loginedRoute() : notLoginRoute()
}

export default App
