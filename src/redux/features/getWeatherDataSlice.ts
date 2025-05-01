import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WeatherData {
  base: string;
  clouds: {
    all: number;
  };
  cod: number | string;
  coord: {
    lon: number;
    lat: number;
  };
  dt: number;
  id: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  visibility: number;
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
}


interface WeatherState {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  weatherData: null,
  loading: true,
  error: null,
};

export const fetchWeatherData = createAsyncThunk<
  WeatherData,           
  WeatherData,          
  { rejectValue: string }
>(
  "data/fetchPostsData",
  async (data, { rejectWithValue }) => {
    try {
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching data");
    }
  }
);

export const getWeatherSlice = createSlice({
  name: "getWeather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWeatherData.fulfilled,
        (state, action: PayloadAction<WeatherData>) => {
          state.loading = false;
          state.weatherData = action.payload;
        }
      )
      .addCase(
        fetchWeatherData.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default getWeatherSlice.reducer;
