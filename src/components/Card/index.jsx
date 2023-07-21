import styles from './Card.module.css'

const Card = ({url, children}) =>{

    return(
        <div className={styles.containerCard}>
            <img src={url} alt="imagem simpson" className={styles.cardImg} object-fit="contain"/>
            <h3 className={styles.textoCard}>{children}</h3>
        </div>
    )
}

export default Card
