import { useState } from 'react';
import { useGlobalContext } from './Context/playerContext';
import { PlayerContextType } from './Context/playerContext';
import { useToast } from '@chakra-ui/react'
import { GamePlay } from './GamePlay';

function App() {
  const toast = useToast()
  const {players,setPlayers} = useGlobalContext() as PlayerContextType
  const [player1, setPlayer1] = useState<string>('')
  const [player2, setPlayer2] = useState<string>('')
  const [page,setPage] = useState<number>(1)

  const letsGoOnClick = ():void =>{
    let newPlayers = [...players]

    if (player1 && player2){
      newPlayers[0].name = player1
      newPlayers[1].name = player2
      setPlayers(newPlayers)
      setPage(2)
    }else
    toast({
      title: 'Please fill both players.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <div className=' w-screen h-screen flex justify-center items-center bg-slate-200'>
      {page === 1 &&
      <section className='flex flex-col gap-5 w-[30%]  items-end bg-white p-5 rounded-md shadow-md'> 
        <h1 className='w-full text-center font-bold text-[2rem]'>Tic Tac Toe</h1>
        <div className='mt-2 w-full'>  
          <h6 className='text-[1.5rem]'>player 1</h6>
          <input className='mt-2 bg-gray-100 w-full h-[2rem] pl-2 text-[1.2rem]' onChange={(e)=>setPlayer1(e.target.value)}></input>
        </div>
        <div className='mt-2 w-full'>  
          <h6 className='text-[1.5rem]'>player 2</h6>
          <input className='mt-2 bg-gray-100 w-full h-[2rem] pl-2 text-[1.2rem]' onChange={(e)=>setPlayer2(e.target.value)}></input>
        </div>
        <button className='mt-2 w-fit h-fit p-2 rounded-xl bg-green-300 hover:bg-green-400' onClick={letsGoOnClick}>Let's Gooo</button>
      </section>
      }
      {page ===2 && <GamePlay/>}
    </div>

  );
}

export default App;
