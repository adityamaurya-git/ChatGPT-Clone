export const UserInput = () => {

    const { register, handleSubmit, reset } = useForm();

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

    return (<>
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
    </>)
}