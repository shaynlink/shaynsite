import '../styles/globals.css'
import type { AppProps } from 'next/app'
import I18n from '../lib/i18n';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <I18n lngDict={pageProps.lngDict} locale={pageProps.lng}>
      <Component {...pageProps} />
    </I18n>
  )
}
