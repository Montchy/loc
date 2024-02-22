import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './src/components/Header';
import StartSite from './src/components/StartSite';
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location";
import YelpRestaurantList from './src/components/Data/YelpRestaurantList'; // Den tatsächlichen Pfad ersetzen
import bluepin from './src/items/sbluepin.png'

export default function App() {
    const [userLocation, setUserLocation] = useState(null);
    const { restaurantList, isLoading } = YelpRestaurantList();



    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation(location.coords);
        };

        getLocation();
    }, []);

    useEffect(() => {
        console.log('Größe der restaurantList:', restaurantList.length);
    }, [restaurantList]);

    function testfunc (){
        console.log("Facny");
    }

    return (
        <View style={styles.container}>
            <View style={styles.overlayContainer}>
                <MapView
                    style={styles.map}
                    onPress={testfunc}
                    initialRegion={userLocation ? {
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    } : undefined}
                >
                    {userLocation && (
                        <Marker
                            coordinate={{
                                latitude: userLocation.latitude,
                                longitude: userLocation.longitude,
                            }}
                            title="Your Location"
                            pinColor="blue"
                        />
                    )}

                    {isLoading ? null : (
                        restaurantList.map((restaurant, index) => (
                            <Marker

                                key={index}
                                coordinate={restaurant.location}
                                title={restaurant.name}
                                description={`Rating: ${restaurant.rating}`}
                                image={bluepin}
                            />
                        ))
                    )}
                </MapView>
                <Header />
                <StartSite />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0
    },


});
