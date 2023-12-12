import { useContext, createContext,useState } from "react";

interface Player { name: string; point: number };

export interface PlayerContextType  {
  players : Player[]
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

type ContextProviderProp = {
  children: React.ReactNode;
};

const ContextProvider: React.FC<ContextProviderProp> = ({children}) => {
  const [players,setPlayers] = useState<Player[]>([{name:'',point:0},{name:'',point:0}])

  return (
    <PlayerContext.Provider  value={{players, setPlayers}}>
      {children}
    </PlayerContext.Provider>
  )
}

export const useGlobalContext = () =>{
  return useContext(PlayerContext);
}

export {ContextProvider}
