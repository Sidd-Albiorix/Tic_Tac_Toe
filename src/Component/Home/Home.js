import React, { useState } from 'react'
import './Home.css'

function Home() {
    const [board, setBoard] = useState(new Array(9).fill(null))
    let user = getNextUser(board);
    let winner = calculateWinner(board);
    let gameStatus = checkGameStatus(user, winner, board);

    //Handle start btn
    const onRefreshBtn = () => {
        setBoard(new Array(9).fill(null))
    }

    //Handle board/cell selection
    const onSelectBtn = (i) => {
        if (board[i] || winner)
            return;

        board[i] = user;
        setBoard([...board])
    }

    return (
        <div className='homeWrapper'>
            <span className='headerText'>Tic Tac Toe</span>

            <div className='boardWrapper'>
                {
                    board.map((item, i) => (
                        <button className='boardBtns' onClick={() => onSelectBtn(i)} key={i}>
                            {board[i]}
                        </button>
                    ))
                }
            </div>

            <p>{gameStatus}</p>

            <div className='btnWrapper'>
                <button onClick={onRefreshBtn}>New Game</button>
            </div>
        </div>
    )
}

//To check game status (win,lose,tie)
const checkGameStatus = (user, winner, board) => {
    return winner ? `${winner} is the winner` : Object.values(board).filter(Boolean).length === 9 ? `Match tie` : `Next move from ${user}`
}

//To calculate winner
const calculateWinner = (board) => {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    for (let comb of winningCombinations) {
        const [i, j, k] = comb;
        if (board[i] && board[i] === board[j] && board[i] === board[k]) {
            return board[i];
        }

    }
    return null;
}

//Get next user symbol
const getNextUser = (board) => {
    return board.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

export default Home