import React, { useEffect } from "react";
import { View, Dimensions } from 'react-native';
import RouteMap from '../../components/RouteMap';
import { useRoute } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import useLocation from "../../hooks/useLocation";

const SearchResultsScreen = () => {
    const route = useRoute();
    const { originPlace, destinationPlace } = route.params;
    const { user } = useAuth();
    const { passengerSearch } = useLocation();

    useEffect(() => {
        const awaitSearching = async () => {
            await passengerSearch(
                originPlace.details.geometry.location,
                destinationPlace.details.geometry.location,
                user.accessToken
            );
        };

        const interval = setInterval(() => {
            awaitSearching();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={{display: 'flex', justifyContent: 'space-between'}}>
            <View style={{height: Dimensions.get('window').height-400}}>
                <RouteMap origin={originPlace} destination={destinationPlace} />
            </View>
        </View>
    );
};

export default SearchResultsScreen;