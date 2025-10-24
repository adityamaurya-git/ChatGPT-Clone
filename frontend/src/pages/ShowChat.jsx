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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [touchStartX, setTouchStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const sidebarRef = useRef(null);
    const SIDEBAR_WIDTH = 288; // w-72 -> 18rem -> 288px
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

    // Touch / swipe handlers for mobile drawer
    const handleTouchStart = (e) => {
        if (!isSidebarOpen) return;
        setIsDragging(true);
        setTouchStartX(e.touches[0].clientX);
        setDragOffset(0);
    }

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const delta = currentX - touchStartX;
        if (delta < 0) {
            setDragOffset(Math.max(delta, -SIDEBAR_WIDTH));
        }
    }

    const handleTouchEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (dragOffset < -60) {
            setIsSidebarOpen(false);
        }
        setDragOffset(0);
    }


    useEffect(() => {
        getAllChats();
        const tempSocket = io("https://chatgpt-clone-ped1.onrender.com", {
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
        if (params.chatId){
            fetchMessages()
        }
        
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

            <div className="w-full min-h-screen h-screen flex flex-col md:flex-row">

            {/* overlay for mobile when sidebar open (animated) */}
            <div
                className={`fixed inset-0 z-20 md:hidden transition-opacity duration-300 ${isSidebarOpen ? 'bg-black/50 opacity-100 visible' : 'bg-black/0 opacity-0 invisible'}`}
                onClick={()=>setIsSidebarOpen(false)}
            />

            {/* Chat messages will go here */}
            <aside
                ref={sidebarRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={isDragging ? { transform: `translateX(${dragOffset}px)` } : undefined}
                className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed z-30 top-0 left-0 h-full w-72 md:static md:translate-x-0 md:w-1/4 transform transition-transform duration-300 ease-out bg-[#1D1D1D] border border-zinc-700 rounded-r-xl` }
            >
                <div className="w-full flex justify-between items-center px-4 py-3 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                        <button className="md:hidden px-2 py-1 rounded-md bg-zinc-700" onClick={()=>setIsSidebarOpen(false)} aria-label="Close chat list">
                            {/* X icon */}
                            <svg className="w-5 h-5 text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        <h1 className="text-sm font-semibold">Add Chat</h1>
                    </div>
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
            <div className="w-full md:w-3/4 h-screen md:h-full flex flex-col">

                {/* mobile header with menu toggle */}
                <div className="w-full flex items-center justify-between p-3 border-b border-zinc-800 md:hidden">
                    <button onClick={()=>setIsSidebarOpen(true)} className="px-2 py-1 rounded-md bg-zinc-800" aria-label="Open chat list">
                        {/* Hamburger icon */}
                        <svg className="w-6 h-6 text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                    <div className="text-sm font-semibold">{chats.find(c=>c._id===params.chatId)?.title || 'Chat'}</div>
                    <div />
                </div>

                <div className="w-full flex-1 overflow-y-auto p-3 sm:p-4">
                    {
                        (message.length > 0) ? message.map((msg) => {
                            return <div key={msg._id} className={` flex mt-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                {msg.role === "user" ? (
                                    <p className="p-2 mt-2 rounded-lg text-white border border-zinc-700 bg-zinc-800 max-w-[90%] md:max-w-[80%] wrap-break-word text-sm sm:text-base">
                                        {msg.content}
                                    </p>
                                ) : (
                                    <div className="p-2 mt-2 rounded-lg border bg-zinc-300 dark:bg-zinc-800 text-black dark:text-white max-w-[90%] md:max-w-[80%] wrap-break-word prose prose-sm dark:prose-invert border-zinc-700 text-sm sm:text-base">
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
                <div className="w-full flex-none p-2 sm:p-3">
                    <form
                        onSubmit={handleSubmit(inputHandler)}
                        className="w-full h-full flex flex-col sm:flex-row items-center gap-2 p-2">
                        <textarea
                            className="w-full px-3 py-2 text-sm sm:text-base rounded-xl resize-none border border-zinc-600"
                            {...register("content")}
                            type="text"
                            placeholder="Ask GPT" />

                        <input
                            className="w-full sm:w-auto px-3 py-2 rounded-xl border border-zinc-600 text-sm sm:text-base"
                            type="submit"
                            value="Send" />
                    </form>
                </div>

            </div>

        </div>
    </>)
}