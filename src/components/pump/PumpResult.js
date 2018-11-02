import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { withNavigation } from 'react-navigation';

import { colors } from '../../styles/Colors';
import { Icon } from 'react-native-elements';

import { pumpFields } from './PumpField';
import CardResult from '../domestic/CardResult';

const MAX_VOLTAGE = 600;

class PumpResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.infos = {
      power: pumpFields.power,
      realPower: 0,
      powerWithLosses: 0,
      powerOfPanel: pumpFields.powerOfPanel,
      voltageOfPanel: 0,
      ampire: 0,
      numberOfPanels: 0,
      PanelsInSerial: 0,
      PanelsInParallel: 0
    }
  }

  calcRealPower() {
    let result = this.infos.power*750;
    this.infos.realPower = Number(result).toFixed(2);
    return Number(result).toFixed(2);
  }

  calcPowerWithLoss() {
    let result = this.infos.realPower*1.2
    this.infos.powerWithLosses = Number(result).toFixed(2);
    return Number(result).toFixed(2);
  }

  getPowerOfPanel() {
    /*Puissance de panneau choiser (W)*/
  }

  calcVoltageOfpanel(powerOfPanel) {
    switch(powerOfPanel) {
      case 250:
        this.infos.voltageOfPanel = 30.9;
        return 30.9;
      
      case 300:
      this.infos.voltageOfPanel = 37;
        return 37;
    }
  }

  calcAmpire(powerOfPanel) {
    switch(powerOfPanel) {
      case 250: 
        this.infos.ampire = 8.1;
        return 8.1;

      case 300:
        this.infos.ampire = 8.1;
        return 8.1;
    }
  }

  calcNumberOfPanels() {
    result = this.infos.powerWithLosses / this.infos.powerOfPanel;
    this.infos.numberOfPanels = Number(result).toFixed(2);

    return Number(result).toFixed(2);
  }

  calcNumberOfPanelsSerial() {
    let voltageOfPanel = this.infos.voltageOfPanel;
    let result = MAX_VOLTAGE / voltageOfPanel;
    this.infos.PanelsInSerial = Math.round(result);

    return Math.round(result);
  }

  calcNumberOfPanelsParallel() {
    let numberOfPanels = this.infos.numberOfPanels;
    let numberOfPanelsSerial = this.infos.PanelsInSerial;
    let result = numberOfPanels / numberOfPanelsSerial;
    this.infos.PanelsInParallel = Math.round(result);

    return Math.round(result);
  }

  render() {
    this.calcRealPower();
    this.calcPowerWithLoss();
    this.calcVoltageOfpanel(this.infos.powerOfPanel)
    this.calcAmpire(this.infos.powerOfPanel);
    this.calcNumberOfPanels();

    numberOfPanelsSerial = this.calcNumberOfPanelsSerial().toString();
    numberOfPanelsParallel = this.calcNumberOfPanelsParallel().toString();
    numberOfPanels = numberOfPanelsParallel*numberOfPanelsSerial;
    return (
      <View style={styles.container}>
        <CardResult source={require('../../assets/img/panel.png')}>
          <View style={styles.titleContainer}>
            <Image source={require('../../assets/img/icon_panel.png')}
              style={styles.icon}
            >
            </Image>
            <Text style={styles.titleText}>Panneaux</Text>
          </View>
          <Text style={styles.subTitleText}>Nombre des panneaux : {numberOfPanels}</Text>
          <Text style={styles.text}>En parallèles : {numberOfPanelsParallel}</Text>
          <Text style={styles.text}>En séries : {numberOfPanelsSerial}</Text>
        </CardResult>
        <TouchableOpacity
          style={styles.contactUsButton}
          onPress={() => this.props.navigation.navigate('Contact')}
        >
          <Icon
            name='phone'
            type='feather'
            color='#fff'
            size={20}
          />
          <Text style={styles.contactUsText}>CONTACTEZ NOUS</Text>
        </TouchableOpacity>
        <View style={styles.navBottom}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('HomeScreen')}
            style={styles.button}
          >
            <Icon
              name='home'
              type='feather'
              color={colors.primaryColor}
              size={26}
            />
            <Text style={styles.textFooterButton}>Page d'accueil</Text>
        
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

  titleText: {
    fontSize: 16,
    lineHeight: 40,
    fontWeight: '500',
    color: '#707070'
  },

  subTitleText: {
    fontSize: 14,
    lineHeight: 30,
    color: '#707070'
  },

  text: {
    fontSize: 12,
    lineHeight: 20,
    color: '#707070',
    paddingLeft: 10,
  },

  navBottom: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.07)',
    position: 'absolute',
    bottom: 0,
  },

  button: {
    height: 40,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  textFooterButton: {
    color: colors.primaryColor,
    marginHorizontal: 5,
    fontSize: 16,
    fontWeight: '600',
  },

  contactUsButton: {
    marginVertical: 20,
    width: '70%',
    height: 36,
    backgroundColor: '#27ae60',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 4,

  },

  contactUsText: {
    color: '#fff',
    fontWeight: '500',
    marginLeft: 10,
  }
})

export default withNavigation(PumpResult);
