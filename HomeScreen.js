import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, Alert, SafeAreaView } from 'react-native'
import { ListItem } from "react-native-elements";
import axios from 'axios'

export default class HomeScreen extends React.Component {
    constructor(){
        super()
        this.state = {
            listData : [],
            url : 'http://localhost:5000/',
        }
    }

    getPlanets = ()=>{
        const url = this.state.url
        axios
        .get(url)
        .then((response)=>{
            return this.setState({ listData : response.data.data })
        })
        .catch((err)=>{
            return alert(err.message)
        })
    }

    renderItem = ({item,index})=>{
        <ListItem
            key = {index}
            title = {`Planet:${item.name}`}
            subtitle = {`Distance from earth:${item.distance_from_earth}`}
            titleStyle = {styles.title}
            containerStyle = {styles.listContainer}
            bottomDivider
            onPress = {()=>{
                this.props.navigation.navigate('Details', {planet_name : item.name})
            }}
        />
    }

    keyExtractor = (item,index)=>{
        index.toString()
    }

    componentDidMount(){
        this.getPlanets()
    }

    render() {
        const { listData } = this.state;
    
        if (listData.length === 0) {
          return (
            <View style={styles.emptyContainer}>
              <Text>Loading...</Text>
            </View>
          );
        } else {
          return (
            <View style={styles.container}>
              <SafeAreaView />
              <View style={styles.upperContainer}>
                <Text style={styles.headerText}>Planets World</Text>
              </View>
              <View style={styles.lowerContainer}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={this.state.listData}
                  renderItem={this.renderItem}
                />
              </View>
            </View>
          );
        }
        
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#edc988"
      },
      upperContainer: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center"
      },
      headerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#132743"
      },
      lowerContainer: {
        flex: 0.9
      },
      emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
      emptyContainerText: {
        fontSize: 20
      },
      title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#d7385e"
      },
      listContainer: {
        backgroundColor: "#eeecda"
      }
    });