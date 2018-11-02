import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	StatusBar,
	ActivityIndicator,
} from 'react-native';

import * as firebase from 'firebase';

export default class SplashScreen extends React.Component {
	componentWillMount() {
		setTimeout(() => {
			firebase.auth().onAuthStateChanged(user => {
				this.props.navigation.navigate(user ? 'DrawerScreens' : 'RegisterScreen')
			})
		}, 2000)
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar
					hidden={true}
				/>
				<Image 
					source={require('../assets/img/logo.png')}
					style={styles.img}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#eee',
	},
	img: {
		flex: 1,
    width: '62%',
    resizeMode: 'contain'
	}
});