import { X, UserCog, MapPin, Folder, Languages, BadgeInfo, Lock, LogOut, Bike, Banknote, LocateFixed, Navigation, Router, Phone, Scroll, BikeIcon } from 'lucide-react-native'
import React, { useRef } from 'react'
import { Image, ScrollView, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { Modal, Pressable, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Toast from 'react-native-toast-notifications';
import { CommonActions, StackActions, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../hooks/Hooks';
import { LightGreen } from '../../constants/Colors';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useDistance } from '../../helpers/DistanceCalculator';

interface propsTypes {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    modalVisible: boolean;
    isAccepted: boolean;
    ride: any;
    user: any;
}

const RideDetails = ({ setModal, modalVisible, isAccepted, ride, user }: propsTypes) => {
    const toastRef = useRef<any>(null);
    const distance = useDistance({ from: { latitude: ride?.pCord?.lati, longitude: ride?.pCord?.longi }, to: { latitude: ride?.dCord?.lati, longitude: ride?.dCord?.longi } });
    let away = useDistance({ from: { latitude: ride?.riderCords?.lati, longitude: ride?.riderCords?.longi }, to: { latitude: ride?.pCord?.lati, longitude: ride?.pCord?.longi } });
    let fare = distance * 20;
    return (
        <Modal
            animationType="slide"
            presentationStyle={'pageSheet'}
            visible={modalVisible}
            onRequestClose={() => {
                setModal(!modalVisible);
            }}>
            <View style={{ backgroundColor: 'whte' }}>
                <Toast ref={toastRef} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Pressable onPress={() => setModal(false)} style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center', margin: 5 }}>
                        <X color='black' strokeWidth={3} size={30} />
                    </Pressable>
                    <Text style={{ fontSize: 20, fontWeight: '500', color: 'black' }}>Ride Details</Text>
                    <View style={{ width: 50 }}></View>
                </View>
                <View style={{ height: 2, backgroundColor: '#e8e8e8', top: -3 }}></View>
                <ScrollView>
                    <View style={{ padding: 20, paddingTop: 5 }}>
                        {isAccepted ? null :
                            <View>
                                <View style={{ marginBottom: 10 }}>
                                    <MapView
                                        style={{ width: '100%', height: 200, borderRadius: 10 }}
                                        initialRegion={{
                                            latitude: ride.pCord.lati,
                                            longitude: ride.pCord.longi,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421,
                                        }}
                                        showsUserLocation={true}
                                        showsMyLocationButton={true}
                                    >
                                        <Marker
                                            coordinate={{ latitude: ride.pCord.lati, longitude: ride.pCord.longi }}
                                            title={"Destination"}
                                            description={"Shop 2, street 132, G11/4"}
                                        >
                                            <View style={{ padding: 7, backgroundColor: 'green', borderRadius: 50 }}>
                                                <Navigation style={{ right: 1, top: 1 }} color='white' size={20} />
                                            </View>
                                        </Marker>
                                        <Marker
                                            coordinate={{ latitude: ride.dCord.lati, longitude: ride.dCord.longi }}
                                            title={"Pickup"}
                                            description={"House 2, street 132, G11/4"}
                                        >
                                            <View style={{ padding: 5, backgroundColor: 'green', borderRadius: 50 }}>
                                                <LocateFixed color='white' size={24} />
                                            </View>
                                        </Marker>
                                        <Marker
                                            coordinate={{ latitude: ride.riderCords.lati, longitude: ride.riderCords.longi }}
                                            title={"Bike"}
                                            description={"Your Current Location"}
                                        >
                                            <View style={{ padding: 7, backgroundColor: 'black', borderRadius: 50 }}>
                                                <BikeIcon style={{ bottom: 1 }} color='white' size={25} />
                                            </View>
                                        </Marker>

                                        <Polyline
                                            coordinates={[{ latitude: ride.pCord.lati, longitude: ride.pCord.longi }, { latitude: ride.dCord.lati, longitude: ride.dCord.longi }]}
                                            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                                            strokeColors={['#7F0000']}
                                            strokeWidth={4}
                                        />

                                    </MapView>
                                </View>
                                <View>
                                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', padding: 8, backgroundColor: 'green', borderRadius: 5, marginBottom: 10 }}>
                                        <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>Accept Ride</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                        <View style={{ marginVertical: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Image style={{ width: 50, height: 50, borderRadius: 50 }} source={user ? { uri: user.profile } : require('../../assets/images/profileph.png')} />
                                <View style={{}}>
                                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'black', marginTop: 0 }}>{user?.name}</Text>
                                    <Text style={{ fontSize: 14, fontWeight: '300', color: 'black' }}>{user?.phone}</Text>
                                </View>
                            </View>
                            <View style={{ padding: 10, backgroundColor: LightGreen, borderRadius: 10 }}>
                                <Phone color='green' size={25} />
                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#e8e8e8', marginVertical: 10 }}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MapPin color='green' size={25} />
                                <Text style={{ fontSize: 16, fontWeight: '500', color: 'black', marginLeft: 10 }}>{away} KM away</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Banknote color='green' size={25} />
                                <Text style={{ fontSize: 16, fontWeight: '500', color: 'black', marginLeft: 10 }}>Fare: Rs {fare}</Text>
                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#e8e8e8', marginVertical: 10 }}></View>
                        <View style={{ gap: 10 }}>
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', width: '85%' }}>
                                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10, backgroundColor: LightGreen, borderRadius: 10 }}>
                                    <LocateFixed color='green' size={25} />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>Pickup Location</Text>
                                    <Text style={{ fontSize: 14, fontWeight: '300', color: 'black' }}>{ride.pLoc}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', width: '85%' }}>
                                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10, backgroundColor: LightGreen, borderRadius: 10 }}>
                                    <Navigation color='green' size={25} />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>Dropoff Location</Text>
                                    <Text style={{ fontSize: 14, fontWeight: '300', color: 'black' }}>{ride.dLoc}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', width: '85%' }}>
                                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10, backgroundColor: LightGreen, borderRadius: 10 }}>
                                    <Router color='green' size={25} />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>Distance</Text>
                                    <Text style={{ fontSize: 14, fontWeight: '300', color: 'black' }}>{distance} KM</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#e8e8e8', marginVertical: 10 }}></View>
                        <View>
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'baseline' }}>
                                <Text style={{ fontSize: 18 }}>Items</Text>
                                <Text>x{ride?.oItems?.length}</Text>
                            </View>
                            <View style={{ alignItems: 'center', marginVertical: 10, justifyContent: 'center', gap: 5 }}>
                                {ride?.oItems?.map((item: any, index: number) => {
                                    return (
                                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%' }}>
                                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'baseline' }}>
                                                <Text style={{ fontSize: 14, fontWeight: '300', color: 'black' }}>{index + 1}.</Text>
                                                <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>{item.item}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                                {item.images.map((image: any, index: number) => {
                                                    return (
                                                        <Image key={index} style={{ width: 40, height: 40 }} source={{ uri: image }} />
                                                    )
                                                })
                                                }
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>

                    </View>
                    <View style={{ height: 70 }}></View>
                </ScrollView>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginVertical: 15,
        color: 'black'
    },
    btnText: {
        fontSize: 16,
        fontWeight: '400',
        color: 'black'
    }
})

export default RideDetails