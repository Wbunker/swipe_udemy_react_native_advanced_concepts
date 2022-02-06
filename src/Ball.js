import React, {Component} from 'react'
import {View, Animated} from 'react-native'

const styles = {
    ball: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 30,
        borderColr: 'black'
    }
}

class Ball extends Component {

    state = {
        position: new Animated.ValueXY(0,0)
    }

    componentDidMount() {
        Animated.spring(this.state.position, {
            toValue: {x: 200, y:500},
            useNativeDriver: false
        }).start();

    }


    render() {
        return (
            <Animated.View style={this.state.position.getLayout()}>
                <View style={styles.ball} />
            </Animated.View>
        )
    }
}

export default Ball;