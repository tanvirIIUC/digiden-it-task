import { useEffect, useState, useRef, FC } from "react";
import { useDispatch } from "react-redux";
import { useGetWeather } from "../../hooks/useGetWeather";
import { fetchWeatherData, WeatherData } from "../../redux/features/getWeatherDataSlice";
import { AppDispatch } from "../../redux/store";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

interface NavbarProps {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  }

const Navbar: FC<NavbarProps>  = ({isDarkMode,setIsDarkMode}) => {

    const [searchName, setSearchName] = useState("");
    const [city, setCity] = useState("dhaka");
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { data } = useGetWeather(city);

    useEffect(() => {
        // Load search history from localStorage
        const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
        setSearchHistory(history);
    }, []);

    useEffect(() => {
        if (data) {
            dispatch(fetchWeatherData(data as WeatherData));
        }
    }, [dispatch, data]);


    const handleSearch = () => {
        if (!searchName.trim()) return;
        setCity(searchName);

        // Add to search history (localStorage)
        const oldHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
        const updatedHistory = [searchName, ...oldHistory.filter((city: string) => city !== searchName)].slice(0, 5); // Limit to 5

        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
        setSearchHistory(updatedHistory);
        setIsInputFocused(false);
    };

    const handleHistoryClick = (city: string) => {
        setSearchName(city);
        setCity(city);
        setIsInputFocused(false);
    };

    const handleClearHistory = () => {
        localStorage.removeItem("searchHistory");
        setSearchHistory([]);
        setSearchName("");
        setIsInputFocused(false);
    };

    const handleInputFocus = () => setIsInputFocused(true);

useEffect(()=>{
   
    const theme = localStorage.getItem("theme");
    if(!theme){
        localStorage.setItem("theme", "light");
    }
},[])

    // Toggle dark mode
    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            localStorage.setItem("theme", "dark");
          
        } else {
            localStorage.setItem("theme", "light");
           
        }
    };
    return (
        <div className="top-0 fixed w-full z-10 flex lg:flex-row justify-between items-center flex-col p-4 px-10 text-white bg-gray-900 gap-4">
            <div>
                <h1 className="text-3xl font-bold">
                    Weather<span className="text-blue-700">HUNT</span>
                </h1>
            </div>
            <div className="relative flex gap-3 items-center">
                {
                    isDarkMode ?
                        <button
                            onClick={handleToggle}
                            className=" cursor-pointer text-white p-2 rounded-full"
                        >
                            <MdOutlineDarkMode className="w-6 h-6"/>
                        </button>
                        :
                        <button
                            onClick={handleToggle}
                            className="cursor-pointer text-white p-2 rounded-full"
                        >   
                            <MdDarkMode className="w-6 h-6" />
                        </button>
                }

                <input
                    onChange={(e) => setSearchName(e.target.value)}
                    value={searchName}
                    onFocus={handleInputFocus}

                    className="rounded-sm border px-2 py-1 bg-white text-black"
                    type="text"
                    placeholder="Search city..."
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-700 cursor-pointer text-white px-3 py-1 rounded-sm"
                >
                    Search
                </button>

                {isInputFocused && searchHistory.length > 0 && (
                    <div
                        ref={dropdownRef}
                        className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto pb-2"
                    >
                        <ul className="space-y-1">
                            {searchHistory.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleHistoryClick(item)}
                                    className="cursor-pointer text-blue-600 hover:bg-gray-100 px-2 py-1"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={handleClearHistory}
                            className="text-red-500 text-xs cursor-pointer underline mt-2 block w-full text-center"
                        >
                            Clear History
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
