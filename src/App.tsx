import { Outlet } from 'react-router-dom'
import './App.scss'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import { Dispatch, SetStateAction, Suspense, useState } from 'react';
import 'aos/dist/aos.css';
import Loader from './components/loader/Loader';

export interface IContext {
  token: string | null,
  setToken: Dispatch<SetStateAction<string | null>>
}

function App() {
  const logined: string | null = localStorage.getItem("token"); //???????
  const [token, setToken] = useState<string | null>(logined);


  return (
    <>
      <Header token={token} />
      <Suspense fallback={<Loader />}>
        <Outlet context={{ token, setToken } satisfies IContext} />
      </Suspense>
      <Footer />
    </>
  )
}

export default App
