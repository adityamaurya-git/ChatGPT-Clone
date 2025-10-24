import { useForm } from "react-hook-form";

export const NewChat = ({isOpen , onClose , onSubmit}) => {

    const { register, handleSubmit, reset , formState:{errors} } = useForm();

    if(!isOpen) return null;

    const newChatHandler = (data) => {
        onSubmit(data);
        reset();
    }

    return (
        // Overlay: covers the entire screen
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={onClose} // Close modal if clicking outside
        >
            {/* Modal Content: use stopPropagation to prevent clicks inside from closing it */}
            <div
                className="bg-[#1D1D1D] border border-zinc-700 rounded-lg p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold mb-4">Create New Chat</h2>

                <form onSubmit={handleSubmit(newChatHandler)}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-zinc-300 mb-1">
                            Chat Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            {...register("title", { required: "Title is required" })}
                            className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., React project discussion"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg cursor-pointer bg-zinc-700 hover:bg-zinc-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg cursor-pointer bg-blue-600 hover:bg-blue-500"
                        >
                            Create Chat
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}