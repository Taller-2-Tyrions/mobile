import React from "react";
import { View, Dimensions } from 'react-native';
import RouteMap from '../../components/RouteMap';
import { useRoute } from "@react-navigation/native";

const SearchResultsScreen = () => {
    const route = useRoute();
    const {originPlace, destinationPlace} = route.params;

    return (
        <View style={{display: 'flex', justifyContent: 'space-between'}}>
            <View style={{height: Dimensions.get('window').height-400}}>
                <RouteMap origin={originPlace} destination={destinationPlace} />
            </View>
        </View>
    );
};

export default SearchResultsScreen;