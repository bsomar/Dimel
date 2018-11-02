import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PumpField from '../components/pump/PumpField'

class PumpScreen extends Component {
  static navigationOptions = {
    title: 'Pompage solaire'
  }
  

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <PumpField/>
    );
  }
}

export default PumpScreen;
