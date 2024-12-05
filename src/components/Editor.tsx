import { useEffect, useState } from 'react'
import QuillEditor from './QuillEditor';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Game } from '../types/types';

// const baseURL_local = "http://localhost:5000";
const baseURL = "https://diamond365-backend.onrender.com"

export default function Editor() {
  const [content, setContent] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [game,setGame] = useState<Game>()
  const [updating,setUpdating] = useState(false);

  const handleContentChange = (updatedContent: string) => {
    setContent(updatedContent);
    console.log('Updated Content:', updatedContent);
  } 

  useEffect(()=>{
        axios.get(baseURL+"/api/v1/games/"+queryParams.get('id')).then((res)=>{
            console.log(res.data);
            setContent(res.data.data.game.description)
            setGame(res.data.data.game)
        })
        
  },[])


  const handleDescriptionSubmit =( ) =>{
    setUpdating(true);
    axios.put(baseURL+"/api/v1/games/"+queryParams.get('id'),{
        description:content
    }).then((res)=>{
        console.log(res.data);     
        setUpdating(false);
    })
  }
  return (
    <div className="min-h-screen p-[3rem] ">
        <button disabled={updating} onClick={handleDescriptionSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded fixed bottom-10 right-12">
        {updating?"Updateing...":'Submit'}
        </button>
      <div className={`flex gap-[1rem] py-[.5rem] cursor-pointer transition-all`} >
            <div className=''>
                <img className='w-[8rem] rounded-lg' src={baseURL+"/"+game?.image?.url} alt="" />
            </div>
            <div>
                <div className='flex-1'><span className='font-semibold mr-[1rem]'>Id:</span>{game?.id}</div>
                <div className='flex-1'><span className='font-semibold mr-[1rem]'>name:</span>{game?.name}</div>
                <div className='flex-1'><span className='font-semibold mr-[1rem]'>slug:</span>{game?.slug}</div>
                <div className='flex-1'><span className='font-semibold mr-[1rem]'>category:</span>{game?.category?.name}</div>
                <div className='flex-1'><span className='font-semibold mr-[1rem]'>type:</span>{game?.gameType?.name}</div>
                <div className='flex-1'><span className='font-semibold mr-[1rem]'>provider:</span>{game?.provider?.name}</div>
            </div>
        </div>
      <QuillEditor value={content} onChange={handleContentChange} />
      <div className="mt-8 ">
        <h2 className="text-xl font-semibold">Rendered HTML Content:</h2> 
        <div
          className="border p-4 mt-2 bg-gray-100 text-black"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div>
          
        </div>
      </div>
    </div>
  )
}
