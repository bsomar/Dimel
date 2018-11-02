import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements'

import DomesticResults from '../components/domestic/DomesticResults';

export default class DomesticResultsScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Résultats - Domestique et Eclairage',
  };

  componentDidMount() {
    this.props.navigation.setParams({ goToHome: this._goToHome });
  }

  _goToHome = () => {
    this.props.navigation.navigate('HomeScreen')
  }

  render() {
    return (
      <View style={styles.container}>
        <DomesticResults/>
      </View>
      
    );
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
  }
})
