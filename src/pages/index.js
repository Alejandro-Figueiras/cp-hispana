import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Documentación en Español para Programación Competitiva
        </Heading>
        <p className="hero__subtitle">Powered by Docusaurus</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Empecemos!
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">

        <div className={styles.hero} data-theme="dark">
          <div className={styles.heroInner}>
            <Heading as="h1" className={styles.heroProjectTagline}>
              <img
                alt={'Docusaurus with Keytar'}
                className={styles.heroLogo}
                src='/img/docusaurus.png'
                width="200"
                height="200"
              />
              <span
                className={styles.heroTitleTextHtml}
              >
                Documentación para <b>Programación Competitiva</b> en Español
              </span>
            </Heading>
          </div>
        </div>
      {/* <HomepageHeader />
      <main>
        
      </main> */}
    </Layout>
  );
}
