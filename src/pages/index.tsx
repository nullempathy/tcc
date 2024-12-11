import { useState } from "react";
import { CheckBox } from "@/components/checkbox/CheckBox";
import { Section } from "@/components/section/Section";
import { LanguageConstants } from "@/storage/languages";
import { GenresConstants } from "@/storage/genres";
import styles from "../styles/index.module.css";
import Image from "next/image";
import Logo from "../img/logo.png";
import Name from "../img/name.png";
import Background from "../img/background.png";

import { useRouter } from "next/router";
import Head from "next/head";

export default function Home() {
  const router = useRouter();
  const [languages] = useState(LanguageConstants);
  const [genres] = useState(GenresConstants);
  
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [showGenres, setShowGenres] = useState(false);
  const [showLanguage, setShowLanguage] = useState(true);
  

  function handleLanguageChange(id: string, isChecked: boolean) {
    setSelectedLanguages((prev) => {
      if (isChecked) {
        return [...prev, id];
      } else {
        return prev.filter((item) => item !== id);
      }
    });
  }

  function handleGenreChange(id: string, isChecked: boolean) {
    setSelectedGenres((prev) => {
      if (isChecked) {
        return [...prev, id];
      } else {
        return prev.filter((item) => item !== id);
      }
    });
  }

  function renderLanguage() {
    return languages.map((language) => (
      <CheckBox
        key={language.id}
        id={String(language.id)}
        value={language.name}
        storage="languages"
        checked={selectedLanguages.includes(String(language.id))} 
        onChange={handleLanguageChange}
      />
    ));
  }

  function renderGenres() {
    return genres.map((genre) => (
      <CheckBox
        key={genre.id}
        id={String(genre.id)}
        value={genre.name}
        storage="genres"
        checked={selectedGenres.includes(String(genre.id))}
        onChange={handleGenreChange}
      />
    ));
  }

  async function searchApi() {
    try {
      const body = {
        genres: selectedGenres,
        languages: selectedLanguages,
      };
  
      const response = await fetch("/api/searchGames", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
  
      router.push({
        pathname: "/result",
        query: { data: JSON.stringify(data) },
      });
    } catch (e) {
      console.error("Erro na requisição:", e);
    }
  }
  
  return (
    <>
     <Head>
        <title>Conifa primo</title>
    </Head>
    <div className={styles.background}>
      <Image src={Background} alt="" id={styles.background} />
      <div className={styles.body}>
        <div className={styles.logo}>
          <div className={styles.wrapper}>
            <Image id={styles.logo} src={Logo} alt="Logo" />
            <div className={styles.slogan}>
              <Image id={styles.slogan} src={Name} alt="Logo escrito Confia Primo" />
              <p>Encontramos o jogo que busca!</p>
            </div>
          </div>
          <div className={styles.slide}>
            <header className={styles.header}>
              <h6>Busque fácil e rápido</h6>
              <p>As melhores indicações de primo para primo</p>
            </header>
          </div>
        </div>

        <div className={styles.form}>
          <div className={styles.header}>
            <span>EAE PRIMO</span>
            <h6>Filtre os jogos indicados</h6>
          </div>
          <form>
            {showLanguage && <Section>{renderLanguage()}</Section>}
            {showGenres && <Section>{renderGenres()}</Section>}

            {showLanguage && (
              <button 
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  setShowLanguage(false);
                  setShowGenres(true);
                }}
              >
                Próximo
              </button>
            )}

            {showGenres && (
              <button 
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  setShowGenres(false);
                  setShowLanguage(true);
                }}
              >
                Anterior
              </button>
            )}

            <button 
              className={styles.button} 
              onClick={(e) => {
                e.preventDefault();
                searchApi();
              }}
            >
              Pesquisar
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
