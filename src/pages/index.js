import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';
import styles from './index.module.css';

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
                src='/img/globo-blanco.png'
                width="250"
                height="250"
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
