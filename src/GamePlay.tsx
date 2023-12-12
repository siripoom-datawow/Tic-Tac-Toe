import { useState } from "react"
import { useGlobalContext, PlayerContextType } from "./Context/playerContext"
import { useToast } from '@chakra-ui/react'


export const GamePlay = () =>{
  const toast = useToast()
  const {players, setPlayers} = useGlobalContext() as PlayerContextType
  const [line, setLine] = useState<string[][]>([['','',''],['','',''],['','','']])
  const [turn, setTurn] = useState<string>('x')
  const [turnCount, setTurnCount] = useState<number>(0)
  const [winner, setWinner] = useState<string|null>(null)

  const setMove = (index:number,subIndex:number):void => {
    if (line[index][subIndex] !== ''){
      toast({
        title: 'Wrong move.',
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
      }else if (winner !== null){
        toast({
          title: 'Game has been ended.',
          status: 'error',
          duration: 1000,
          isClosable: true,
        })
      }else{
        let currentTurn = turnCount + 1
        let newLine = [...line]
        newLine[index][subIndex] = turn

        const result = checkCondition(newLine)

        if(result === 'win' && turn.toUpperCase() === 'X'){
          let updatePlayer = [...players]
          updatePlayer[0].point += 1

          setWinner(turn.toUpperCase())
          setPlayers(updatePlayer)
        }else if(result === 'win' && turn.toUpperCase() === 'O'){
          let updatePlayer = [...players]
          updatePlayer[1].point += 1

          setWinner(turn.toUpperCase())
          setPlayers(updatePlayer)
        }else if(result === 'draw' && currentTurn === 9){
          setWinner('draw')
        }else{
          setWinner(null)
          turn === 'x' ? setTurn('o') : setTurn('x')
        }

        setLine(newLine)
        setTurnCount(currentTurn)
      }


    }
  const checkCondition =  (newLine:string[][]):string => {
    if (newLine[0][0] === newLine[0][1] && newLine[0][1] === newLine[0][2] && newLine[0][0] !== '' ){
      return 'win'
    }else if (newLine[1][0] === newLine[1][1] && newLine[1][1] === newLine[1][2]  && newLine[1][0] !== ''){
      return 'win'
    }else if (newLine[2][0] === newLine[2][1] && newLine[2][1] === newLine[2][2]  && newLine[2][0] !== ''){
      return 'win'
    }else if (newLine[0][0] === newLine[1][0] && newLine[1][0] === newLine[2][0]  && newLine[0][0] !== ''){
      return 'win'
    }else if (newLine[0][1] === newLine[1][1] && newLine[1][1] === newLine[2][1]  && newLine[0][1] !== ''){
      return 'win'
    }else if (newLine[0][2] === newLine[1][2] && newLine[1][2] === newLine[2][2]  && newLine[0][2] !== ''){
      return 'win'
    }else if (newLine[0][0] === newLine[1][1] && newLine[1][1] === newLine[2][2]  && newLine[0][0] !== ''){
      return 'win'
    }else if (newLine[0][2] === newLine[1][1] && newLine[1][1] === newLine[2][0]  && newLine[0][2] !== ''){
      return 'win'
    }else {
      return 'draw'
    }
  }
  const gameReset = ():void =>{
    setLine([['','',''],['','',''],['','','']])
    setTurn('x')
    setTurnCount(0)
    setWinner(null)
  }
  return (
    <div className="w-full h-full flex ">
      <section className="w-[20%] p-2 h-full flex flex-col items-center justify-center bg-blue-400">
        <h1 className="w-full text-[2.5rem] text-center ">{players[0].name}</h1>
        <h1 className="mt-10 text-[8rem]">{players[0].point}</h1>
      </section>
      <section className="h-full w-[60%]">
        <div className="flex justify-center items-center w-full h-[20%]">
          {winner === null ? <h1 className="w-full text-center text-[3rem]">turn: {turn.toUpperCase()} </h1>
           :winner === 'draw' ? <h1 className="w-full text-center text-[3rem]">Game Draw</h1>
           :<h1 className="w-full text-center text-[3rem]">player {winner === 'X'? players[0].name : players[1].name} win!</h1>}
        </div>
        <div className="flex flex-col justify-start items-center w-full h-[80%]">
          <div className="flex flex-col w-full justify-center">
            {line.map((subline,index)=> {
              return <div key={index} className="flex w-full justify-center">
                {subline.map((e,subIndex)=>{
                  return   <p
                  key={subIndex}
                  className={`flex justify-center items-center text-[5rem] border-[0.5px] border-black w-[20%] aspect-square bg-gray-200 ${line[index][subIndex] === '' && 'cursor-pointer'}`}
                  onClick={() => setMove(index, subIndex)}
                >
                  {e.toUpperCase()}
                </p>
                })}
              </div>
            })}
          </div>
            {winner !== null && <button className="mt-4 text-[2rem] bg-amber-500 p-2 rounded-lg border-[1px] border-gray-400 shadow-md" onClick={gameReset}>Reset</button>}
        </div>
      </section>
      <section className="w-[20%] p-2 h-full flex flex-col items-center justify-center bg-red-400">
        <h1 className="w-full text-[2.5rem] text-center">{players[1].name}</h1>
        <h1 className="mt-10 text-[8rem]">{players[1].point}</h1>
      </section>

    </div>
  )
}
