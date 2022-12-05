import { Container } from '@mantine/core'
import { useState } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import AskPermissionForm from './Components/AskPermissionForm'
import NewPermission from './Components/NewPerm/NewPermission'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [papers, setPapers] = useLocalStorage<AskPermissionForm[]>("PAPERS", [])


  return (
    <Container>
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='/xinphep' element={<Outlet />}>
          <Route index element={<h1>Phieu Xin Phep</h1>} />
          <Route path=':id' element={<h1>Xem Xin Phep</h1>} />
        </Route>

        <Route path='/xinphepmoi' element={<NewPermission setPapers={setPapers} />} />

        <Route path='/user' element={<Outlet />} >
          <Route index element={<h1>View User</h1>} />
          <Route path='register' element={<h1>Register</h1>} />
          <Route path='login' element={<h1>Login</h1>} />
        </Route>

        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
