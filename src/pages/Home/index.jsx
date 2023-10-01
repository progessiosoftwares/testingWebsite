import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import styles from './Home.module.css'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from "../../firebaseConnection";
import { Link, useParams, useNavigate } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';

function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;
  const navigate = useNavigate();


  useEffect(() => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("created", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
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

    return () => {
      // Limpar o listener quando o componente for desmontado
      unsubscribe();
    };
  }, []); // Apenas dispare isso uma vez, quando o componente for montado

  const { page } = useParams();
  const pageNumber = page ? parseInt(page, 10) : 1;

  useEffect(() => {
    setCurrentPage(pageNumber);
  }, [pageNumber]);

  const handleClick = (number) => {
    // setCurrentPage(number);
    // Navegue para a página correspondente
    navigate(`/page/${number}`);
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
            <Link
              to={`/video/${encodeURIComponent(item.titulo.replace(/\s+/g, '-').toLowerCase())}/${item.id}/page/${currentPage}`}
              style={{ textDecoration: "none" }}
            >
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
