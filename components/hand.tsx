import Styles from './hand.module.scss';
import Card from "./card";

const hand = (props: any) => {
    // This hand component needs to take in an array of cards on the 'cards' prop
    // and render them in the hand.
    // The cards are represented by an integer from 0 to 51.

    // To do this, we'll use the card component which takes in a rank and suit.

    return (
        <>
            <div className={Styles.hand}>
                {props.cards.map((card: any) => {
                    return (
                        <Card rank={Math.floor(card / 4)} suit={card % 4} key={card} />
                    )
                })}
            </div>
            <span className={Styles.score}>This kingdom scores {props.score}</span>
            {props.cards.length >= 5 ? <span> and is full</span> : null}
        </>
    )
}

export default hand;