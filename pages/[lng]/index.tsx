import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import use18n from '../../hooks/use-i18n';
import { languages, contentLanguageMap, I18nWrapper } from '../../lib/i18n';
import { ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const i18n = use18n() as I18nWrapper;
  const router = useRouter();
  const today = new Date();
  const born = new Date(2003, 6, 29);
  const birthYear =
    new Date(today.getTime() - born.getTime()).getUTCFullYear() - 1970

  useEffect(() => {
    if (router.query.lng != i18n.activeLocale) {
      router.push(router.route, i18n.activeLocale)
    }
  }, [router.query.lng, i18n.activeLocale])

  function handleChangeLocale(event: ChangeEvent<HTMLSelectElement>) {
    i18n.locale(event.target.value);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>shaynlink&apos;s website</title>
        <meta name="description" content="shaynlink's website. Found all projects and blog." />
        <link rel="icon" href="/favicon.ico" />
        <meta
          httpEquiv="content-language"
          content={contentLanguageMap[i18n.activeLocale ?? 'en']}
        />
      </Head>

      <header className={styles.header}>
        <p className={styles.branding}>Shaynlink</p>
        <div className={styles.navlist}>
          <Link href={{pathname: "/[lng]/projects", query: { lng: i18n.activeLocale }}}>{i18n.t('home.navbar.projects')}</Link>
          <Link href={{pathname: "/[lng]/apis", query: { lng: i18n.activeLocale }}}>{i18n.t('home.navbar.apis')}</Link>
          <Link href={{pathname: "/[lng]/blog", query: { lng: i18n.activeLocale }}}>{i18n.t('home.navbar.blog')}</Link>
          <Link href={{pathname: "/[lng]/contact", query: { lng: i18n.activeLocale }}}>{i18n.t('home.navbar.contact')}</Link>
          <Link href={{pathname: "/[lng]/support", query: { lng: i18n.activeLocale }}}>{i18n.t('home.navbar.support')} &#9829;</Link>
        </div>
        <select
          name={i18n.activeLocale}
          className={styles.selectLanguage}
          value={i18n.activeLocale}
          onChange={handleChangeLocale}
        >
          {languages.map((l, i) => (
            <option value={l} key={i}>{contentLanguageMap[l]}</option>
          ))}
        </select>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {i18n.t('home.title')}
        </h1>

        <p className={styles.description}>
          {i18n.t('home.description')}
        </p>
        
        <p className={styles.textDescription}>
            {i18n.t('home.textDescription1', { birthYear })}<br />
            {i18n.t('home.textDescription2')}<br /><br />
            {i18n.t('home.textDescription3')}<br/>
            {i18n.t('home.textDescription4')}<br />
            {i18n.t('home.textDescription5')}<br /><br />

            {i18n.t('home.textDescription6')}<br/>
            {i18n.t('home.textDescription7')}{' '}
            <Link href="https://github.com/shaynlink" target='_blank'>
                <span style={{color: '#30AADF'}}>github</span>
            </Link> {i18n.t('home.textDescription8')}{' '}
            <Link href="https://patreon.com/shaynlink" target='_blank'>
              <span style={{color: '#30AADF'}}>patreon</span>
            </Link>.
        </p>

        <div className={styles.grid}>
          <Link href="https://nextjs.org/docs" target='_blank' className={styles.card}>
            <h2>Github &rarr;</h2>
            <p>{i18n.t('home.cards.github')}</p>
          </Link>

          <Link href="https://nextjs.org/learn" target='_blank' className={styles.card}>
            <h2>Patreon &rarr;</h2>
            <p>{i18n.t('home.cards.patreon')}</p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
          <p>Made with &#9829; in France</p>
      </footer>
    </div>
  )
}

interface StaticProps {
  params: {
    lng: string
  }
}

export async function getStaticProps({ params }: StaticProps) {
  const { default: lngDict = {} } = await import(
    `../../locales/${params.lng}.json`
  )

  return {
    props: { lng: params.lng, lngDict }
  }
}

export async function getStaticPaths() {
  return {
    paths: languages.map((l) => ({ params: { lng: l } })),
    fallback: false
  }
}
