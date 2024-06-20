import React, {useCallback} from 'react';
import {GoogleMap, useJsApiLoader, DirectionsRenderer} from '@react-google-maps/api';
import {MapComponentProps} from '@/types/mapComponentProps';
import {useMapData} from '@/hooks/useMapData';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 43.9492,
    lng: 5.4080
};

const MapComponent: React.FC<MapComponentProps> = ({
                                                       tripInformations,
                                                       currentDeparture,
                                                       currentArrival,
                                                       currentVehicle,
                                                       currentUser
                                                   }) => {

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDxnbqlXcwX93UYD9GqYzX2g_-N01zL33c"
    });

    const {directions} = useMapData(tripInformations, currentDeparture, currentArrival, currentVehicle, currentUser);

    const onLoad = useCallback((mapInstance: google.maps.Map) => {
        const bounds = new google.maps.LatLngBounds(center);
        mapInstance.fitBounds(bounds);
    }, []);

    const onUnmount = useCallback(() => {
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {directions && <DirectionsRenderer directions={directions}/>}
        </GoogleMap>
    ) : <div></div>;
};

export default React.memo(MapComponent);
