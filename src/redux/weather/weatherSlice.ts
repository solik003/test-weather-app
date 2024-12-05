
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface CityWeather {
  name: string;
  country: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

interface WeatherState {
  cities: CityWeather[];
  forecast: { [key: string]: any[] }; 
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  cities: JSON.parse(localStorage.getItem('cities') || '[]'),
  forecast: {},
  loading: false,
  error: null,
};

export const fetchWeatherData = createAsyncThunk<CityWeather, string>(
  'weather/fetchWeatherData',
  async (cityName: string, { rejectWithValue }) => {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d9e4a9668c69db88f1e983b2d8f89976`
      );
      if (!weatherResponse.ok) throw new Error('Weather data fetch failed');
      const weather = await weatherResponse.json();

      return {
        name: weather.name,
        country: weather.sys.country,
        temperature: weather.main.temp,
        description: weather.weather[0].description,
        humidity: weather.main.humidity,
        windSpeed: weather.wind.speed,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch weather data');
    }
  }
);


export const fetchForecastData = createAsyncThunk<any[], string>(
  'weather/fetchForecastData',
  async (cityName: string, { rejectWithValue }) => {
    try {
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=d9e4a9668c69db88f1e983b2d8f89976`
      );
      if (!forecastResponse.ok) throw new Error('Forecast data fetch failed');
      const forecast = await forecastResponse.json();

      return forecast.list.slice(0, 8); 
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch forecast data');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    removeCity: (state, action) => {
      state.cities = state.cities.filter((city) => city.name !== action.payload);
      localStorage.setItem('cities', JSON.stringify(state.cities));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        const weatherData = action.payload;
        
        
        const cityExists = state.cities.find((city) => city.name === weatherData.name);
        if (!cityExists) {
          state.cities.push(weatherData);
          localStorage.setItem('cities', JSON.stringify(state.cities));
        }

        state.loading = false;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchForecastData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecastData.fulfilled, (state, action) => {
        const hourlyForecast = action.payload;

        
        const cityName = action.meta.arg;
        state.forecast[cityName] = hourlyForecast;
        state.loading = false;
      })
      .addCase(fetchForecastData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { removeCity } = weatherSlice.actions;

export default weatherSlice.reducer;

