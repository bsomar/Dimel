import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity 
} from 'react-native';

import { withNavigation } from 'react-navigation';

import { Icon } from 'react-native-elements';
import { colors } from '../../styles/Colors';

class FooterNavigation extends React.Component {

  renderLeftButton() {
    return ( 
      <TouchableOpacity 
        onPress={this.props.previousStep}
        style={styles.button}
      >
        <Icon
          name='chevron-left'
          type='feather'
          color={colors.primaryColor}
          size={26}
        />
        <Text style={styles.textFooterButton}>{this.props.textLeft.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }

  renderRightButton() {
    return (
      <TouchableOpacity 
        onPress={() => {
            this.props.nextStep();
            this.props.getCurrentStep() === 1 ? null : this.props.navigation.navigate('DomesticResultsScreen');
          }
        }
        style={[styles.button, {marginLeft: 'auto'}]}
      >
        <Text style={styles.textFooterButton}>{this.props.textRight.toUpperCase()}</Text>
        <Icon
          name='chevron-right'
          type='feather'
          color={colors.primaryColor}
          size={26}
        />
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={styles.navBottom}>
        {this.props.textLeft ? this.renderLeftButton() : null}
        {this.props.textRight ? this.renderRightButton() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navBottom: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#efefef',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.07)',
  },

  button: {
    height: 40,
    width: 120,
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
})

export default withNavigation(FooterNavigation);