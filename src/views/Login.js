import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, SafeAreaView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Appbar } from 'react-native-paper';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const userRef = await firestore()
                .collection('users')
                .where('email', '==', email)
                .where('password', '==', password)
                .get();

            if (userRef.empty) {
                Alert.alert('Thông tin đăng nhập không chính xác');
                return;
            }

            Alert.alert('Đăng nhập thành công');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Lỗi đăng nhập', error);
            Alert.alert('Đã có lỗi xảy ra khi đăng nhập');
        }
    };

    return (
        
        <SafeAreaView style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="LOGIN" titleStyle={{ alignSelf: 'center' }}/>
            </Appbar.Header>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../Asset/logo2.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
                    style={styles.input}
                    keyboardType='email-address'
                />
                <TextInput
                    placeholder="Password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                    style={styles.input}
                />
         
            <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.link}
            >
                <Text style={styles.linkText}>Register</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2', 
       
        justifyContent: 'flex-start',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    inputContainer: {
        alignItems: 'center',
    },
    
    input: {
        width: '80%',
        marginVertical: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    button: {
        justifyContent: 'center',
        width: '80%',
        marginVertical: 10,
        padding: 15,
        backgroundColor: 'blue',
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
    link: {
        marginTop: 20,
    },
    linkText: {
        color: 'blue',
        fontSize: 16,
    },
});
