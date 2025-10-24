import { useEffect, useRef, useState } from "react"
import { instance } from "../api/axios.config"
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { TypingIndicator } from "../Components/TypingIndicator";
import { NewChat } from "../Components/NewChat";


export const ShowChat = () => {

    const [socket, setSocket] = useState(null);
    const { register, reset, handleSubmit } = useForm();
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState([]);
    const params = useParams();
    const messagesEndRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false);


    const [isNewChatOpen, setIsNewChatOpen] = useState(false);
    const navigate = useNavigate();


    const inputHandler = async (data) => {

        const userMessage = {
            _id: Date.now() * Math.random(),
            chat: params.chatId,
            content: data.content,
            role: "user"
        }

        setMessage((prevMessage) => [...prevMessage, userMessage]);

        if (socket) {
            socket.emit("ai-message", {
                chat: params.chatId,
                content: data.content
            });
        }
        reset();
    }

    const getAllChats = async () => {
        // Fetch chats from backend and setChats
        const { data } = await instance.get('/api/chat/get');
        setChats(data.chats);
    }


    const fetchMessages = async () => {
        const { data } = await instance.get(`/api/messages/${params.chatId}`);
        setMessage(data.messages)
    }



    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [message]);


    useEffect(() => {
        getAllChats();
        const tempSocket = io("http://localhost:3000", {
            withCredentials: true,
        });

        tempSocket.on("ai-response", (response) => {
            // console.log("Connected to socket server with ID:", response);
            setIsTyping(true);
            setMessage((prevMessage) => [...prevMessage, {
                _id: Date.now() * Math.random(),
                chat: response.chat,
                content: response.content,
                role: "model"
            }]);
        })

        setIsTyping(false);
        setSocket(tempSocket);
    }, [])

    useEffect(() => {
        fetchMessages()
    }, [params])

    const handleNewChatSubmit = async (data) => {
        const response = await instance.post('/api/chat/',data);

        setIsNewChatOpen(false);
        getAllChats();
        if(response.data.chat?._id){
            navigate(`/api/messages/${response.data.chat._id}`);
        }
    }

    return (<>
            <NewChat
            isOpen={isNewChatOpen}
            onClose={() => setIsNewChatOpen(false)}
            onSubmit={handleNewChatSubmit}/>

            <div className="w-full h-full flex">

            {/* Chat messages will go here */}
            <aside className="w-1/4 h-full rounded-r-xl border border-zinc-700 bg-[#1D1D1D]">
                <div className="w-full flex justify-between items-center px-4 py-3 border-b border-zinc-800">
                    <h1>Add Chat</h1>
                    <button
                        onClick={() => setIsNewChatOpen(true)}
                        className="w-7 h-7 rounded-full cursor-pointer bg-zinc-700">+</button>
                </div>
                <div className="w-full ">
                    {/* List of chats will go here */}
                    <h1 className="p-2 font-semibold text-zinc-500">Recent</h1>
                    <div className="w-full flex flex-col gap-2 p-2">
                        {/* Individual chat item */}
                        {chats.length > 0 ? chats.map((chat) => {
                            return <NavLink key={chat._id} to={`/api/messages/${chat._id}`} className="p-2 font-semibold rounded-3xl hover:bg-zinc-800">{chat.title}</NavLink>
                        }) : "No chats found"}
                    </div>
                </div>
            </aside>

            <div className="w-3/4 h-full">

                <div className="w-full h-[80vh]  overflow-y-auto p-4">
                    {
                        (message.length > 0) ? message.map((msg) => {
                            return <div key={msg._id} className={` flex mt-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                {msg.role === "user" ? (
                                    <p className="p-2 mt-2 rounded-lg text-white border border-zinc-700 bg-zinc-800 max-w-[80%] wrap-break-word">
                                        {msg.content}
                                    </p>
                                ) : (
                                    <div className="p-2 mt-2 rounded-lg border bg-zinc-300 dark:bg-zinc-800 text-black dark:text-white max-w-[80%] wrap-break-word prose prose-sm dark:prose-invert  border-zinc-700 ">
                                        <ReactMarkdown 
                                            remarkPlugins={[remarkGfm]}
                                            rehypePlugins={[rehypeHighlight]}
                                            
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                )}
                            </div>
                        }) : "No messages found"
                    }
                    {isTyping && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                </div>

                <div className="w-full h-[20vh]">
                    <form
                        onSubmit={handleSubmit(inputHandler)}
                        className="w-full h-full flex items-center gap-2 p-2">
                        <textarea
                            className="w-full px-3 py-2  rounded-xl resize-none border border-zinc-600"
                            {...register("content")}
                            type="text"
                            placeholder="Ask GPT" />

                        <input
                            className="px-3 py-2 rounded-xl border border-zinc-600"
                            type="submit"
                            value="Send" />
                    </form>
                </div>

            </div>

        </div>
    </>)
}