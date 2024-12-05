export const getCitiesFromLocalStorage = (): string[] => {
    return JSON.parse(localStorage.getItem('cities') || '[]');
  };
  
  export const setCitiesToLocalStorage = (cities: string[]): void => {
    localStorage.setItem('cities', JSON.stringify(cities));
  };