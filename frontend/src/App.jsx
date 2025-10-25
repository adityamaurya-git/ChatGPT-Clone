import { useEffect } from "react";
import { MainRoutes } from "./routes/MainRoutes"
import { currentUserAction } from "./store/actions/userAction";
import { useDispatch } from "react-redux";

export const App = () =>{

  

  return(<>
    <main className="w-full h-full font-sans text-zinc-200 bg-zinc-950">
      <MainRoutes />
    </main>
  </>)
}