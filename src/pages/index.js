import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';
import styles from './index.module.css';
import { roadmaps } from './roadmaps.json'

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Inicio`}
      description="Documentación para Programación Competitiva en Español">

        <div className={styles.hero} data-theme="dark">
          <div className={styles.heroInner}>
            <Heading as="h1" className={styles.heroProjectTagline}>
              <img
                alt={'Globo'}
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
          {
            roadmaps.map(roadmap => 
              <table summary={roadmap.title}>
                <caption>
                  <h2>{roadmap.title}</h2>
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Página</th>
                    <th scope="col">Traducida</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    roadmap.categorias.map(cat => {
                      const items = [];
                      if (cat.title) {
                        items.push(<tr style={{background: "rgba(0, 0, 0, 0.25)"}}>
                          <th scope="row" colSpan={2}>⭐ {cat.title}</th>
                        </tr>)
                        cat.items.map(item => {
                          items.push(<tr>
                            <th scope="row">
                              {(item.link) 
                              ? <a href={item.link}>{item.title}</a>
                              : item.title}
                              </th>
                            <td>{item.translated ? '✅': '❌'}</td>
                          </tr>)
                        })
                      }
                      return items
                    })
                  }
                </tbody>
              </table>
            )
          }
        </main>
    </Layout>
  );
}
