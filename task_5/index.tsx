"use client";

import { useState } from "react";
import useSWR from "swr";

import styles from "./page.module.css";

import { fetchOnePost } from "@/libs/fetchOnePost";

type Post = {
  title: string;
  body: string;
};

const ComponentOne = () => {
  // Загружаем данные и кладём в кэш по ключу 'post'
  const { data } = useSWR<Post>("post", fetchOnePost);
  //...some logic

  return data ? (
    <div className={styles.card}>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
      <span>ComponentOne</span>
    </div>
  ) : (
    <div>...Loading ComponentOne</div>
  );
};

const ComponentTwo = () => {
  // Используем тот же ключ и тот же fetcher → SWR отдаст кеш сразу после рендера
  const { data } = useSWR<Post>("post", fetchOnePost, {
    revalidateOnMount: false,
  });
  //...some logic

  return data ? (
    <div className={styles.card}>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
      <span>ComponentTwo</span>
    </div>
  ) : (
    <div>...Loading ComponentTwo</div>
  );
};

export default function Home() {
  const [showComponentTwo, setShowComponentTwo] = useState(false);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <ComponentOne />
        {showComponentTwo ? (
          <ComponentTwo />
        ) : (
          <button
            className={styles.btn}
            onClick={() => setShowComponentTwo(true)}
          >
            Show ComponentTwo
          </button>
        )}
      </div>
    </main>
  );
}
