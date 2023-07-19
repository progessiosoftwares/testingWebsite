// VideoLink.js
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConnection";
import { doc, getDoc } from "firebase/firestore";
import styles from './VideoLink.module.css'

function VideoLink() {
    const { id } = useParams();
    const [videoData, setVideoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        async function fetchVideoData() {
          try {
            // console.log("ID do vídeo:", id);
            const videoRef = doc(db, "posts", id); // Verifique se a coleção é "posts"
            const videoDoc = await getDoc(videoRef);
      
            if (videoDoc.exists()) {
            //   console.log("Dados do vídeo:", videoDoc.data()); // Log para verificar os dados retornados pelo Firebase
              setVideoData(videoDoc.data());
            } else {
              setError("Documento não encontrado!");
            }
      
            setLoading(false);
          } catch (error) {
            setError("Erro ao buscar dados do vídeo: " + error.message);
            setLoading(false);
          }
        }
    
        fetchVideoData();
      }, [id]);
  
    if (loading) {
      return <div style={{textAlign: "center"}}>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    if (!videoData) {
      return <div>No video data found.</div>;
    }

    // Definir o título do documento após receber os dados do vídeo pela primeira vez
    document.title = videoData.titulo + " - Novinhos HOT Brasil";
  
    return (
      <div className={styles.containerVideo}>
        <h1>{videoData.titulo}</h1>
        <div dangerouslySetInnerHTML={{ __html: videoData.video }} />
      </div>
    );
  }
  
  export default VideoLink;
