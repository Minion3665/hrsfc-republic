import Styles from "./card.module.scss";
import cardRanks from "../enums/cardRanks";
import cardSuits from "../enums/cardSuits";
import Image from "next/image";

const card = (props: any) => {
    // This component displays a card
    // It uses some icons to display the suit and rank, and if the card is a picture card it also adds an
    // evil monarchy crown to the top of the card
    return (
        <div className={Styles.body}>
            <div className={Styles.crownContainer}>
                {props.rank >= 10 ? <Image className={Styles.crown} width={100} height={100 / 109 * 68} src={'/ranks/monarchy.svg'} alt={'royalty'} /> : null}
            </div>
            <div className={Styles.text}>
                <Image width={80} height={80 * 145.58 / 130} src={`/suits/${cardSuits[props.suit].toLowerCase()}.svg`} alt={props.suit} />
                <div className={Styles.rank}>{cardRanks[props.rank]}</div>
            </div>
        </div>
    );
}

export default card;