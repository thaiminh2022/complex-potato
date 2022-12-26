import { Button, Container } from '@mantine/core'

import { Link, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import LoginPage from './Components/Logins/LoginPage';
import RegisterPage from './Components/Registers/RegisterPage';
import UserEditPerm from './Components/XinPhep/User/UserEditPerm';
import UserNewPerm from './Components/XinPhep/User/UserNewPerm';
import UserViewPerms from './Components/XinPhep/User/UserViewPerms';
import { staticLinkPaths } from './data/staticPaths';
import { LogoutAccount } from './Helper/firebaseHelper';
import { useUserData } from './Helper/hooks/useUserData';
import AppShellWrapper from './Components/Navigations/AppShellWrapper';
import SignOut from './Components/Public/SignOut';
import AdminPermissionHandle from './Components/XinPhep/Admin/AdminPermissionHandle';

function App() {
  const { userData } = useUserData();
  const isAdmin = true;
  const isLogin = (userData != null) ? true : false;

  const homeRoute = (<Route path={staticLinkPaths.home} element={
    <>
      <h1>Home</h1>
      <button onClick={() => console.log(userData)}>Print User Data</button>
      <button onClick={async () => {
        await LogoutAccount();
      }}>Sign out</button>

    </>

  } />)
  const loginRoute = (< Route path='login' element={<LoginPage />} />);
  const registerRoute = (< Route path='register' element={<RegisterPage />} />);
  const thongbaoIndexRoute = (<Route index />)

  const authenticatedRoutes = (
    <>

      <Route path={staticLinkPaths.xinphep} element={<Outlet />}>
        <Route index element={<UserViewPerms />} />
        <Route path="new" element={<UserNewPerm />} />
        <Route path=":id" element={<UserEditPerm />} />

        {isAdmin && (
          <>
            <Route path='admin' element={<Outlet />}>
              <Route index element={<AdminPermissionHandle />} />
              <Route path=":id" />
            </Route>
          </>
        )}
      </Route>

      <Route path={staticLinkPaths.thongbao} element={<Outlet />}>
        {thongbaoIndexRoute}

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

    </>
  )

  const unAuthenticatedRoutes = (
    <>
      <Route path={staticLinkPaths.user} element={<Outlet />}>
        <Route index />
        {loginRoute}
        {registerRoute}
      </Route>

      <Route path={staticLinkPaths.thongbao} element={<Outlet />}>
        {thongbaoIndexRoute}
      </Route>
    </>
  )

  return (
    <Routes>
      <Route path='/' element={<AppShellWrapper />}>
        {homeRoute}
        {isLogin ? authenticatedRoutes : unAuthenticatedRoutes}
        <Route path={staticLinkPaths.signOut} element={<SignOut />} />
      </Route>
      <Route path='*' element={<Navigate to={staticLinkPaths.home} />} />

    </Routes>

  )
}


export default App
