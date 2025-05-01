import { useEffect, useState } from "react";

interface WeatherData {
  name: string;
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

export const useGetWeather = (city: string) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError("");
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );        
        const weather = await res.json();
        setData(weather);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { data, loading, error };
};
