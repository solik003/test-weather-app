
import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchWeatherData, fetchForecastData } from '../../redux/weather/weatherSlice';
import { Button } from '@mui/material';
import styles from './DetailedPage.module.scss';
import { WeatherChart } from '../../components/WeatherChart/WeatherChart';
import { selectCity, selectHourlyForecast } from '../../redux/weather/selectors/weatherSelectors';

export const DetailedPage: React.FC = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const kelvinToCelsius = useMemo(() => {
    return (temp: number) => Math.round(temp - 273.15);
  }, []);

  const city = useSelector((state: RootState) => selectCity(state, cityName || ''));
  const hourlyForecast = useSelector((state: RootState) => selectHourlyForecast(state, cityName || ''));

  useEffect(() => {
    if (cityName) {
      if (!city) {
        dispatch(fetchWeatherData(cityName));
      }
      if (!hourlyForecast) {
        dispatch(fetchForecastData(cityName)); 
      }
    }
  }, [cityName, city, hourlyForecast, dispatch]);


  if (!city) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{city.name}, {city.country}</h1>
      <p className={styles.info}>Temperature: {kelvinToCelsius(city.temperature)}°C</p>
      <p>Description: {city.description}</p>
      <p>Humidity: {city.humidity}%</p>
      <p>Wind speed: {city.windSpeed} м/с</p>
      <Button onClick={handleClick} variant="contained">
        Back to Home
      </Button>

      <h2 className={styles.forecastTitle}>Hourly forecast</h2>
      <div className={styles.chartContainer}>
        <WeatherChart hourlyForecast={hourlyForecast} />
      </div>
    </div>
  );
};

