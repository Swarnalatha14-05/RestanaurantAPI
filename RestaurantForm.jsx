import React from 'react';
import useRestaurantForm from './useRestaurantForm';
import './Restaurant.css'

const RestaurantForm = () => {
  const {
    restaurants,
    selectedRestaurant,
    setSelectedRestaurant,
    menu,
    selectedMenu,
    setSelectedMenu,
    menuDetails,
    error,
  } = useRestaurantForm();

  const handleRestaurantChange = (e) => {
    setSelectedRestaurant(e.target.value);
    setSelectedMenu(''); 
  };

  const handleMenuChange = (e) => {
    setSelectedMenu(e.target.value);
  };

  const selectedRestaurantDetails = restaurants.find(
    (restaurant) => restaurant.id.toString() === selectedRestaurant.toString()
  );

  return (
    <div>
      <h1>Restaurant Menu Filter</h1>
      <form>
        {/* Restaurant Dropdown */}
        <div>
          <label>Select Restaurant:</label>
          <select value={selectedRestaurant} onChange={handleRestaurantChange}>
            <option value="">Select a Restaurant</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>

        {/* Menu Dropdown */}
        {selectedRestaurant && menu.length > 0 && (
          <div>
            <label>Select Menu:</label>
            <select value={selectedMenu} onChange={handleMenuChange}>
              <option value="">Select a Menu</option>
              {menu.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} - ${item.price}
                </option>
              ))}
            </select>
          </div>
        )}
      </form>

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Filtered Results */}
      {menuDetails && (
        <div>
          <h2>Menu details</h2>
          <p>
            <strong>Restaurant Name:</strong> {selectedRestaurantDetails?.name || 'N/A'}
          </p>
          <p>
            <strong>Menu Item:</strong> {menuDetails.name || 'N/A'}
          </p>
          <p>
            <strong>Price:</strong> ${menuDetails.price || 'N/A'}
          </p>
        </div>
      )}
    </div>
  );
};

export default RestaurantForm;
