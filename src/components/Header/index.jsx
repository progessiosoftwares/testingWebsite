import React, { useState, useEffect } from "react";
import styles from './Header.module.css';
import { Link } from "react-router-dom";
import logo from '../../assets/logoNew.png'
import CabecalhoLink from '../CabecalhoLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Header() {
  // Função para verificar se o dispositivo é mobile
  const isMobile = window.innerWidth <= 767;

  return (
    <header className={styles.cabecalho}>
      <Link to="./">
        <img src={logo} alt="Logo do cinetag" className={styles.imgLogo}></img>
      </Link>
      <nav>
        {isMobile ? (
          <CabecalhoLink url="./">
            <FontAwesomeIcon icon={faBars} />
          </CabecalhoLink>
        ) : (
          <CabecalhoLink url="./">Home</CabecalhoLink>
        )}
        {/* <CabecalhoLink url="./">Mais vistos</CabecalhoLink> */}
      </nav>
    </header>
  );
}

export default Header;
