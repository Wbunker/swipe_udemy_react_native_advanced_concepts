import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import Deck from './src/Deck';

const DATA = [
  { id: 1, text: 'Card #1', uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80' },
  { id: 2, text: 'Card #2', uri: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80' },
  { id: 3, text: 'Card #3', uri: 'https://images.unsplash.com/photo-1500259783852-0ca9ce8a64dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80' },
  { id: 4, text: 'Card #4', uri: 'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1706&q=80' },
  { id: 5, text: 'Card #5', uri: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80' },
  { id: 6, text: 'Card #6', uri: 'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80' },
  { id: 7, text: 'Card #7', uri: 'https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=882&q=80' },
  { id: 8, text: 'Card #8', uri: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' },
];


export default function App() {

  const renderCard = (item) => {

    return (
      <Card>
        <Card.Title>{item.text}</Card.Title>
        <Card.Image source={{uri: item.uri}}/>
        <Text style={{ marginBottom: 10}}>
            {item.text}
          </Text>
        <Button 
           icon={<Icon name="code" />}
           backgroundColor="#03A9F4" 
           title="MORE INFO"
        />
      </Card>
    )
  }

  const renderNoMoreCards = () => {
    return (
      <Card>
        <Card.Title>All Done!!!!</Card.Title>
          <Text style={{ marginBottom: 10}}>
            There's no more content here!
          </Text>
          <Button 
           backgroundColor="#03A9F4" 
           title="Get more!"
        />
      </Card>
    );
  }


  return (
    <View style={styles.container}>
      <Deck 
        data={DATA}
        renderCard={renderCard}
        onSwipeRight={() => console.log('swiped right!!!')}
        onSwipeLeft={() => console.log('swiped left!!!')}
        renderNoMoreCards={renderNoMoreCards}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 250,
    backgroundColor: '#fff'
  }
});
