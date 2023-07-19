import { useState, useEffect } from "react";
import Card from "../../components/Card";
import styles from './Home.module.css'
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from "../../firebaseConnection";
import { Link } from "react-router-dom";

function Home() {

    const [titulo, setTitulo] = useState('');
    const [imagem, setImagem] = useState('');
    // const [video, setVideo] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function loadPosts() {
            const postsRef = collection(db, "posts");
            const unsub = onSnapshot(postsRef, (snapshot) => {
                let listaPost = [];
                snapshot.forEach((doc) => {
                    listaPost.push({
                        id: doc.id,
                        titulo: doc.data().titulo,
                        imagem: doc.data().imagem,
                    });
                });

                setPosts(listaPost);
            });
        }

        loadPosts();
    }, []);

    return (
        <div className={styles.containerHome}>
        <h1 className={styles.tituloRecentes}>Videos mais recentes</h1>
        <div className={styles.secaoCards}>
          {posts.map((item) => {
            return (
              <div key={item.id}>
                {/* Use o componente Link para criar um link para a página de vídeo */}
                <Link to={`/video/${item.id}`}>
                  {/* Card deve conter a imagem e o título dentro da div */}
                  <div>
                    <Card url={item.imagem}>{item.titulo}</Card>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    )
}

export default Home;
