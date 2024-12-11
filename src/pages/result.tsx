import Image from "next/image";
import Logo from "../img/logo.png";
import Background from "../img/background.png";
import styles from "../styles/result.module.css";
import { OptionsGame } from "@/components/optionsGames/optionsGame";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

type Cover = {
  image_id?: string;
};

type Language = {
  id: number;
  language: number;
};

type Game = {
  id: number;
  name: string;
  cover?: Cover;
  summary?: string;
  languages_supports?: Language[];
};

export default function Result() {
  const router = useRouter();
  const [data, setData] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    if (router.query.data) {
      try {
        const parsedData: Game[] = JSON.parse(router.query.data as string);
        setData(parsedData);
      } catch (error) {
        console.error("Erro ao fazer o parse dos dados:", error);
      }
    } else {
      setData(
        Array.from({ length: 120 }, (_, i) => ({
          id: i + 1,
          name: `Jogo ${i + 1}`,
          cover: { image_id: "co1rs4" },
          languages_supports: [
            { id: 1, language: 1 },
            { id: 2, language: 2 },
          ],
        }))
      );
    }
  }, [router.query.data]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const buildImageUrl = (imageId: string | undefined) => {
    if (!imageId) return "";
    return `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`;
  };

  const handleClick = (game: Game) => {
    console.log("Dados enviados para /info:", game);

    localStorage.setItem("selectedGame", JSON.stringify(game));
    router.push({
      pathname: "/info",
    });
  };

  return (
    <>
    <Head>
      <title>Confia Primo | Resultado</title>
    </Head>
    <div className={styles.background}>
      <div className={styles.backgroundImageWrapper}>
        <Image
          src={Background}
          alt="Imagem de fundo"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className={styles.body}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Image
              className={styles.logoImage}
              src={Logo}
              alt="Logo do nosso site"
            />
            <div style={{ width: "19rem" }}>
              <p className={styles.info}>
                Clique em cima do banner para saber mais informações
              </p>
            </div>
          </div>

          <div className={styles.games}>
            {currentItems.map((game) => (
              <OptionsGame
                key={game.id}
                name={game.name}
                image={buildImageUrl(game.cover?.image_id)}
                onClick={() => handleClick(game)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.paginationButton}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className={styles.paginationInfo}>
          Página {currentPage} de {totalPages}
        </span>
        <button
          className={styles.paginationButton}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Próximo
        </button>
      </div>
    </div>
    </>
  );
}
