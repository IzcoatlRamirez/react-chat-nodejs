import io from 'socket.io-client'
import { useState ,useEffect} from 'react'

const socket = io();

function App() {

  const [message,setMessage] = useState("")
  const [messages,setMessages] = useState([])


  const handleSubmit = (e) =>{
    e.preventDefault()
    const newMessage = {
      body:message,
      from: 'Me'
    }
    setMessages([...messages,newMessage])
    socket.emit('message',message);
  }

  useEffect(()=>{
    socket.on('message',recieveMessage);

    return ()=>{
      socket.off('message',recieveMessage);
    };
 }, []);


  const recieveMessage = (message) => 
    setMessages((state)=>[...state,message])

  return (
    <div className='h-screen bg-zinc-900 text-white flex items-start justify-center'>
      <form onSubmit={handleSubmit} className='bg-zinc-900 p-10'>
        <h1 className='text-2xl font-bold my-2'>Chat</h1>
        <input type='text'
        placeholder='write your message'
        className='border-2 border-zinc-500 p-2 w-full text-black rounded-md focus:outline-none'
        onChange={(e)=> setMessage(e.target.value)}>
        </input>
        <ul>
          {
            messages.map((message,i) => (
              <li key={i} className={
                `my-2 p-2 table text-sm rounded-md ${message.from == 'Me' ?
                'bg-sky-500 ml-auto' : 'bg-purple-500'
                }`

              } 
              ><span className='text-xs text-slate-100 font-bold block'>{message.from}</span>{message.body}</li>
            ))
          }
      </ul>
      </form>

    </div>
  )
}

export default App