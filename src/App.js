import {useState, useEffect} from "react";
import "./App.css";
import reset from "./refreshing.png";
function App(){
  const [sign, setSign] = useState(Array(9).fill(null));
  const [next, setNext] = useState(true);
  const [p1Wins , setP1Wins] = useState(0);
  const [p2Wins , setP2Wins] = useState(0);
  const [banner , setBanner]= useState(false);
  var winner=checkWinner(sign);
  function handleClick(i){
    const active=[...sign];
    if(winner || active[i]) return;
    active[i]= next?"X":"O";
    setSign(active);
    setNext(!next);
  }

  function checkWinner(line){
    const moves = [
    		[0, 1, 2],
    		[3, 4, 5],
    		[6, 7, 8],
    		[0, 3, 6],
    		[1, 4, 7],
    		[2, 5, 8],
    		[0, 4, 8],
    		[2, 4, 6],
    	];
    for( var i=0; i<moves.length; i++){
      const [a,b,c] = moves[i];
      if (line[a] && line[a] === line[b] && line[a] === line[c]){
        return line[a];
      }
    }
    return null;
  }


// handling reset
  function handleReset(){
    setSign("");
    winner="";
  }

// Updating Wins after every game
  useEffect( ()=>{
      if(winner==="X"){
        setP1Wins(p1Wins+1);
      }else if(winner==="O"){
        setP2Wins(p2Wins+1);
      }
      if(winner){
        setBanner(true)
      }
  },[winner])

  return(
    <>
      <div className="container">
      <div className="game-details">
            <p className="players">x<span>o</span></p>
            <p className="stats">Turn {next?"X":"O"}</p>
            <button type="button" className="reset-button" onClick={handleReset}><img src={reset} className="reset-icon" alt="resetButton"/></button>
      </div>
      { banner&& <div className="winner">
                  <h2>{winner && winner+" Wins"}</h2>
                  <div>
                  <button className="banner-btn" onClick={()=>window.close()} type="button">Quit</button>
                  <button className="banner-btn" onClick={()=>{
                    setBanner(false);
                    setSign("");
                  }} type="button">Play Again</button>
                  </div>
                  </div>
        }

        <div className="game">
            <div className="box" id="1" style={{color: sign[0]==="X"?"#33c3bf":"#edae36"}}value="0" name="one" onClick={()=> handleClick(0)}>{sign[0]}</div>
            <div className="box" id="2" style={{color: sign[1]==="X"?"#33c3bf":"#edae36"}}value="1" name="two" onClick={()=> handleClick(1)}>{sign[1]}</div>
            <div className="box" id="3" style={{color: sign[2]==="X"?"#33c3bf":"#edae36"}}value="2" name="three" onClick={()=> handleClick(2)}>{sign[2]}</div>
            <div className="box" id="4" style={{color: sign[3]==="X"?"#33c3bf":"#edae36"}}value="3" name="four" onClick={()=> handleClick(3)}>{sign[3]}</div>
            <div className="box" id="5" style={{color: sign[4]==="X"?"#33c3bf":"#edae36"}}value="4" name="five" onClick={()=> handleClick(4)}>{sign[4]}</div>
            <div className="box" id="6" style={{color: sign[5]==="X"?"#33c3bf":"#edae36"}}value="5" name="six" onClick={()=> handleClick(5)}>{sign[5]}</div>
            <div className="box" id="7" style={{color: sign[6]==="X"?"#33c3bf":"#edae36"}}value="6" name="seven" onClick={()=> handleClick(6)}>{sign[6]}</div>
            <div className="box" id="8" style={{color: sign[7]==="X"?"#33c3bf":"#edae36"}}value="7" name="eight" onClick={()=> handleClick(7)}>{sign[7]}</div>
            <div className="box" id="9" style={{color: sign[8]==="X"?"#33c3bf":"#edae36"}}value="8" name="nine" onClick={()=> handleClick(8)}>{sign[8]}</div>
            <div className="player-box player1"><p>Player X</p> <p>{p1Wins}</p></div>
            <div className="player-box history"></div>
            <div className="player-box player2"><p>Player O</p> <p>{p2Wins}</p></div>
        </div>

      </div>
    </>
  )
}

export default App;
