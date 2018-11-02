import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground
} from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { colors } from '../styles/Colors'

export default class HomeCard extends React.Component {
  render() {
    return (
      <View
        style={styles.container}
      >
        <View style={styles.imageContainer}>
          <Image
            source={this.props.source}
            resizeMode={'cover'}
            style={styles.image}
          />
        </View>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginTop: 20,
    borderRadius: 4,
    elevation: 1,
    overflow: 'hidden',
    backgroundColor: '#fff'

  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16/8,
    backgroundColor: '#ff0000',
    marginBottom: 10,
  },
  image: {
    flex: 1,
    width: '100%',
  },
  title: {
    marginBottom: 5,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryColor
  },
  text: {
    marginHorizontal: 10,
    marginBottom: 10,
    fontSize: 12,
    color: colors.secondaryColor
  }
});
