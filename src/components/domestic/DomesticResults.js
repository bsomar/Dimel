import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import CardResult from './CardResult';

import { colors } from '../../styles/Colors';
import { Icon } from 'react-native-elements';

const depthDischarge = 0.8;
const numAutonomy = 3;
const listPower = [100, 150, 200, 250, 300, 350, 500,
  700, 750, 800, 1000, 1200, 1500, 2000, 3000, 4000, 
  5000, 6000, 8000, 10000]

const listAmpire = [10, 20, 30, 35, 40, 45, 60, 80, 100, 120]

import {stepOneFieldValues} from '../../screens/DomesticScreen';
import {stepTwoFieldValues} from '../../screens/DomesticScreen';

class DomesticResults extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    
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
  
  sumPt() {
    let length = stepOneFieldValues.length;
    let sum = 0;
    for (i=0; i<length; i++) {
      sum = sum + stepOneFieldValues[i].pt;
    }
    return sum;
  }

  calcPowerPhotovoltaic = () => {
    let sumWhDay = this.sumWhDay();
    let k = this.getK();
    let irradation = stepTwoFieldValues.irradation;
    let result = sumWhDay/(k*irradation);
    return Number(result).toFixed(2);
  }

  calcCapacityBattery = () => {
    let sumWhDay = this.sumWhDay();
    let systemVoltage = stepTwoFieldValues.systemVoltage;
    let autonomyNumber = stepTwoFieldValues.autonomyNumber;
    let result = sumWhDay*autonomyNumber/(depthDischarge*systemVoltage);
    return Number(result).toFixed(2);
  }

  calcNumBatteries = () => {
    let capacityBattery = this.calcCapacityBattery();
    let capacityBatteryChosen = stepTwoFieldValues.batteryCapacity;
    let result = capacityBattery/capacityBatteryChosen;
    return Math.floor(result);
  }

  calcNumBatteriesSerial = () => {
    let systemVoltage = stepTwoFieldValues.systemVoltage;
    let result = systemVoltage / 12;

    return Math.floor(result);
  }

  calcNumBatteriesParallel = () => {
    let numBatteries = this.calcNumBatteries();
    let numBatteriesParallel = this.calcNumBatteriesSerial();
    let result = numBatteries / numBatteriesParallel;

    return Math.floor(result);
  }

  calcNumberPanel = () => {
    let power = this.calcPowerPhotovoltaic();
    let panelPower = stepTwoFieldValues.panelPower;
    let result = power / panelPower;
    
    if (result < 1) {
      return Math.ceil(result)
    } else {
      return Math.round(result);
    }
  }

  calcNumberPanelSerial = () => {
    let systemVoltage = stepTwoFieldValues.systemVoltage;
    let panelVoltage = stepTwoFieldValues.panelVoltage;
    let result = systemVoltage / panelVoltage;

    return Math.ceil(result);
  }

  calcNumberPanelParallel = () => {
    let numberPanel = this.calcNumberPanel();
    let numberPanelSerial = this.calcNumberPanelSerial();
    let result = numberPanel / numberPanelSerial;

    return Math.ceil(result);
  }

  calcRegAmpire = () => {
    let numberPanelParallel = this.calcNumberPanelParallel();
    maxAmpire = stepTwoFieldValues.maxAmpire;
    let result = maxAmpire*numberPanelParallel;

    let length = listAmpire.length;
    for (let i=0; i < length; i++) {
      if (result <= listAmpire[i]) return listAmpire[i];
    }
    return listAmpire[length-1];
  }

  calcRegVoltage = () => {
    let numberPanelSerial = this.calcNumberPanelSerial();
    let panelVoltage = stepTwoFieldValues.panelVoltage;
    let result = panelVoltage*numberPanelSerial;

    return Number(result).toFixed(1);
  }

  calcConvPower = () => {
    let result = this.sumPt()*1.25;
    let length = listPower.length;
    for (let i=0; i < length; i++) {
      if (result <= listPower[i]) return listPower[i];
    }
    return listPower[length-1];
  }

  calcConvVoltage = () => {
    let result = stepTwoFieldValues.systemVoltage;

    return Number(result).toFixed(0);
  }
  

  render() {
    let powerPhotovoltaic = this.calcPowerPhotovoltaic().toString();
    let numberPanelSerial = this.calcNumberPanelSerial().toString();
    let numberPanelParallel = this.calcNumberPanelParallel().toString();
    let numberPanel = Number(numberPanelSerial)*Number(numberPanelParallel).toString();

    let capacityBattery = this.calcCapacityBattery().toString();
    let numBatteries = this.calcNumBatteries().toString();
    let numBatteriesParallel = this.calcNumBatteriesParallel().toString();
    let numBatteriesSerial = this.calcNumBatteriesSerial().toString();

    let regAmpire = this.calcRegAmpire().toString();
    let regVoltage = this.calcRegVoltage().toString();
    let convPower = this.calcConvPower().toString();
    let convVoltage = this.calcConvVoltage().toString();

    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1, width: '100%'}}>
          <CardResult>
            <View style={styles.titleContainer}>
              <Image source={require('../../assets/img/icon_power.png')}
                style={styles.icon}
              >
              </Image>
              <Text style={styles.titleText}>Puissance</Text>
            </View>
            <Text style={styles.subTitleText}>Puissance du champ photovoltaique (W) : {powerPhotovoltaic}</Text>
          </CardResult>

          <CardResult source={require('../../assets/img/panel.png')}>
            <View style={styles.titleContainer}>
              <Image source={require('../../assets/img/icon_panel.png')}
                style={styles.icon}
              >
              </Image>
              <Text style={styles.titleText}>Panneaux</Text>
            </View>
            <Text style={styles.subTitleText}>Nombre des panneaux : {numberPanel}</Text>
            <Text style={styles.text}>En parallèles : {numberPanelParallel}</Text>
            <Text style={styles.text}>En séries : {numberPanelSerial}</Text>
          </CardResult>

          <CardResult source={require('../../assets/img/battery.png')}>
            <View style={styles.titleContainer}>
              <Image source={require('../../assets/img/icon_battery.png')}
                style={styles.icon}
              >
              </Image>
              <Text style={styles.titleText}>Batteries</Text>
            </View>
            <Text style={styles.subTitleText}>Capacité de batterie (Ah) : {capacityBattery}</Text>
            <Text style={styles.subTitleText}>Nombre des batteries : {numBatteries}</Text>
            <Text style={styles.text}>En parallèles : {numBatteriesParallel}</Text>
            <Text style={styles.text}>En séries : {numBatteriesSerial}</Text>
          </CardResult>

          <CardResult source={require('../../assets/img/reg.png')}>
            <View style={styles.titleContainer}>
              <Image source={require('../../assets/img/icon_reg.png')}
                style={styles.icon}
              >
              </Image>
              <Text style={styles.titleText}>Régulateur de charge</Text>
            </View>
            
            <Text style={styles.subTitleText}>Le courant (A) : {regAmpire}</Text>
            <Text style={styles.subTitleText}>La tension (V) : {regVoltage}</Text>
          </CardResult>

          <CardResult source={require('../../assets/img/conv.png')}> 
            <View style={styles.titleContainer}>
              <Image source={require('../../assets/img/icon_conv.png')}
                style={styles.icon}
              >
              </Image>
              <Text style={styles.titleText}>Convertisseur</Text>
            </View>
            <Text style={styles.subTitleText}>La puissance (W) : {convPower}</Text>
            <Text style={styles.subTitleText}>La tension (V) : {convVoltage}</Text>
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

        </ScrollView>
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

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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

  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    alignSelf: 'center',
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

export default withNavigation(DomesticResults);
