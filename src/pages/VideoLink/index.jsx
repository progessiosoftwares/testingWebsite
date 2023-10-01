import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Remova useLocation
import { db } from "../../firebaseConnection";
import { doc, getDoc } from "firebase/firestore";
import styles from './VideoLink.module.css';
import BackButton from "../../components/BackButton";

async function fetchVideoDataById(id) {
  try {
    const videoRef = doc(db, "posts", id);
    const videoDoc = await getDoc(videoRef);

    if (videoDoc.exists()) {
      const videoData = videoDoc.data();
      return videoData;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Erro ao buscar dados do vídeo: " + error.message);
  }
}

function VideoLink() {
  const { id, title, page } = useParams(); // Remova useLocation e use o page diretamente dos params
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const currentPage = parseInt(page, 10); // Use o page diretamente dos params
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVideoData() {
      try {
        const videoData = await fetchVideoDataById(id);
        console.log(currentPage)
        if (videoData) {
          setVideoData(videoData);
        } else {
          setError("Vídeo não encontrado!");
        }

        setLoading(false);
      } catch (error) {
        setError("Erro ao buscar dados do vídeo: " + error.message);
        setLoading(false);
      }
    }

    fetchVideoData();
  }, [id]);

  useEffect(() => {
    // Definir o título do documento após receber os dados do vídeo pela primeira vez
    if (videoData) {
      document.title = videoData.titulo + " - Novinhos HOT Brasil";
    }
  }, [videoData]);

  useEffect(() => {
    // Definir o estado "isMobile" com base no tamanho da tela
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Verificar o tamanho da tela inicialmente

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!videoData) {
    return <div>No video data found.</div>;
  }

  return (
    <div className={styles.containerVideo}>
   <BackButton customClassName={styles.backButtonVideoLink} currentPage={currentPage} onGoBack={() => navigate(`/page/${currentPage}`)} />
      <h1>{videoData.titulo}</h1>
      <div className={styles.videoWrapper}>
        <div dangerouslySetInnerHTML={{ __html: videoData.video }} />
      </div>
    </div>  
  );
}

export default VideoLink;
