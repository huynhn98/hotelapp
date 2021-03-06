import 'bootstrap/dist/css/bootstrap.css'
import '../styles/global.sass'
import header from "../components/header"

import {useEffect} from 'react'

function MyApp({ Component, pageProps }) {


  useEffect(()=>{
    import ('bootstrap/dist/js/bootstrap');
  }, [])


  return <Component {...pageProps} />
}

export default MyApp
