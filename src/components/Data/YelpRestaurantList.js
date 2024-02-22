import React, { useEffect, useState } from 'react';
import axios from 'axios';

const YelpRestaurantList = () => {
    const [restaurantList, setRestaurantList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDataFromYelp = async () => {
            try {
                const apiKey = 'PxdY9dZ-Xkuf3KF8TylzxmmVG3eqz__ZSSgTLJnO9F2DfUmY7cZYungRZkB74AWIvVw57ObRc3rsTnS2rWPRfyDpAtNJJcS-SGJ9M9VNW8HYk4EDpHlT8CvBCD6dZXYx';
                const apiUrl = 'https://api.yelp.com/v3/businesses/search';

                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                    },
                    params: {
                        term: 'food', // Allgemeiner Begriff für verschiedene Arten von Locations
                        location: 'Wien',
                        limit: 50,
                    },
                });

                const formattedData = response.data.businesses.map((restaurant) => ({
                    name: restaurant.name,
                    location: {
                        latitude: restaurant.coordinates.latitude,
                        longitude: restaurant.coordinates.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    },
                    rating: restaurant.rating,
                }));

                setRestaurantList(formattedData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data from Yelp API:', error);
                setIsLoading(false);
            }
        };

        fetchDataFromYelp();
    }, []);

    return { restaurantList, isLoading }; // Rückgabe der Daten über ein Objekt
};

export default YelpRestaurantList;
