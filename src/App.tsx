
import { useEffect, useState } from "react"
import Footer from "./components/shared/Footer"
import Navbar from "./components/shared/Navbar"
import Home from "./pages/home/Home"

function App() {
  const [theme,setThem]=useState<string>("")
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(()=>{
     const theme = localStorage.getItem("theme");
     setThem(theme as string)
     if(theme==="dark"){
      setIsDarkMode(true)
     }else{
      setIsDarkMode(false)
     }

  },[isDarkMode])
  return (
    <div className={` min-h-screen ${theme==="light" ?"bg-blue-100" :"bg-gray-800"}`}>
      <Navbar
      isDarkMode={isDarkMode}
       setIsDarkMode={setIsDarkMode}  />
      <div className="min-h-screen">
      <Home/>
      </div>
     
      <Footer/>
    </div>
  )
}

export default App
