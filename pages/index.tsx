import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Card from "../components/card";
import CardSuit from "../enums/cardSuits";
import CardRank from "../enums/cardRanks";
import {useState} from "react";
import Hand from "../components/hand";

const Home: NextPage = () => {
    const [player1Hand, setPlayer1Hand] = useState<number[]>([]);
    const [player2Hand, setPlayer2Hand] = useState<number[]>([]);
    const [deck, setDeck] = useState<number[]>(Array.from(Array(52).keys()).sort(() => Math.random() - 0.5));
    const [player1Turn, setPlayer1Turn] = useState<boolean>(true);
    const [otherPlayerStillDrawing, setOtherPlayerStillDrawing] = useState<boolean>(true);
    const [displayingWinner, setDisplayingWinner] = useState<boolean>(false);

    const deal = () => {
        const currentHand = player1Turn ? player1Hand : player2Hand;

        if (currentHand.length >= 5) return stand();

        const setDealtPlayerHand = player1Turn ? setPlayer1Hand : setPlayer2Hand;

        const card = deck.pop();
        setDeck(deck);

        if (card === undefined) return;

        const newHand = [...currentHand, card];

        setDealtPlayerHand(newHand);

        if (newHand.length === 5) return stand();
        if (otherPlayerStillDrawing) setPlayer1Turn(!player1Turn);
    };

    const stand = () => {
        if (!otherPlayerStillDrawing) return setDisplayingWinner(true);

        setOtherPlayerStillDrawing(false);
        setPlayer1Turn(!player1Turn);
    };

    const calculateScoreForHand = (hand: number[]) => {
        // Let's write a scoring system!
        // Normal cards are worth their face value, but picture cards are minus twice their face value

        // The rank of the card is Math.floor(card / 4) + 1
        let score = 0;
        hand.forEach(card => {
            const rank = Math.floor(card / 4) + 1;

            if (rank > 10) {
                score -= rank * 2;
            } else {
                score += rank;
            }
        })

        return score;
    };

    return (
        <div style={{padding: "20px"}}>
            <h1>Welcome to &quot;Republic&quot;</h1>
            <p>Republic is a game about avoiding the monarchy; draw cards to invite people to your republic but get negative points
            if you accidentally let in a royal</p>
            <Hand score={calculateScoreForHand(player1Hand)} cards={player1Hand}/>
            <Hand score={calculateScoreForHand(player2Hand)} cards={player2Hand}/>
            <br/><br/>
            <button onClick={deal}>Deal to player {player1Turn ? 1 : 2}</button>{' '}
            <button onClick={stand}>My kingdom is ready</button>

            {displayingWinner && <h1>Player {calculateScoreForHand(player1Hand) < calculateScoreForHand(player2Hand) ? 2 : 1} wins!</h1>}
        </div>
    )
}

export default Home
