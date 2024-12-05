import React, { useMemo } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material'

type WeatherCardProps = {
  city: string;
  temperature: number;
  description: string;
  onRefresh: () => void;
  onViewDetails: () => void;
  onRemove: () => void;
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ city, temperature, description, onRefresh, onViewDetails, onRemove  }) => {
  const kelvinToCelsius = useMemo(() => {
    return (temp: number) => Math.round(temp - 273.15);
  }, []);
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{city}</Typography>
        <Typography>{(kelvinToCelsius(temperature))}°C</Typography>
        <Typography>{description}</Typography>
        <Button variant="contained" color="primary" onClick={onRefresh}>
          Refresh
        </Button>
        <Button variant="outlined" color="secondary" onClick={onViewDetails}>
          View Details
        </Button>
        <Button variant="outlined" color="secondary" onClick={onRemove}>
          Remove City
        </Button>
      </CardContent>
    </Card>
  );
};
