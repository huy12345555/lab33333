import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, SafeAreaView } from 'react-native';
import { Appbar } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [name, setName] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidFullName, setIsValidFullName] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isMatchingPassword, setIsMatchingPassword] = useState(true);

    const handleRegister = async () => {
        if (!isValidEmail || !isValidFullName || !isValidPassword || !isMatchingPassword) {
            Alert.alert('Vui lòng nhập đúng thông tin');
            return;
        }

        try {
            await firestore()
                .collection('users')
                .add({
                    email: email,
                    password: password,
                    name: name
                });

            Alert.alert('Đăng ký thành công');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Lỗi đăng ký', error);
            Alert.alert('Đã có lỗi xảy ra khi đăng ký');
        }
    };

    const validateEmail = (email) => {
        setIsValidEmail(email.includes('@'));
        setEmail(email);
    };

    const validateFullName = (fullName) => {
        setIsValidFullName(fullName.trim().length > 0);
        setName(fullName);
    };

    const validatePassword = (password) => {
        setIsValidPassword(password.length >= 6);
        setPassword(password);
    };

    const validateRepassword = (repassword) => {
        setIsMatchingPassword(repassword === password);
        setRepassword(repassword);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Register" titleStyle={{ alignSelf: 'center' }} />
            </Appbar.Header>
            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../Asset/logo2.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>REGISTER</Text>
                </View>
                <TextInput
                    placeholder="Email"
                    onChangeText={validateEmail}
                    value={email}
                    style={[styles.input, !isValidEmail && styles.inputError]}
                    keyboardType='email-address'
                />
                {!isValidEmail && <Text style={styles.errorText}>Email không hợp lệ</Text>}

                <TextInput
                    placeholder="Password"
                    onChangeText={validatePassword}
                    value={password}
                    secureTextEntry={true}
                    style={[styles.input, !isValidPassword && styles.inputError]}
                />
                {!isValidPassword && <Text style={styles.errorText}>Password phải chứa ít nhất 6 ký tự</Text>}

                <TextInput
                    placeholder="Re-enter Password"
                    onChangeText={validateRepassword}
                    value={repassword}
                    secureTextEntry={true}
                    style={[styles.input, !isMatchingPassword && styles.inputError]}
                />
                {!isMatchingPassword && <Text style={styles.errorText}>Mật khẩu không khớp</Text>}

                <TextInput
                    placeholder="Full Name"
                    onChangeText={validateFullName}
                    value={name}
                    style={[styles.input, !isValidFullName && styles.inputError]}
                />
                {!isValidFullName && <Text style={styles.errorText}>Vui lòng nhập họ tên</Text>}

                <TouchableOpacity
                    onPress={handleRegister}
                    style={[styles.registerButton, (!isValidEmail || !isValidFullName || !isValidPassword || !isMatchingPassword) && styles.disabledButton]}
                    disabled={!isValidEmail || !isValidFullName || !isValidPassword || !isMatchingPassword}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.goBackButton}
                >
                    <Text style={styles.goBackButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2', 
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    registerButton: {
        width: '80%',
        backgroundColor: 'blue',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    disabledButton: {
        opacity: 0.5,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
    goBackButton: {
        marginTop: 20,
    },
    goBackButtonText: {
        color: 'blue',
        fontSize: 16,
    },
});
