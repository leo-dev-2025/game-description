import axios from 'axios'
import { useEffect, useState } from 'react'
import { Game } from '../types/types'
import { Link } from 'react-router'

export default function GameList() {
  const [games, setGames] = useState<Game[]>([])
  const [selected, setSelected] = useState("All")

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get("https://diamond365-backend.onrender.com/api/v1/games");
        setGames(res.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchGames();
  }, [])

  const filterGames = () => {
    if (selected === "Done") {
      return games.filter(game => game.description !== "");
    } else if (selected === "Unavailable") {
      return games.filter(game => game.description === "");
    } else {
      return games;
    }
  }

  return (
    <div className='px-[10rem] mt-[1rem]'>
      <div className='flex gap-x-3'>
        <div className='text-[1.2rem] px-[1rem] py-[.2rem] rounded-md bg-black text-white'>Filter</div>
        <div
          onClick={() => setSelected("All")}
          className={`cursor-pointer hover:bg-zinc-300 text-[1rem] px-[1rem] py-[.2rem] rounded-md ${selected === "All" ? "bg-yellow-200" : "bg-zinc-200"}`}
        >
          All
        </div>
        <div
          onClick={() => setSelected("Done")}
          className={`cursor-pointer hover:bg-zinc-300 text-[1rem] px-[1rem] py-[.2rem] rounded-md ${selected === "Done" ? "bg-yellow-200" : "bg-zinc-200"}`}
        >
          Done
        </div>
        <div
          onClick={() => setSelected("Unavailable")}
          className={`cursor-pointer hover:bg-zinc-300 text-[1rem] px-[1rem] py-[.2rem] rounded-md ${selected === "Unavailable" ? "bg-yellow-200" : "bg-zinc-200"}`}
        >
          Unavailable
        </div>
      </div>
      <div className='flex justify-between mt-[1rem]  py-[1rem] px-[1rem] uppercase font-semibold text-white bg-black rounded-t-md'>
        <div className='w-[2rem] flex-1'>image</div>
        <div className='flex-1'>id</div>
        <div className='flex-1'>name</div>
        <div className='flex-1'>slug</div>
        <div className='flex-1'>category</div>
        <div className='flex-1'>game-type</div>
        <div className='flex-1'>provider</div>
        <div className='flex-1'>description</div>
      </div>
      {filterGames().map((game, i) => {
        return (
          <Link to={`/editor/?id=${game.id}`} key={game.slug + i}>
            <div className={`${i % 2 === 0 && "bg-zinc-100"} flex justify-between py-[.5rem] px-[1rem] items-center cursor-pointer hover:bg-yellow-300 transition-all`}>
              <div className='flex-1'>
                <img className='w-[2rem] rounded-lg' src={"http://127.0.0.1:5000/" + game.image?.url} alt="" />
              </div>
              <div className='flex-1'>{game.id}</div>
              <div className='flex-1'>{game.name}</div>
              <div className='flex-1'>{game.slug}</div>
              <div className='flex-1'>{game.category?.name}</div>
              <div className='flex-1'>{game.gameType?.name}</div>
              <div className='flex-1'>{game.provider?.name}</div>
              <div className='flex-1 font-semibold'>{game.description === "" ? <div className='text-red-600'>unavailable</div> : <div className='text-blue-600'>Done!</div>}</div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
