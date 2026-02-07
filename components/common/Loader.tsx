import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Loader(){
  return <View style={{padding:12}}><ActivityIndicator size="small" color="#2b6cee"/></View>
}
