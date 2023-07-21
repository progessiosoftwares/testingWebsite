import styles from './Header.module.css'
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png'
import CabecalhoLink from '../CabecalhoLink'

function Header(){
    return(
        <header className={styles.cabecalho}>
            <Link to="./">
                <img src={logo} alt="Logo do cinetag" className={styles.imgLogo}></img>
            </Link>
            <nav>
                <CabecalhoLink url="./">
                    Home
                </CabecalhoLink>
                {/* <CabecalhoLink url="./">
                    Mais vistos
                </CabecalhoLink> */}
            </nav>
        </header>
    )
}

export default Header