import React, { Component } from 'react';
import { StyleSheet ,View, Text, ImageBackground } from 'react-native';

class CardResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infos}>
          {this.props.children}
        </View>
        <ImageBackground style={styles.imageBackground}
          source={this.props.source}
        >
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
  },

  infos: {
    flex: 7,
    paddingVertical: 20,
  },

  imageBackground: {
    flex: 3,
    height: '80%',
  }
})

export default CardResult;
