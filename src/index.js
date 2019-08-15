import React, {Fragment} from 'react';
import {
  SafeAreaView,
  Image,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
} from 'react-native';

import Animated from 'react-native-reanimated';

export function App() {
  const HEADER_HEIGHT = Platform.OS === 'ios' ? 100 : 70 + StatusBar.currentHeight;
  const scrollY = new Animated.Value(0);
  const diffClampScrollY = new Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
  const headerY = new Animated.interpolate(diffClampScrollY, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT]
  });
  const images = [
    { id: 1, uri: require('./assets/1.jpg') },
    { id: 2, uri: require('./assets/2.jpg') },
    { id: 3, uri: require('./assets/3.jpg') },
  ];

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: HEADER_HEIGHT,
          backgroundColor: 'gray',
          zIndex: 1000,
          elevation: 1000,
          transform: [{ translateY: headerY }],
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 60,
        }}>
          <Text style={{ flex: 1}}>Animated Header</Text>
        </Animated.View>

        <Animated.ScrollView
          bounces={false}
          scrollEventThrottle={16}
          style={{ paddingTop: HEADER_HEIGHT }}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: scrollY } }
            }
          ])}
        >
          {images.map(image => (
            <View style={{ height: 400, margin: 20 }}>
              <Image
                source={image.uri}
                style={{ flex: 1, height: null, width: null, borderRadius: 10 }} 
              />
            </View>
          ))}
        </Animated.ScrollView>
    </Fragment>
  );
}

export default App;
