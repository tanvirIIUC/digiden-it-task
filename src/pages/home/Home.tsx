import { useSelector } from "react-redux";
import WeatherMap from "../../components/weatherMap/WeatherMap";
import { RootState } from "../../redux/store";

const Home = () => {
    const { weatherData, loading, error } = useSelector((state: RootState) => state.weatherData);
    const lat = weatherData?.coord?.lat ?? 0; 
    const lon = weatherData?.coord?.lon ?? 0;
    const city = weatherData?.name ?? '';
    if (loading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
          </div>
        );
      }

    if (error) {
        return <p className="text-red-600 font-semibold text-2xl text-center mt-10">Something went wrong.</p>
    }
    if (weatherData?.cod === '404') {
        return <p className="text-red-600 font-semibold text-2xl text-center mt-10">City not found.</p>
    }
    return (<div className=" flex flex-col items-center lg:pt-20 pt-36">
        {weatherData?.main && (
            // bg-gray-900
            <div className="mt-4 flex lg:w-[800px] w-[350px] justify-between items-center bg-white text-center space-y-2 border border-white p-4 m-3 lg:m-0 rounded-md shadow-md">
                <div>
                    <h2 className="lg:text-3xl font-bold">{weatherData.name}</h2>

                    <div className="flex flex-col items-center">
                        <img
                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                            alt="weather icon"
                            className="lg:w-20 w-10 lg:h-20 h-10"
                        />
                        <p className="capitalize lg:text-xl">{weatherData.weather[0].description}</p>
                    </div>
                </div>
                <div>
                    <p className="lg:text-2xl">🌡 Temp: <strong>{weatherData.main.temp}°C</strong></p>
                </div>

                <div>
                    {/* Temperature, Humidity, Wind */}

                    <p>💧 Humidity: <span className="font-semibold">{weatherData.main.humidity}%</span></p>
                    <p>💨 Wind Speed: <span className="font-semibold"> {weatherData.wind.speed} m/s</span></p>
                </div>

            </div>
        )}

        {lat && lon && (
            <WeatherMap lat={lat as number} lon={lon as number} city={city as string} />

        )}



    </div>)
}

export default Home;