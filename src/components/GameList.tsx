import axios from 'axios';
import { useEffect, useState } from 'react';
import { Category, Game, GameType, Provider } from '../types/types';
import { Link } from 'react-router';

// const baseURL_local = "http://localhost:5000";
const baseURL = "https://diamond365-backend.onrender.com"

export default function GameList() {
  const [games, setGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [gameTypes, setGameTypes] = useState<GameType[]>([]);
  const [selected, setSelected] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProvider, setSelectedProvider] = useState("All");
  const [selectedGameType, setSelectedGameType] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(baseURL + "/api/v1/games");
        const res2 = await axios.get(baseURL + "/api/v1/categories");
        const res3 = await axios.get(baseURL + "/api/v1/providers");
        const res4 = await axios.get(baseURL + "/api/v1/game-types");
        setGames(res.data.data);
        setCategories([{ id: "All", name: "All" }, ...res2.data]);
        setProviders([{ id: "All", name: "All" }, ...res3.data]);
        setGameTypes([{ id: "All", name: "All" }, ...res4.data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const filterGames = () => {
    return games.filter((game) => {
      const matchesCategory =
        selectedCategory === "All" || game.category?.name === selectedCategory;
      const matchesProvider =
        selectedProvider === "All" || game.provider?.name === selectedProvider;
      const matchesGameType =
        selectedGameType === "All" || game.gameType?.name === selectedGameType;
      const matchesDescription =
        selected === "All"
          ? true
          : selected === "Done"
          ? game.description !== ""
          : game.description === "";

      return matchesCategory && matchesProvider && matchesGameType && matchesDescription;
    });
  };

  const clearFilters = () => {
    setSelected("All");
    setSelectedCategory("All");
    setSelectedProvider("All");
    setSelectedGameType("All");
  };

  return (
    <div className="px-[10rem] mt-[1rem]">
      {/* Categories, Providers, and Game Types */}
      <div className="mb-4">
        <div className="font-bold text-lg">Categories:</div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`cursor-pointer px-4 py-2 rounded-md ${
                selectedCategory === category.name ? "bg-yellow-200" : "bg-zinc-200"
              } text-black shadow-md`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </div>
          ))}
        </div>
        <div className="font-bold text-lg mt-4">Providers:</div>
        <div className="flex gap-2 flex-wrap">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className={`cursor-pointer px-4 py-2 rounded-md ${
                selectedProvider === provider.name ? "bg-yellow-200" : "bg-zinc-200"
              } text-black shadow-md`}
              onClick={() => setSelectedProvider(provider.name)}
            >
              {provider.name}
            </div>
          ))}
        </div>
        <div className="font-bold text-lg mt-4">Game Types:</div>
        <div className="flex gap-2 flex-wrap">
          {gameTypes.map((gameType) => (
            <div
              key={gameType.id}
              className={`cursor-pointer px-4 py-2 rounded-md ${
                selectedGameType === gameType.name ? "bg-yellow-200" : "bg-zinc-200"
              } text-black shadow-md`}
              onClick={() => setSelectedGameType(gameType.name)}
            >
              {gameType.name}
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-x-3 mb-4">
        <div className="text-[1.2rem] px-[1rem] py-[.2rem] rounded-md bg-black text-white">
          Filter
        </div>
        <div
          onClick={() => setSelected("All")}
          className={`cursor-pointer hover:bg-zinc-300 text-[1rem] px-[1rem] py-[.2rem] rounded-md ${
            selected === "All" ? "bg-yellow-200" : "bg-zinc-200"
          }`}
        >
          All
        </div>
        <div
          onClick={() => setSelected("Done")}
          className={`cursor-pointer hover:bg-zinc-300 text-[1rem] px-[1rem] py-[.2rem] rounded-md ${
            selected === "Done" ? "bg-yellow-200" : "bg-zinc-200"
          }`}
        >
          Done
        </div>
        <div
          onClick={() => setSelected("Unavailable")}
          className={`cursor-pointer hover:bg-zinc-300 text-[1rem] px-[1rem] py-[.2rem] rounded-md ${
            selected === "Unavailable" ? "bg-yellow-200" : "bg-zinc-200"
          }`}
        >
          Unavailable
        </div>
        <div
          onClick={clearFilters}
          className="cursor-pointer bg-red-500 text-white px-[1rem] py-[.2rem] rounded-md hover:bg-red-700"
        >
          Clear Filters
        </div>
      </div>

      {/* Game List */}
      <div className="flex justify-between mt-[1rem] py-[1rem] px-[1rem] uppercase font-semibold text-white bg-black rounded-t-md">
        <div className="w-[2rem] flex-1">image</div>
        <div className="flex-1">id</div>
        <div className="flex-1">name</div>
        <div className="flex-1">slug</div>
        <div className="flex-1">category</div>
        <div className="flex-1">game-type</div>
        <div className="flex-1">provider</div>
        <div className="flex-1">description</div>
      </div>
      {filterGames().map((game, i) => (
        <Link to={`/editor/?id=${game.id}`} key={game.slug + i}>
          <div
            className={`${
              i % 2 === 0 && "bg-zinc-100"
            } flex justify-between py-[.5rem] px-[1rem] items-center cursor-pointer hover:bg-yellow-300 transition-all`}
          >
            <div className="flex-1">
              <img
                className="w-[2rem] rounded-lg"
                src={"http://127.0.0.1:5000/" + game.image?.url}
                alt=""
              />
            </div>
            <div className="flex-1">{game.id}</div>
            <div className="flex-1">{game.name}</div>
            <div className="flex-1">{game.slug}</div>
            <div className="flex-1">{game.category?.name}</div>
            <div className="flex-1">{game.gameType?.name}</div>
            <div className="flex-1">{game.provider?.name}</div>
            <div className="flex-1 font-semibold">
              {game.description === "" ? (
                <div className="text-red-600">unavailable</div>
              ) : (
                <div className="text-blue-600">Done!</div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
