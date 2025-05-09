import { useState } from "react"
import { clsx } from "clsx"
import Confetti from "react-confetti";
import {getFarewellText, getRandomWord as animals } from "./util"
import language from "./../data/language.json"


const Hangman = () => {
    
    // state value
    const [ char, setChar ] = useState(animals())
    const [ guessedLetter, setGuessedLetter ] = useState([]);
    console.log(char.name)
    // Derive Value
    const wrongLetterCount = guessedLetter.filter(letter => !char.name.includes(letter)).length;
    const gameWon = char.name.split("").every(letter => guessedLetter.includes(letter));
    const gameLos = wrongLetterCount >= (language.language.length);
    const gameOver = gameWon || gameLos;


    const isLastGuessedLetterCorrect = 
            guessedLetter[guessedLetter.length - 1] && 
            !char.name.includes(guessedLetter[guessedLetter.length - 1]);


    const gameStatusClass = clsx("max-w-80 rounded-sm text-sm mx-auto p-2 min-h-16 flex flex-wrap justify-center items-center", 
        gameWon && "bg-green-800" || gameLos && "bg-red-800 " || !gameOver && 
        isLastGuessedLetterCorrect && "bg-purple-700");


    // sticky value
    const keyboardChar = "abcdefghijklmnopqrstuvwxyz";
    const list = language.language.map((item, index) => {
        const isLanguage = index < wrongLetterCount;
        const className = clsx(isLanguage && "lost")
        
        return (
        <li 
        className={className}
        style={{
            backgroundColor : item["bg-color"],
            color : item["text-color"]
        }}
        key={index}>{item.name}</li>
    )})



    // Game input Section
    const charElement = char.name.split("").map((item, index) => (
        <span key={index}>{guessedLetter.includes(item) ? item : "👎"}</span>
    ))


    
    // keyboard operation
    const keyboardHandler = (newLetter) => {
        setGuessedLetter(previousLetter => {
            const letterSet = new Set(previousLetter);
                letterSet.add(newLetter);
            return Array.from(letterSet);
        })
    }
    
    const keyArray = keyboardChar.split("").map((key, index) => {
        const isGuessedLeter = guessedLetter.includes(key);
        const isCorrect = isGuessedLeter && char.name.includes(key);
        const isWrong = isGuessedLeter && !char.name.includes(key);
        const className = clsx({
            correct : isCorrect,
            wrong : isWrong
        });
        
    return (
        <button 
        className={className}
        onClick={() => keyboardHandler(key)}
        disabled={gameOver}
        aria-disabled={guessedLetter.includes(key)}
        key={index}>
            {key.toUpperCase()}
        </button>
    )
    })


    const startGame = () => {
        setChar(animals());
        setGuessedLetter([])
    }
    
    return (
        <>
            {gameWon && <Confetti width={window.innerWidth} height={window.innerHeight} />}
           <header>
                <div className="container text-center my-4">
                    <h1 className="text-lg uppercase font-bold">Assemble : EndGame</h1>
                    <p className="text-slate-400 leading-4">Guess the word within 8 attempts to keep the programming assembly!</p>
                </div>
           </header>

           <section className="game-status">
                <div className="container text-center">
                    <p 
                        aria-live="polite" 
                        role="status" 
                        className={gameStatusClass}
                    >
                    {gameOver ? 
                        (
                        gameWon ? (
                            <>
                            <span className="text-lg w-full">Game Win!</span>
                            Well Done! &#x1F600;   
                            </>
                            ) : (
                                <>
                                <span className="text-lg">Game Over!</span>
                                You are loosing. Better learning assemble. &#128546;    
                                </> 
                            )
                        ) : null
                    }
                    {
                        !gameOver && isLastGuessedLetterCorrect && 
                        <>
                            <span className="text-lg">
                                {getFarewellText(language.language[wrongLetterCount - 1].name)}
                            </span>  
                        </> 
                    }
                    </p>
                </div>
           </section>

           <section className="sr-only" aria-live="polite" role="status">
                    <p>{char.name.includes(guessedLetter[guessedLetter.length - 1]) ? 
                    `Correct. the Letter ${guessedLetter[guessedLetter.length - 1]} is in the word` : 
                    `Sorry. the Letter ${guessedLetter[guessedLetter.length - 1]} isn't in the word`}</p>
                    <p>Current Word : {char.name.split("").map(letter => 
                        guessedLetter.includes(letter) ? letter + "." : "Blank."
                    ).join(" ")
                    }</p>
           </section>

           <section className="language-chip">
                <div className="container text-center">
                    <ul className="chip max-w-80 mx-auto flex flex-wrap justify-center gap-1 text-sm my-4">
                        {list}
                    </ul>
                </div>
           </section>

           <section className="character py-5">
                <div className="container mb-5 m-auto">
                    <img className="h-40 m-auto" src={char.imageUrl} alt="" />
                </div>
                <div className="charecter container text-center flex flex-wrap justify-center uppercase gap-1">
                    {charElement}
                </div>
           </section>

           <section className="keyboard py-5">
            <div className="keys container text-center flex justify-center gap-2 max-w-96 flex-wrap">
                {keyArray}
            </div>
           </section>

            <section className="newGame py-5">
                <div className="container text-center">
                    {gameOver && 
                    <button 
                    onClick={startGame}
                    className="bg-cyan-500 py-2 px-12 rounded uppercase text-sm">
                        New Games
                    </button>
                    }
                </div>
            </section>
        </>
    )
}

export default Hangman;