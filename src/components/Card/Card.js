import styles from "../Card/Card.module.scss";

const Card = ({children,cardClass}) => {              //two props as args, 'children' is a special reserved properrty in it, read about it on internet
   return (
    <div className={`${styles.card}  ${cardClass}`}>      {/* the properties of the styles.card and also of what we specify to it as prop will apply */}
        {children}
    </div>
  )
}

export default Card;