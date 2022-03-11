import { useState, useEffect } from 'react';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem } from 'react-native-elements';
import { event } from 'react-native-reanimated';
import {
    Alert, Text, Pressable, View, StyleSheet, ImageBackground, BackHandler
} from "react-native";
import { Searchbar } from 'react-native-paper';
import Intl from 'intl';
import "intl/locale-data/jsonp/en";
import { ToastAndroid } from 'react-native';
import InternetBar from '../Components/internetConnector';
import ModalSearch from '../Components/modalsearch';
import {getCompanyRequest} from '../../service/api/apiservice';

const RequestWizard = ({ navigation: { navigate } }) => {
    const [ClientId, setClientId] = useState('');
    const [UserId, setUserId] = useState('');
    const [listItems, setlistItems] = useState([]);
    const [data, setData] = useState([]);
    const [DropdownData, setDropdownData] = useState();
    const [Balance, setBalance] = useState('');
    const [Bank, setBank] = useState('');
    const [Pay, setPay] = useState('');
    const [rec, setrec] = useState('');
    const [search, setSearch] = useState('');
    const [CompanyId, setCompanyId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [CmpName, setCpmName] = useState('');


    const onChangeSearch = (query) => {
        if (query) {
            const newData = listItems.filter(
                function (item) {
                    const itemData = item.CompanyName
                        ? item.CompanyName.toUpperCase()
                        : ''.toUpperCase();
                    const textData = query.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                }
            );
            setData(newData);
            setSearchQuery(query);

        } else {
            setData(listItems);
            setSearchQuery(query);

        }
    };


    useEffect(() => {
        retrieveData();
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to exit app?", [
                {
                    text: "NO",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: 'YES', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();

    }, [ClientId, UserId]);

    const retrieveData = async () => {
        const valueString = await AsyncStorage.getItem('clientId');
        setClientId(valueString);
        const userid = await AsyncStorage.getItem('userId');
        setUserId(userid);

        let data = {
            //  ClientId: ClientId,
            //  UserId: UserId,
           ClientId: 1,
            UserId: 1,
        };

        const response = await getCompanyRequest(data);
        const datas = await response.json();
       
        setlistItems(datas);
        setData(datas);
    };

    const actionOnRow = (item) => {
        setCpmName(item.CompanyName);
        setModalVisible(false);
        var CompanyId = item.CompanyId;
        setCompanyId(item.CompanyId);
        let getCompanyCashBalance = {
            ClientId: ClientId,
            UserId: UserId,
            CompanyId: CompanyId,
        };
        fetch('http://192.168.1.117/mobileapp2.0/public/application/management/companyabstractdetails',
            {
                method: 'POST',
                body: JSON.stringify(getCompanyCashBalance),
            },
        )
            .then(async response => {
                try {
                    var data = await response.json();
                    const pay = data.Payable;
                    setPay(pay.toLocaleString('en-IN'));
                    setrec(data.Receivable.toLocaleString('en-IN')),
                        setBank(data.CashBank.toLocaleString('en-IN'));
                } catch (error) {
                    console.log(error);
                }
            });
    }
    function handleChange() {
        // Here, we invoke the callback with the new value
        setModalVisible(false)
    }
    return (<View style={styles.container}>
        <InternetBar />
        <View style={styles.centeredView}>
            {/* <ModalSearch visible={modalVisible} data={data} onChange={handleChange} onChangeSearch={onChangeSearch} /> */}
            <ModalSearch visible={modalVisible} data={data} onChange={handleChange} onChangeSearch={onChangeSearch} searchQuery={searchQuery} actionOnRow={actionOnRow} />
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>{CmpName ? CmpName : 'Select Company'}</Text>
            </Pressable>
        </View>

        <ListItem style={styles.listItem1} onPress={() => { Pay ? navigate('AccountPayableScreen', { CompanyId: CompanyId }) : ToastAndroid.show('Please select company name', ToastAndroid.SHORT) }}>
            <ImageBackground style={styles.listimg} imageStyle={{ borderRadius: 20 }} source={{ uri: 'asset:/images/list3.jpg' }}>
                <ListItem.Title style={styles.list}>Account Payable </ListItem.Title>
                <ListItem.Subtitle style={styles.list} >₹ {Pay}</ListItem.Subtitle>
            </ImageBackground>
        </ListItem>
        <ListItem style={styles.listItem2} onPress={() => { rec ? navigate('AccountReceivableScreen', { CompanyId: CompanyId }) : ToastAndroid.show('Please select company name', ToastAndroid.SHORT) }}>
            <ImageBackground style={styles.listimg} imageStyle={{ borderRadius: 20 }} source={{ uri: 'asset:/images/list1.jpg' }}>
                <ListItem.Title style={styles.list}>Account  Receivable </ListItem.Title>
                <Text style={styles.list}>₹ {rec}</Text>
            </ImageBackground>
        </ListItem>
        <ListItem style={styles.listItem3} onPress={() => { rec ? navigate('BankDetailsScreen', { CompanyId: CompanyId }) : ToastAndroid.show('Please select company name', ToastAndroid.SHORT) }}>
            <ImageBackground style={styles.listimg} imageStyle={{ borderRadius: 20 }} source={{ uri: 'asset:/images/list2.jpg' }}>
                <ListItem.Title style={styles.list} >Fund Availability </ListItem.Title>
                <Text style={styles.list}> ₹ {Bank}</Text>
            </ImageBackground>
        </ListItem>
    </View>


    );
}

export default DashboardScreen;

const styles = StyleSheet.create({

    listimg: {
        width: '100%',
        height: 120,
        resizeMode: 'contain',


    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    listlinearview:
    {
        backgroundColor: '#EAEDED',
    },

    list: {
        flex: 0,
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        padding: 5,
        fontWeight: 'bold',
        paddingTop: '5%',


    },
    centeredView1: {
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

    },
    centeredView:
    {
        // flex: 0,
        // justifyContent: "center",
        // alignItems: "center",
    },
    maincontainer:
    {
        marginTop: 15,

    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        width: '80%',
        alignItems: "center",
        // shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 15,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        width: '90%',
        marginTop: '5%',
        marginLeft: '5%',
        // backgroundColor: "#fff",
        textAlign: 'center'
    },
    buttonClose: {
        backgroundColor: "gray",
    },
    textStyle: {
        color: "#014587",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
        paddingBottom: 10,
        paddingTop: 10,

    },
    itemTitle: {
        paddingBottom: 10,
        color: "black",
        fontSize: 15,
        fontWeight: 'bold',
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    flatlist: {
        fontSize: 20,
        padding: 8,
        fontWeight: 'bold',
        color: 'blue',
    },
    listItem1: {
        marginTop: '0%',
        marginLeft: '0%',
        width: '100%',
        // backgroundColor: '#EAEDED',
    },
    listItem2: {
        marginTop: '0%',
        width: '100%',
        marginLeft: '0%',
        // backgroundColor: '#EAEDED',
    },
    listItem3: {
        marginTop: '0%',
        width: '100%',
        marginLeft: '0%',
        // backgroundColor: '#EAEDED',
    },
    container: {
        flex: 1,
        // backgroundColor: '#EAEDED',
    },
})