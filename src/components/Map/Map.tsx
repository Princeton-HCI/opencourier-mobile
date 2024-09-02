import React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import styles from './Map.styles';
import { Colors } from '@app/styles/colors';
import { Images } from '@app/utilities/images';
import { Order, User } from '@app/types/types';

type Props = {
  user: User;
  order: Order;
};

const Map = ({ user, order }: Props) => {
  return (
    <MapView
      showsUserLocation
      zoomEnabled={false}
      zoomControlEnabled={false}
      scrollEnabled={false}
      zoomTapEnabled={false}
      style={styles.map}
      initialRegion={{
        latitude: user.currentLocation?.latitude ?? 51.506048309318764, // TODO: hardcoded London coordinates
        longitude: user.currentLocation?.longitude ?? -0.1584647405195857,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        // latitudeDelta: 0.7,
        // longitudeDelta: 0.7,
      }}>
      <Polyline
        strokeWidth={3}
        lineCap="round"
        strokeColor={Colors.blue1}
        coordinates={[
          {
            latitude: user.currentLocation?.latitude ?? 51.506048309318764, // TODO: hardcoded London coordinates
            longitude: user.currentLocation?.longitude ?? -0.1584647405195857,
          },
          {
            latitude: order.pickupLocation.latitude ?? 0,
            longitude: order.pickupLocation.longitude ?? 0,
          },
          {
            latitude: order.dropoffLocation.latitude ?? 0,
            longitude: order.dropoffLocation.longitude ?? 0,
          },
        ]}
      />
      <Marker
        key={1}
        coordinate={{
          latitude: order.dropoffLocation.latitude ?? 0,
          longitude: order.dropoffLocation.longitude ?? 0,
        }}
        image={Images.Buildings}
      />
      <Marker
        coordinate={{
          latitude: order.pickupLocation.latitude ?? 0,
          longitude: order.pickupLocation.longitude ?? 0,
        }}
        image={Images.Storefront}
      />
    </MapView>
  );
};

export default Map;
