import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, Alert } from 'react-native'
import { Card, Icon } from "react-native-elements";

export default class DetailScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            details   : {},
            imagePath : '',
            url       : `https://localhost:5000/planet?name=${this.props.navigation.getParam('planet_name')}`,
        };
    }

    getDetails = ()=>{
        const { url } = this.state;
        axios
            .get(url)
            .then(response => {
                this.setDetails(response.data.data);
            })
            .catch(err => {
                Alert.alert(err.message)
            });
    }

    setDetails = (planetDetails)=>{
        const planetType = planetDetails.planet_type;
        var imagePath = '';
        switch(planetType){
            case 'Gas Giant':
                imagePath = require('../assets/gas_giant.png')
                break;
            case 'Terrestrial':
                imagePath = require('../assets/terrestrial.png')
                break;
            case 'Super Earth':
                imagePath = require('../assets/super_earth.png')
                break;    
            case 'Neptune Like':
                imagePath = require('../assets/neptune_like.png')
                break;
            default:
                imagePath = require('../assets/gas_giant.png')
        }
        this.setState({
            details : planetDetails,
            imagePath : imagePath,
        })
    }

    componentDidMount(){
        this.getDetails()
    }

    render() {
        const { details , imagePath } = this.state;
        if(details.specifications){
            return(
                <View style = {styles.container}>
                    <Card 
                        title = {details.name}
                        image = {imagePath}
                        imageProps = {{ resizeMode : 'contain', width : '100%' }}
                    >
                        <View>
                            <Text style={styles.cardItem}>
                                {`Distance from earth : ${details.distance_from_earth}`}
                            </Text>
                            <Text style={styles.cardItem}>
                                {`Distance from their sun : ${details.distance_from_their_sun}`}
                            </Text>
                            <Text style={styles.cardItem}>
                                {`Gravity : ${details.gravity}`}
                            </Text>
                            <Text style={styles.cardItem}>
                                {`Orbital Period : ${details.orbital_period}`}
                            </Text>
                            <Text style={styles.cardItem}>
                                {`Orbital speed : ${details.orbital_speed}`}
                            </Text>
                            <Text style={styles.cardItem}>
                                {`Planet mass : ${details.planet_mass}`}
                            </Text>
                            <Text style={styles.cardItem}>
                                {`Planet Radius : ${details.planet_radius}`}
                            </Text>
                            <Text style={styles.cardItem}>
                                {`Planet type : ${details.planet_type}`}
                            </Text>
                        </View>
                        <View style={[styles.cardItem, {flexDirection : 'column'}]}> 
                            <Text>
                                {details.specifications ? `Specifications : ` : 'Does not have any specifications'}
                            </Text>
                            {details.specifications.map((item,index)=>{
                                <Text style = {{marginLeft : 50}}
                                    key = {index.toString()}
                                >
                                    {item}
                                </Text>
                            })}
                        </View>
                    </Card>
                </View>
            )
        }
        return null
    }
}


const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    cardItem : {
        marginBottom : 10
    },
})