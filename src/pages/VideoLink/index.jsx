import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConnection";
import { doc, getDoc } from "firebase/firestore";
import styles from './VideoLink.module.css';

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
  const { id, title } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideoData() {
      try {
        const videoData = await fetchVideoDataById(id);

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
  
  if (loading) {
    return <div style={{textAlign: "center"}}>Loading...</div>;
  }
  
  if (error) {
    return <div>{error}</div>;
  }
  
  if (!videoData) {
    return <div>No video data found.</div>;
  }
  
  return (
    <div className={styles.containerVideo}>
      <h1>{videoData.titulo}</h1>
      <div dangerouslySetInnerHTML={{ __html: videoData.video }} />
    </div>
  );
}

export default VideoLink;
