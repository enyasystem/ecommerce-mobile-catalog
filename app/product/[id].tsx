import React from 'react';
import { View, Text } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ProductDetails() {
  const params = useLocalSearchParams();
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text>Product details for id: {String(params.id)}</Text>
    </View>
  );
}
