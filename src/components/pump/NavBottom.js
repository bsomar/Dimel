import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text,
  TouchableOpacity, 
} from 'react-native';

import { withNavigation } from 'react-navigation';

import { Icon } from 'react-native-elements';
import { colors } from '../../styles/Colors';

class NavBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let containerStyle = this.props.containerStyle
    return (
      <View style={[styles.container, containerStyle]}>
        <TouchableOpacity 
          onPress={() => {
              this.props.navigation.navigate('PumpResultScreen');
            }
          }
          style={[styles.button, {marginLeft: 'auto'}]}
        >
          <Text style={styles.textFooterButton}>{this.props.text.toUpperCase()}</Text>
          <Icon
            name='chevron-right'
            type='feather'
            color={colors.primaryColor}
            size={26}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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

export default withNavigation(NavBottom);
