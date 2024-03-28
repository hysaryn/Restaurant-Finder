import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import PressableButton from './PressableButton';
import { AntDesign } from '@expo/vector-icons';
import { auth, database} from '../firebase-files/firebaseSetup';
import { deleteFromDB } from '../firebase-files/databaseHelper';

export default function ReviewItem({review}) {

    const navigation = useNavigation();
    const currentUser = auth.currentUser;
    const userId = currentUser.uid;

    const reviewPressHandler = () => {
        navigation.navigate('Edit My Review', {review: review});
    }

    const deleteHandler = () => {
        Alert.alert('Delete', 'Are you sure you want to delete this review?', [
            {text: 'No', style: 'cancel'},
            {text: 'Yes', style: 'destructive', 
                onPress: () => {
                    deleteFromDB('users', userId, 'reviews', review.id); 
                    }}
        ]);
    }
    
    return (
        <Pressable 
            style={({pressed})=> [styles.textContainer,pressed && styles.pressed]}
            onPress={reviewPressHandler} andriod_ripple={{color:'#e9e'}}>
            <View style={{flexDirection: 'column'}}>
                <Text style={{fontWeight: 'bold'}}>{review.restaurantName}</Text>
                <Text style={styles.text}>{review.review}</Text>
            </View>
            <PressableButton onPress={deleteHandler}>
                <AntDesign name="delete" size={24} color="black" />
            </PressableButton>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.5,
    },

    textContainer: {
        borderRadius: 10,
        backgroundColor: "#aaa",
        marginTop: 15,
        flexDirection: "row",
        alignItems: "start",
      },
})