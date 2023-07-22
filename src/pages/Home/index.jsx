import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import styles from './Home.module.css'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from "../../firebaseConnection";
import { Link, useParams } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination'; // Importar o componente de paginação do react-bootstrap

function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  useEffect(() => {
    async function loadPosts() {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, orderBy("created", "desc"));
      const unsub = onSnapshot(q, (snapshot) => {
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

  const { page } = useParams();
  const pageNumber = page ? parseInt(page, 10) : 1;

  const handleClick = (number) => {
    setCurrentPage(number);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <Pagination>
        {pageNumbers.map((number) => (
          <Link key={number} to={`/page/${number}`} style={{ textDecoration: "none" }}>
            <Pagination.Item className={number === pageNumber ? styles.active : ''} onClick={() => handleClick(number)}>
              {number}
            </Pagination.Item>
          </Link>
        ))}
      </Pagination>
    );
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className={styles.containerHome}>
      <h1 className={styles.tituloRecentes}>Videos mais recentes</h1>
      <div className={styles.secaoCards}>
        {currentPosts.map((item) => (
          <div key={item.id}>
            <Link to={`/video/${encodeURIComponent(item.titulo.replace(/\s+/g, '-').toLowerCase())}/${item.id}`} style={{ textDecoration: "none" }}>
              <div>
                <Card url={item.imagem}>{item.titulo}</Card>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        {renderPageNumbers()}
      </div>
    </div>
  );
}

export default Home;
