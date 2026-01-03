import React from 'react'
import AppRouter from './routes/AppRouter'
import { AuthProvider } from "./contextos/AuthContexto"
const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>

  )
}

export default App
