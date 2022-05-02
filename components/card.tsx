import Styles from "./card.module.scss";
import cardRanks from "../enums/cardRanks";
import cardSuits from "../enums/cardSuits";

const card = (props: any) => {
  return (
    <div className={Styles.body}>
      <div className={Styles.text}>
        This is the {cardRanks[props.rank]} of {cardSuits[props.suit]}
      </div>
    </div>
  );
}

export default card;