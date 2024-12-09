import { useEffect, useState } from 'react'
// import QuillEditor from './QuillEditor';
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

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedContent = e.target.value; // assuming this is how you want to update the content
    setContent(updatedContent);
    console.log('Updated Content:', updatedContent);
  }

  const wordHtmlMap = {
    "Game Overview": '<h1 className="" style="font-size:1.3rem; margin-top:1rem; margin-bottom:.5rem;">Game Overview</h1>',
    "How to Play": '<h1 style="font-size:1.3rem; margin-top:1rem; margin-bottom:.5rem;">How to Play</h1>',
    "log in or create an account here": '<a  style="color: #DCBE5A;" href="https://diamond365.vercel.app/auth" target="_blank">log in or create an account here</a>',
    "Diamond365 India": '<a style="color: #DCBE5A;" href="https://diamond365.vercel.app/" target="_blank">Diamond365 India</a>',
    "Place Your Bet":"<strong>Place Your Bet</strong>",
    "Side Bets (Optional)":"<strong>Side Bets (Optional)</strong>",
    "Wait for the Draw":"<strong>Wait for the Draw</strong>",
    "Win Real Money":"<strong>Win Real Money</strong>",
    "Main Bet":"<strong>Main Bet</strong>",
    "Side Bets":"<strong>Side Bets</strong>",
    "Card Matching":"<strong>Card Matching</strong>",
    "Payouts":"<strong>Payouts</strong>",
    "break":"<br/>"

  };
  
  // Function to analyze and transform text
  const analyzeAndTransform = (inputString:string) => {
    let outputHtml = inputString;
    for (const [word, htmlWrapper] of Object.entries(wordHtmlMap)) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi'); // Match whole words, case-insensitive
      outputHtml = outputHtml.replace(regex, htmlWrapper);
    }
    return outputHtml;
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
    const improvedContent = analyzeAndTransform(content);
    axios.put(baseURL+"/api/v1/games/"+queryParams.get('id'),{
        description:improvedContent
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
        <textarea className='w-full h-[60vh] bg-zinc-200 p-[1rem] rounded-md mt-[1rem] shadow-2xl' value={content} onChange={(e)=>handleContentChange(e)} id=""></textarea>
        <div dangerouslySetInnerHTML={{ __html: analyzeAndTransform(content) }}/>
        
    </div>
  )
}
