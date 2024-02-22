import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Animated } from 'react-native';
import logo1 from '../items/logo1.png';
import menuIcon from '../items/menuIcon.png';
import s1 from '../items/sidebar/qmark.png';
import s2 from '../items/sidebar/location.jpg';
import s3 from '../items/sidebar/pin.jpeg';
import s4 from '../items/sidebar/lupe.jpg';
import s5 from '../items/sidebar/filter.png';
import s6 from '../items/sidebar/event.jpg';
import s7 from '../items/sidebar/camera.png';
import s8 from '../items/sidebar/comment.png';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIconRotated, setIsIconRotated] = useState(false);
  const [isTextMode, setIsTextMode] = useState(true);
  const slideAnimation = new Animated.Value(0);
  const headerWidth = isMenuOpen ? '27.4%' : '100%';

  const toggleMenu = () => {
    if (isMenuOpen) {
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setIsMenuOpen(false);
        setIsIconRotated(false);
      });
    } else {
      setIsMenuOpen(true);
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setIsIconRotated(true);
      });
    }
  };

  const toggleTextMode = () => {
    setIsTextMode(!isTextMode);
  };

  const menuStyle = {
    transform: [
      {
        translateX: slideAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -240],
        }),
      },
    ],
  };

  const menuItems = isTextMode
    ? ['Show Icons', 'Get your Location', 'Custom Location', 'Search', 'Filter', 'Add Event', 'Post Reel', 'Post Comment']
    : [s1, s2, s3, s4, s5, s6, s7, s8];

  const iconRotationStyle = {
    transform: [
      {
        rotate: isIconRotated ? '-90deg' : '0deg',
      },
    ],
  };

  const renderLogo = () => {
    if (isMenuOpen) {
      return (
        <Text style={styles.menuText}>Your App Name</Text>
      );
    } else {
      return (
        <Image source={logo1} style={styles.headerImage} />
      );
    }
  };

  const renderMenuItem = (item, index) => {
    if (item === 'Show Icons') {
      return (
        <TouchableOpacity
          key={index}
          style={styles.menuItems}
          onPress={toggleTextMode}
        >
          <View style={styles.itemView}>
            <Text style={styles.menuText}>{item}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          key={index}
          style={styles.menuItems}
          onPress={() => {
            if (item === s1) {
              toggleTextMode();
            }
          }}
        >
          <View style={styles.itemView}>
            {isTextMode ? (
              <Text style={styles.menuText}>{item}</Text>
            ) : (
              <Image source={item} style={styles.menuImage} />
            )}
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={[styles.headerContainer, { width: headerWidth }]}>
      <LinearGradient
        //colors={['rgba(9, 9, 174, 1)', 'rgba(143, 0, 245, 1)']}
        colors={['rgba(59, 92, 56, 1)', 'rgba(84, 140, 79, 1)']}
        style={styles.menuBackground}
      >
        <TouchableOpacity style={styles.rightContent}>
          {renderLogo()}
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleMenu} style={styles.leftContent}>
          <Image
            source={menuIcon}
            style={[styles.menuImage, iconRotationStyle]}
          />
        </TouchableOpacity>
      </LinearGradient>
      {isMenuOpen && (
        <Animated.View style={[styles.menu, menuStyle]}>
          <LinearGradient
           // colors={['rgba(143, 0, 245, 1)', 'rgba(9, 9, 174, 1)']}
            colors={['rgba(84, 140, 79, 1)', 'rgba(59, 92, 56, 0.5)']}
            style={styles.menuBackground}
          >
            {menuItems.map((item, index) => renderMenuItem(item, index))}
          </LinearGradient>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //backgroundColor: 'rgba(9, 9, 174, 1)',
    backgroundColor: 'rgba(59, 92, 56, 1)',
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  leftContent: {
    flex: 1,
    marginLeft: 10,
    marginBottom: 50,
    shadowColor: 'white',
    shadowOpacity: 0.3,

  },
  rightContent: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 20,

  },
  menuImage: {
    width: 50,
    height: 40,

  },
  headerImage: {
    width: 50,
    height: 58,
  },
  menu: {
    position: 'absolute',
    top: '400%',
    left: 0,
    width: '100%',
    height: 800,
  },
  menuBackground: {
    padding: 10,
    flex: 1,
  },
  menuItems: {
    padding: 10,
  },
  itemView: {},
  menuText: {
    fontSize: 15,
    color: 'white',
    //fontFamily: 'Calibri',
  },
});

export default Header;
