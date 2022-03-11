
import React from 'react';
import {
	View
} from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { StyleSheet } from 'react-native';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import RequestWizard from './DrawerScreens/Request/RequestWizard';
import Icon from 'react-native-elements/dist/icons/Icon';
import PendingListIcon from 'react-native-vector-icons/Ionicons';
import AccountPayable from './DrawerScreens/AccountPayble/AccountPayableScreen';
import ApproveListRequest from '../service/api/apiservice';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const dashboardScreenStack = ({ navigation }) => {
	const myPendingList = <Icon name="notifications" size={30} color="#ffff" onPress={() => navigation.navigate(ApproveListRequest != '' ? 'PendingListScreen' : console.log('data'))} />;
	return (
		<Stack.Navigator
			initialRouteName="RequestWizard"
			screenOptions={{
				headerLeft: () => (
					<NavigationDrawerHeader navigationProps={navigation} />
				),
				headerStyle: {
					backgroundColor: '#040485',
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
				},
			}}>
			<Stack.Screen
				name="RequestWizard"
				component={RequestWizard}
				options={{
					title: 'RequestWizard',
					headerRight: () => (
						<View style={{ margin: '2%' }}>
							{
								myPendingList
							}
						</View>
					),
				}} />

		</Stack.Navigator>
	);
};
const AccountPayablestack = ({ navigation }) => {

	return (
		<Stack.Navigator
			initialRouteName="AccountPayableScreen"
			screenOptions={{
				headerStyle: {
					backgroundColor: '#03509c',
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
				},
			}}>
			<Stack.Screen
				name="AccountPayableScreen"
				component={AccountPayable}
				options={{
					headerStyle: {
						backgroundColor: '#03509c',
					},
					title: 'AccountPayableScreen',
				}} />
		</Stack.Navigator>
	)
}
const DrawerNavigatorRoutes = (props) => {
	return (
		<Drawer.Navigator
			drawerContentOptions={{
				activeTintColor: '#cee1f2',
				color: '#cee1f2',
				itemStyle: { marginVertical: 5, color: 'white' },
				labelStyle: {
					color: '#d8d8d8',
				},
			}}
			screenOptions={{ headerShown: false }}
			drawerContent={CustomSidebarMenu}>
			<Drawer.Screen
				name="dashboardScreenStack"
				options={{ drawerLabel: 'Request Wizard' }}
				component={dashboardScreenStack}
			/>
			{/* <Drawer.Screen
				name="settingScreenStack"
				options={{ drawerLabel: 'Setting Screen' }}
				component={settingScreenStack}
			/> */}
			<Drawer.Screen
				name="account"
				options={{ drawerLabel: 'dashboard Screen' }}
				component={AccountPayablestack}
			/>
		</Drawer.Navigator>
	);
};

export default DrawerNavigatorRoutes;

const styles = StyleSheet.create({
	icons: {
		flexDirection: 'row',
		paddingTop: 7,
		paddingLeft: 5,
		size: 50,
	},
})