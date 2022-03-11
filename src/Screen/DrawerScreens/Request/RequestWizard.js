import { useState, useEffect } from 'react';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ListItem } from 'react-native-elements';
import { event } from 'react-native-reanimated';
import {
    Alert, Text, Pressable, View, StyleSheet, ImageBackground, BackHandler
} from "react-native";
import { Searchbar } from 'react-native-paper';
import Intl from 'intl';
import "intl/locale-data/jsonp/en";
import { ToastAndroid } from 'react-native';
import InternetBar from '../../Components/internetConnector';
import ModalSearch from '../../Components/modalsearch';
import getCompanyRequest from '../../../service/api/apiservice';
import SelectDropdown from 'react-native-select-dropdown'
import { getCostCentre } from '../../../service/api/apiservice' ;

import Moment from 'react-moment';


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
    const reqtype = ["Material", "Asset"];
    const [cclistItems, setcclistItems] = useState([]);
    const priority = ["Low", "Medium","High"];



    useEffect(() => {
        retrieveccData();
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


    const retrieveccData = async () => {
        const valueString = await AsyncStorage.getItem('clientId');
        setClientId(valueString);
        const userid = await AsyncStorage.getItem('userId');
        setUserId(userid);

        let data = {
              ClientId: ClientId,
              UserId: 9455,
        };

        const response = await getCostCentre(data);
        const datas = await response.json();
        setcclistItems(datas.ccList);
        console.log(datas.ccList);
        setData(datas.ccList);
       
    };
    

  
    return (<View style={styles.container}>
        <InternetBar />
        <View style={styles.centeredView}>
        <SelectDropdown
            data={reqtype}
            onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                return item
            }}
        />
        </View>
        <View style={styles.textStyle}>
        <SelectDropdown
            data={cclistItems}
            onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.CostCentreName
            }}
            rowTextForSelection={(item, index) => {
                return item.CostCentreName
            }}
        />
        </View>
        <View style={styles.textStyle}>
        <SelectDropdown
            data={priority}
            onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                return item
            }}
        />
        </View>
      
    </View>


    );
}

export default RequestWizard;

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