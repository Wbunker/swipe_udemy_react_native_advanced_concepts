import React, {Component} from 'react'
import {View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager} from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250

class Deck extends Component {
    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {}
    }

    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({x: gesture.dx, y: gesture.dy})
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
            }
        });

        this.state = { panResponder, position, index: 0 }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.data !== prevProps.data) {
            this.setState({index: 0})
        }
    }

    getSnapshotBeforeUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    forceSwipe(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(this.state.position, {
            toValue: {x: x, y: 0},
            duration: SWIPE_OUT_DURATION,
            useNativeDriver: false
        }).start(() => this.onSwipeComplete(direction));
    }

    onSwipeComplete(direction) {
        const {onSwipeLeft, onSwipeRight, data} = this.props;
        const item = data[this.state.index];

        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        this.state.position.setValue({x: 0, y: 0})
        this.setState({ index: this.state.index + 1})
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: {x: 0, y:0},
            useNativeDriver: false
        }).start();
    }

    getCardStyle() {

        const {position} = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        })

        return {
            ...position.getLayout(),
            transform: [{rotate}]
        }
    }

    renderCards() {

        if (this.state.index >= this.props.data.length) {
            return this.props.renderNoMoreCards();
        }
        return this.props.data.map( (item, itemIndex) => {

            if (itemIndex < this.state.index) {return null;}

            if (itemIndex === this.state.index) {
                return (
                    <Animated.View 
                        key={item.id}
                        style={[this.getCardStyle(), styles.cardStyle, {zIndex: 3}]}
                        {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                )
            }
            return (
                <Animated.View 
                    style={[styles.cardStyle, {zIndex: 2, top: 10 * (itemIndex - this.state.index)}]} 
                    key={item.id}>
                    {this.props.renderCard(item)}
                </Animated.View>
            )
        }).reverse();
    }

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        )
    }
}

const styles = {
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH
    }
}
export default Deck;