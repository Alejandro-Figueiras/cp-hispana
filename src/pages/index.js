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
      title={`CP Español`}
      description="Documentación para Programación Competitiva en Español">

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
        <main className={styles.main}>
        <table summary="Roadmap Algebra">
          <caption>
            <h2>Roadmap: Algebra</h2>
          </caption>
          <thead>
            <tr>
              <th scope="col">Página</th>
              <th scope="col">Traducida</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{background: "rgba(0, 0, 0, 0.7)"}}>
              <th scope="row" colSpan={2}>⭐ Fundamentals</th>
            </tr>
            <tr>
              <th scope="row">Binary Exponentiation</th>
              <td>✅</td>
            </tr>
            <tr>
              <th scope="row">Euclidean algorithm</th>
              <td>❌</td>
            </tr>
            <tr>
              <th scope="row">Extended Euclidean Algorithm</th>
              <td>❌</td>
            </tr>
            <tr>
              <th scope="row">Linear Diophantine Equation¶</th>
              <td>❌</td>
            </tr>
            <tr>
              <th scope="row">Fibonacci Numbers</th>
              <td>❌</td>
            </tr>
            <tr style={{background: "rgba(0, 0, 0, 0.7)"}}>
              <th scope="row" colSpan={2}>⭐ Números Primos</th>
            </tr>
            <tr>
              <th scope="row">Sieve of Eratosthenes</th>
              <td>❌</td>
            </tr>
            <tr>
              <th scope="row">Primality tests</th>
              <td>❌</td>
            </tr>
            <tr>
              <th scope="row">Integer factorization</th>
              <td>❌</td>
            </tr>
            <tr style={{background: "rgba(0, 0, 0, 0.7)"}}>
              <th scope="row" colSpan={2}>⭐ Number-theoretic functions</th>
            </tr>
            <tr>
              <th scope="row">Euler's totient function</th>
              <td>❌</td>
            </tr>
            <tr>
              <th scope="row">Number of divisors / sum of divisors</th>
              <td>❌</td>
            </tr>
            <tr style={{background: "rgba(0, 0, 0, 0.7)"}}>
              <th scope="row" colSpan={2}>⭐ Artimetica Modular</th>
            </tr>
            <tr style={{background: "rgba(0, 0, 0, 0.7)"}}>
              <th scope="row" colSpan={2}>⭐ Sistemas numéricos</th>
            </tr>
            <tr style={{background: "rgba(0, 0, 0, 0.7)"}}>
              <th scope="row" colSpan={2}>⭐ Misc</th>
            </tr>
            
          </tbody>
        </table>

        </main>
    </Layout>
  );
}
