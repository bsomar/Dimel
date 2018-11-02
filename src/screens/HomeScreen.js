import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import HomeCard from '../components/HomeCard';

import { colors } from '../styles/Colors';
import { Icon } from 'react-native-elements';


const DATA = {
  domestique: { id:1, title: 'Domestique et Eclairage', src: require('../assets/img/domestic.jpg'),
    text: "Une solution sur mésure qui s'intègre harmonieusement dans votre habitat. Dimel solaire vous propose de produire votre propre énergie verte et de la consommer à domicile" },
  pompe: { id:2, title: 'Pompage Solaire', src: require('../assets/img/pump.jpg'),
    text: 'Un système de pompage solaire au fil du soleil doit être dimensionné en fonction du débit souhaité et de la profondeur du forage.'},
};

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Accueil',
      drawerIcon: () => (
        <Icon name='home' type='feather'/>
      ),
      drawerLabel: 'Acceuil',
      headerLeft: (
        <View
          style={{margin: 13}}
        >
          <TouchableOpacity
            style={{padding: 3}}
            onPress={navigation.getParam('openDrawer')}
          >
            <Icon 
              type='feather'
              name='menu'
              size={24}
              color='white'
            />
          </TouchableOpacity>
        </View>
      )
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ openDrawer: this._openDrawer });
  }

  _openDrawer = () => {
    this.props.navigation.openDrawer();
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar
          hidden={false}
        />
        <ScrollView contentContainerStyle={styles.contentContainer} style={{flex: 1, width: '100%'}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DomesticScreen')}
          >
            <HomeCard
              title={DATA.domestique.title}
              text={DATA.domestique.text}
              source={DATA.domestique.src}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('PumpScreen')}
          >
            <HomeCard
              title={DATA.pompe.title}
              text={DATA.pompe.text}
              source={DATA.pompe.src}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef'
  },

  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },

  imageBackground: {
    width: '100%', 
    height: '100%', 
    position: 'absolute', 
    top: 0, 
    bottom: 0, 
    left:0,
    zIndex: -1,
    opacity: 0.3
  },
  overaly: {
    width: '100%', 
    height: '100%', 
    backgroundColor: '#000',
    opacity: 0.5
  }
});

