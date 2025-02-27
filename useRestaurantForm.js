import { useState, useEffect } from 'react';

const useRestaurantForm = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [menu, setMenu] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [menuDetails, setMenuDetails] = useState(null);
  const [error, setError] = useState(null);

  // Fetch Restaurants
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('https://private-anon-c1226abe2b-pizzaapp.apiary-mock.com/restaurants/');
        if (!response.ok) throw new Error('Failed to fetch restaurants');
        const data = await response.json();
        setRestaurants(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching restaurants:', err.message);
        setError('Failed to load restaurants.');
      }
    };
    fetchRestaurants();
  }, []);

  // Fetch Menu for Selected Restaurant
  useEffect(() => {
    if (selectedRestaurant) {
      const fetchMenu = async () => {
        try {
          const response = await fetch(
            `https://private-anon-c1226abe2b-pizzaapp.apiary-mock.com/restaurants/${selectedRestaurant}/menu?category=Pizza&orderBy=rank`
          );
          if (!response.ok) throw new Error('Failed to fetch menu');
          const data = await response.json();
          setMenu(data);
          setError(null);
        } catch (err) {
          console.error('Error fetching menu:', err.message);
          setError('Failed to load menu.');
        }
      };
      fetchMenu();
    } else {
      setMenu([]);
    }
  }, [selectedRestaurant]);

  // Set Menu Details for Selected Menu Item
  useEffect(() => {
    if (selectedMenu) {
      const selectedMenuItem = menu.find((item) => item.id.toString() === selectedMenu.toString());
      if (selectedMenuItem) {
        setMenuDetails(selectedMenuItem);
        setError(null);
      } else {
        setMenuDetails(null);
        setError('Menu item not found.');
      }
    } else {
      setMenuDetails(null);
    }
  }, [selectedMenu, menu]);

  return {
    restaurants,
    selectedRestaurant,
    setSelectedRestaurant,
    menu,
    selectedMenu,
    setSelectedMenu,
    menuDetails,
    error,
  };
};

export default useRestaurantForm;
