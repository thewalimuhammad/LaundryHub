import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { axiosInstance } from '../../helpers/AxiosAPI';
import { useDistance } from '../../helpers/DistanceCalculator';

const RideCard = ({ navigation, ride }: any) => {
    const [user, setUser] = useState<any>({});
    useEffect(() => {
        axiosInstance.get(`users/getUser/${ride.uid}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }, []);

    const distance = useDistance({ from: { latitude: ride.pCord.lati, longitude: ride.pCord.longi }, to: { latitude: ride.dCord.lati, longitude: ride.dCord.longi } });
    let fare = 80 + distance * 10;
    return (
        <View style={{ marginHorizontal: 20, marginTop: 5, borderColor: 'black', borderWidth: 1, borderRadius: 10, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ margin: 10, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 50 }} defaultSource={require('../../assets/images/profileph.png')} source={{ uri: user?.profile }} />
                    <View style={{}}>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: 'black', marginTop: 0 }}>{user?.name}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '300', color: 'black' }}>+92 {user?.phone}</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', gap: 2 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, gap: 5 }}>
                        <Text style={{ fontSize: 16, color: 'black' }}>Distance:</Text>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>{distance} KM</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, gap: 5 }}>
                        <Text style={{ fontSize: 16, color: 'black' }}>Fare:</Text>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>Rs. {fare}</Text>
                    </View>
                </View>
            </View>
            <View style={{ margin: 10, marginTop: 0 }}>
                <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>Pickup Location</Text>
                <Text style={{ fontSize: 14, fontWeight: '300', color: 'black' }}>{ride?.pLoc}</Text>

                <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>Dropoff Location</Text>
                <Text style={{ fontSize: 14, fontWeight: '300', color: 'black' }}>{ride?.dLoc}</Text>
            </View>
        </View>
    )
}

export default RideCard