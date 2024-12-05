
import { RootState } from "../../store";

export const selectCity = (state: RootState, cityName: string) =>
    state.weather?.cities?.find((city) => city.name === cityName);
  
export const selectHourlyForecast = (state: RootState, cityName: string) =>
    state.weather?.forecast?.[cityName];
  