import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

const stautsBarHeight = StatusBar.currentHeight;
const headerHeight = stautsBarHeight*1.618;
const navHeight = stautsBarHeight*1.618*1.618;

import DomesticElement from './DomesticElement';

import { Icon } from 'react-native-elements';
import { colors } from '../../styles/Colors';

import * as Animatable from 'react-native-animatable';

export default class DomesticFieldsStepOne extends React.Component {
  constructor(props) {
    super(props);
    this.idAllocator = 0;
    this.state = {
      domesticArray: [],
    }

    this.addDomesticElement = this.addDomesticElement.bind(this);
    this.saveDomesticElement = this.saveDomesticElement.bind(this);
    this.deleteDomesticElement = this.deleteDomesticElement.bind(this);
  }

  addDomesticElement() {
    const newItem = {
      id: ++this.idAllocator,
      quantity: 0,
      watt: 0,
      duration: 0,
      whDay: 0,
      pt: 0,
    };
    this.setState(({domesticArray}) => {
      return {domesticArray: [...domesticArray, newItem]};
    });

    this.props.saveStepOne(this.state.domesticArray)
  }

  saveDomesticElement (elem) {
    const index = this.state.domesticArray.findIndex((item) => item.id === elem.id);
    const savedItem = {
      id: elem.id,
      quantity: elem.quantity,
      watt: elem.watt,
      duration: elem.duration,
      whDay: elem.whDay,
      pt: elem.pt,
    };

    let newDomesticArray = this.state.domesticArray;
    newDomesticArray[index] = savedItem;

    this.setState((prevState) => ({
      domesticArray: newDomesticArray
    }));

    this.props.saveStepOne(this.state.domesticArray)
  }

  deleteDomesticElement (elem) {
    const index = this.state.domesticArray.findIndex((item) => item.id === elem.id);
    
    let newDomesticArray = this.state.domesticArray;
    newDomesticArray.splice(index, 1);

    this.setState((prevState) => ({
      domesticArray: newDomesticArray
    }));;

    this.props.saveStepOne(this.state.domesticArray)
  }

  sumWhDay = () => {
    domesticArray = this.state.domesticArray;
    let length = domesticArray.length;
    let sum = 0;
    for (i=0; i<length; i++) {
      sum = sum + domesticArray[i].whDay;
    }
    return sum;
  }

  render() {
    let listDomestic = this.state.domesticArray.map((item) => 
      <DomesticElement 
        key={item.id}
        id={item.id}
        saveDomesticElement={this.saveDomesticElement}
        deleteDomesticElement={this.deleteDomesticElement}
      />
    );

    let sumWhDay = this.sumWhDay();

    return (
      <View style={styles.container}>
        <StatusBar/>
        <View style={styles.header}>
          <View style={styles.headerWrapper}>
            <View style={[styles.areaTextHeader, {flex: 1}]}>
              <Text style={styles.textHeader}>Qte</Text>
            </View>
            <View style={[styles.areaTextHeader, {flex: 1}]}>
              <Text style={styles.textHeader}>Watt</Text>
            </View>
            <View style={[styles.areaTextHeader, {flex: 1}]}>
              <Text style={styles.textHeader}>Hr/J</Text>
            </View>
            <View style={[styles.areaTextHeader, {flex: 1, alignItems: 'flex-end'}]}>
              <Text style={styles.textHeader}>Wh/J</Text>
            </View>
          </View>
        </View>
        
          <ScrollView style={{flex: 1, width: '100%'}}
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight)=>{        
                this.scrollView.scrollToEnd({animated: true});
            }}
          >
            <KeyboardAvoidingView style={{flex: 1, width: '100%'}}>
              {listDomestic}
              <View style={styles.footerListDomestic}>
                <Text style={styles.textFooter}>Total Besoin de journée</Text>
                <Text style={styles.textFooter}>{sumWhDay}</Text>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
          
        <Animatable.View
          style={styles.addButton}
          animation="zoomIn" easing="ease-in-out-back" iterationCount={1}
          duration={512} delay={0}
        >
          <TouchableOpacity
            onPress={this.addDomesticElement}
            style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}
          >
            <Icon
              name='plus'
              type='feather'
              color='white'
              size={26}
            />
          </TouchableOpacity>
        </Animatable.View>
        
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#f9f9f9'
  },

  header: {
    width: '100%',
    height: headerHeight,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: colors.secondaryColor,
  },

  headerWrapper: {
    width: '95%',
    flexDirection: 'row',
    paddingVertical: 10,
    alignSelf: 'center',
  },

  areaTextHeader: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 3,
  },

  textHeader: {
    fontSize: 12,
    color: '#fff',
  },

  flatList: {
    flex: 1,
    backgroundColor: '#eee'
  },

  containerFooter: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },

  textFooter: {
    fontSize: 18,
    fontWeight: '500'
  },

  addButton: {
    position: 'absolute',
    zIndex: 300,
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    zIndex: 10,
    backgroundColor: colors.primaryColor,
  },

  footerListDomestic: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textFooter: {
    fontSize: 18,
    fontWeight: '500'
  }
  
})
