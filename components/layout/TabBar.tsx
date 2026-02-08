import React from 'react';
import { View, Text } from 'react-native';

export default function TabBar(){
  return (
    <View
      style={{
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 16,
        borderRadius: 999,
        backgroundColor: '#FFF6E0',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
      }}
    >
      <Text style={{ color: '#1f2937', fontWeight: '700' }}>TabBar</Text>
    </View>
  );
}
