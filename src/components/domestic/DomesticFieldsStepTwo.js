import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Picker,
  ImageBackground,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';

import FooterNavigation from './NavBottom';

import { colors } from '../../styles/Colors';
import { Icon } from 'react-native-elements';

import { stepOneFieldValues } from '../../screens/DomesticScreen';

export default class DomesticFieldsStepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      irradation: 4,
      panelPower: 85,
      panelVoltage: 22.3,
      maxAmpire: 5.27,
      autonomyNumber: 3,
      systemVoltage: 12,
      batteryCapacity: 65,
    }

    this.selectRegion = this.selectRegion.bind(this)
  }

  saveDomesticElement = () => {
    this.props.saveStepTwo(this.state);
  } 

  renderCheckIcon() {
    return (
      <Icon
        name='check'
        type='feather'
        color='#fff'
        size={60}
        style={styles.icon}
      />
    )
  }

  selectRegion(valueRegion) {
    let autonomyNumber = this.calcAutonomyNumber(valueRegion);
    this.setState({
      irradation: valueRegion,
      autonomyNumber: autonomyNumber
    }, function() {
      this.saveDomesticElement();
    })
  }

  calcPanelVoltage(value) {
    switch(value) {
      case 85:
        return 22.3;
      
      case 100:
        return 22.1;

      case 150:
        return 22.7

      case 200:
        return 29.6;

      case 250:
        return 36.6;

      case 300:
        return 44.8;
    }
  }

  calcMaxAmpire(value) {
    switch(value) {
      case 85:
        return 5.27;
      
      case 100:
        return 6.1;

      case 150:
        return 8.3

      case 200:
        return 8.63;

      case 250:
        return 8.75;

      case 300:
        return 8.7;
    }
  }

  calcAutonomyNumber(value) {
    switch(value) {
      case 4:
        return 3;

      case 5:
        return 2;

      case 6:
        return 2;
    }
  }

  calcSystemVoltageRcmd = () => {
    let power = this.calcPowerPhotovoltaic();
    if (power < 600)
      return '12';
    if (power < 2000)
      return '24';
    if (power < 10000)
      return '48';
    if (power > 10000)
      return '> 48';
  }

  getK() {
    k = 0.7;
    return k;
  }

  sumWhDay() {
    let length = stepOneFieldValues.length;
    let sum = 0;
    for (i=0; i<length; i++) {
      sum = sum + stepOneFieldValues[i].whDay;
    }
    return sum;
  }

  calcPowerPhotovoltaic = () => {
    let sumWhDay = this.sumWhDay();
    let k = this.getK();
    let irradation = this.state.irradation;
    let result = sumWhDay/(k*irradation);
    return Number(result).toFixed(2);
  }

  render() {
    panelPowerData = [{
      value: '85'
    }, {
      value: '100'
    }, {
      value: '150'
    }, {
      value: '200'
    }, {
      value: '250'
    }, {
      value: '300'
    },]

    systemVoltageData = [{
      value: '12'
    }, {
      value: '24'
    }, {
      value: '48'
    }]

    batteriesCapacityData = [{
      value: '65'
    }, {
      value: '100'
    }, {
      value: '120'
    }, {
      value: '150'
    }, {
      value: '180'
    }, {
      value: '200'
    },]

    let {
      irradation,
      panelPower,
      panelVoltage,
      maxAmpire,
      autonomyNumber,
      batteryCapacity,
      systemVoltage,
    } = this.state;

    let systemVoltageRcmd = 'Tension Recommandée : ' + this.calcSystemVoltageRcmd() + ' V';

    return (
      <View style={styles.container}>
          <Text style={styles.title}>Région</Text>
          <View style={styles.imagesContainer}>
            <Animatable.View
              animation="zoomIn" easing="ease-in-out-back" iterationCount={1}
              duration={255} delay={0}
              style={styles.imageContainer}
            >
              <TouchableOpacity
                onPress={this.selectRegion.bind(this, 4)}
              >
                <ImageBackground 
                  source={require('../../assets/img/coastal_region.jpg')}
                  style={styles.imageBG}
                >
                  <View style={styles.overlay}></View>
                  {this.state.irradation == 4 ? this.renderCheckIcon() : null}
                  <Text style={styles.textImage}>Région cotière</Text>
                </ImageBackground>
              </TouchableOpacity>
            </Animatable.View >
            
            <Animatable.View
              animation="zoomIn" easing="ease-in-out-back" iterationCount={1}
              duration={255} delay={100}
              style={styles.imageContainer}
            >
              <TouchableOpacity
                onPress={this.selectRegion.bind(this, 5)}
              >
                <ImageBackground 
                  source={require('../../assets/img/high_plateaus.jpg')}
                  style={styles.imageBG}
                >
                  <View style={styles.overlay}></View>
                  {this.state.irradation == 5 ? this.renderCheckIcon() : null}
                  <Text style={styles.textImage}>Haut Plateaux</Text>
                </ImageBackground>
              </TouchableOpacity>
            </Animatable.View>

            <Animatable.View
              animation="zoomIn" easing="ease-in-out-back" iterationCount={1}
              duration={255} delay={200}
              style={styles.imageContainer}
            >
              <TouchableOpacity
                onPress={this.selectRegion.bind(this, 6)}
              >
                <ImageBackground 
                  source={require('../../assets/img/sahara.jpg')}
                  style={styles.imageBG}
                >
                  <View style={styles.overlay}></View>
                  {this.state.irradation == 6 ? this.renderCheckIcon() : null}
                  <Text style={styles.textImage}>Sahara</Text>
                </ImageBackground>
              </TouchableOpacity>
            </Animatable.View>
          </View>
          
          <Text style={styles.title}>Puissance du Panneau (W)</Text>
          <View style={styles.textInputContainer}>
            <Dropdown
              label=''
              labelHeight={0}
              data={panelPowerData}
              value={this.state.panelPower}
              onChangeText={(value) => {
                panelPower = Number(value);
                panelVoltage = this.calcPanelVoltage(panelPower);
                maxAmpire = this.calcMaxAmpire(panelPower);
                this.setState({
                  panelPower: panelPower,
                  panelVoltage: panelVoltage,
                  maxAmpire: maxAmpire,
                }, function() {
                  this.saveDomesticElement();
                })
              }}
            />
          </View>
          
          <Text style={styles.title}>Tension du système (V)</Text>
          <View style={styles.textInputContainer}>
            <Dropdown
              label=''
              labelHeight={0}
              data={systemVoltageData}
              title= {systemVoltageRcmd}
              value={this.state.systemVoltage}
              onChangeText={(value) => {
                systemVoltage = value;
                this.setState({
                  systemVoltage: systemVoltage
                }, function() {
                  this.saveDomesticElement();
                })
              }}
            />
          </View>

          <Text style={styles.title}>Capacité Batterie (F)</Text>
          <View style={styles.textInputContainer}>
            <Dropdown
              label=''
              labelHeight={0}
              data={batteriesCapacityData}
              value={this.state.batteryCapacity}
              onChangeText={(value) => {
                batteryCapacity = value;
                this.setState({
                  batteryCapacity: batteryCapacity
                }, function() {
                  this.saveDomesticElement();
                })
              }}
            />
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },

  title: {
    color: colors.primaryColor,
    fontSize: 16,
    marginBottom: 10,
  },

  textInputContainer: {
    width: '50%',
    backgroundColor: '#fff',
    marginBottom: 30
  },

  textInputTitle: {
    fontSize: 12,
    color: colors.secondaryColor,
  },

  textInput: {
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    color: colors.secondaryColor,
  },

  listRegion: {
    height: 64,
    backgroundColor: '#f9f9f9'
  },

  regionItem: {
    fontSize: 12,
  },

  imagesContainer: {
    flexDirection: 'row',
    marginBottom: 30
  },

  imageContainer: {
    width: '30%',
    aspectRatio: 1,
    marginHorizontal: '1.5%',
  },

  imageBG: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center'
  },

  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },

  textImage: {
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
    color: '#fff',
    marginHorizontal: 'auto'
  },

  icon: {
    marginTop: '50%',
  },
})