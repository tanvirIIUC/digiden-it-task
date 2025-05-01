
import Footer from "./components/shared/Footer"
import Navbar from "./components/shared/Navbar"
import Home from "./pages/home/Home"


function App() {

  return (
    <div className="bg-blue-100 min-h-screen">
      <Navbar />
      <div className="min-h-screen">
      <Home/>
      </div>
     
      <Footer/>
    </div>
  )
}

export default App
