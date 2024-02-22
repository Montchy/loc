import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, Animated, Easing } from 'react-native';
import logo1 from '../items/logo1.png';

const StartSite = () => {
  const [isVisible, setIsVisible] = useState(true);
  const fadeAnim = new Animated.Value(0);

  const hideStartSite = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => setIsVisible(false));
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  return isVisible ? (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image source={logo1} style={styles.headerImage} />
      <Text style={styles.text}>Welcome to Wien Local!</Text>
      <Button title="Get Started" onPress={hideStartSite} />
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Set the background color
    justifyContent: 'center',
    alignItems: 'center',
    height: 1000,
    width: 1000
  },
  text: {
    fontSize: 24,
    margin: 20,
  },
  headerImage: {
    width: 200,
    height: 200,
  },
});

export default StartSite;
