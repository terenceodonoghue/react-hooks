import chunk from 'lodash/chunk';
import type { NextPage } from 'next';
import Head from 'next/head';
import Papa from 'papaparse';
import { ChangeEventHandler, useMemo, useState } from 'react';

import { Tag } from '../components';
import styles from '../styles/Home.module.css';

interface Tag {
  brand: string;
  description: string;
  ean_code: string;
  'promo rrp': string;
  save: string;
  size: string;
  tickets: number;
}

const Home: NextPage = () => {
  const [data, setData] = useState<Tag[]>();
  const [title, setTitle] = useState<string>('Catalogue');
  const [endDate, setEndDate] = useState<string>('');

  const chunkedData = useMemo(() => chunk(data, 9), [data]);

  const onTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onEndDateChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEndDate(e.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Tagify</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {chunkedData.length > 0 ? undefined : (
        <>
          <h1 className={styles.heading}>Hello :)</h1>
          <p className={styles.helpText}>
            Just need some details from you, then you can upload your CSV file
            to get started.
          </p>
          <div className={styles.options}>
            <label className={styles.label} htmlFor="catalogue">
              <input
                className={styles.input}
                id="catalogue"
                type="radio"
                name="title"
                value="Catalogue"
                checked={title === 'Catalogue'}
                onChange={onTitleChange}
              />
              Catalogue
            </label>
            <label className={styles.label} htmlFor="special">
              <input
                className={styles.input}
                id="special"
                type="radio"
                name="title"
                value="Special"
                checked={title === 'Special'}
                onChange={onTitleChange}
              />
              Special
            </label>
            <label className={styles.label} htmlFor="endDate">
              End Date
              <input
                className={styles.input}
                id="endDate"
                type="date"
                value={endDate}
                onChange={onEndDateChange}
              />
            </label>
            <input
              className={styles.input}
              disabled={!endDate}
              type="file"
              accept=".csv"
              onChange={(e) => {
                if (e.currentTarget.files?.[0]) {
                  Papa.parse<Tag>(e.currentTarget.files[0], {
                    header: true,
                    skipEmptyLines: true,
                    transformHeader: (header) => header.toLowerCase(),
                    complete: (results) => {
                      setData(results.data);
                    },
                  });
                }
              }}
            />
          </div>
        </>
      )}
      <main className={styles.main}>
        {chunkedData.map((page) => (
          <section className={styles.page}>
            {page.map((tag) => (
              <Tag
                title={title}
                price={tag['promo rrp']}
                endDate={endDate}
                {...tag}
              />
            ))}
          </section>
        ))}
      </main>
    </div>
  );
};

export default Home;
