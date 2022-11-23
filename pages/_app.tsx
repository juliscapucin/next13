import type { AppProps } from 'next/app'
import { ScrollProvider } from '../context/scrollContext'

function MyApp({ Component, pageProps }: AppProps) {
  return 
  <ScrollProvider>
    <Component {...pageProps} />
  </ScrollProvider>
}

export default MyApp
