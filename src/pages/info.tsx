import { useEffect, useState } from "react";
import { LanguageConstants } from "../storage/languages";
import Image from "next/image";
import Logo from "../img/logo.png";
import styles from "../styles/info.module.css";
import { useRouter } from "next/router";
import Head from "next/head";

interface Cover {
  image_id?: string;
}

interface Language {
  id: number;
  language: number;
}

interface Game {
  id: number;
  name: string;
  cover?: Cover;
  summary?: string;
  language_supports?: Language[];
}

export default function Info() {
  const router = useRouter();
  const [data, setData] = useState<Game>();

  const getLanguageName = (languageId: number) => {
    const language = LanguageConstants.find((lang) => lang.id === languageId);
    return language ? language.name : `Idioma ID: ${languageId}`;
  };

  useEffect(() => {
    console.log("Dados recebidos no router.query:", router.query);

    try {
      const savedGame = localStorage.getItem("selectedGame");
      if (savedGame) {
        const game: Game = JSON.parse(savedGame);
        setData(game);
        console.log("Objeto game carregado do localStorage:", game);
      } else {
        console.error("Nenhum dado encontrado no localStorage");
      }
    } catch (error) {
      console.error("Erro ao carregar os dados do jogo:", error);
    }
  }, []);

  const uniqueLanguages = data?.language_supports
    ? Array.from(
        new Set(data.language_supports.map((item) => item.language))
      ).map((languageId) => {
        return { language: languageId };
      })
    : [];

  return (
    <>
      <Head>
        <title>Confia Primo | {data?.name}</title>
      </Head>

      <div className={styles.body}>
        {/* Botão de voltar */}
        <button className={styles.backButton} onClick={() => router.back()}>
          ←
        </button>

        <div className={styles.info}>
          {data?.cover?.image_id ? (
            <Image
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${data.cover.image_id}.jpg`}
              width={1920}
              height={500}
              alt={data.name || "Imagem do Jogo"}
              className={styles.image}
              priority
            />
          ) : (
            <Image src={Logo} alt="Logo do nosso" className={styles.image} />
          )}

          <h6 className={styles.title} translate="no">{data?.name}</h6>
        </div>

        <main className={styles.main}>
          {uniqueLanguages?.length > 0 && (
            <div className={styles.languageWrapper}>
              <div className={styles.language}>
                <p>Idiomas:</p>
                <hr />
              </div>

              {uniqueLanguages?.map((language) => {
                const languageName = getLanguageName(language.language);
                return (
                  <div key={language.language} className={styles.language}>
                    <p>{languageName}</p>
                    <hr />
                  </div>
                );
              })}
            </div>
          )}

          {data?.summary && (
            <div className={styles.synopsis}>
              <h6>Sinopse</h6>
              <hr />
              <div>
                <p>{data?.summary}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
