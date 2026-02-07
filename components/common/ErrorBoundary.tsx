import React from 'react';
import { View, Text } from 'react-native';

export default class ErrorBoundary extends React.Component<any, any> {
  state = { hasError: false };
  static getDerivedStateFromError(){ return { hasError: true }; }
  render(){
    if(this.state.hasError) return (<View><Text>Something went wrong</Text></View>);
    return this.props.children;
  }
}
