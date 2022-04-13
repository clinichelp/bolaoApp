import { View, Text, Image } from 'react-native'
import React, { useLayoutEffect, useEffect, useState } from 'react'

import * as userAction from "../../store/action";
import { useDispatch } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    TextInput,
    Button,
    Checkbox
} from "react-native-paper";

import styles from './styles'

import * as LoginService from '../../services/auth'


export default function Login({ navigation }) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [checked, setChecked] = useState(false);
    const [msg, setMsg] = useState("");

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const getUsernameAndPassord = async () => {
            let email = await AsyncStorage.getItem("email");
            let senha = await AsyncStorage.getItem("senha");
            if (email) {
                setEmail(email);
                setChecked(true);
            }
            if (senha) setPassword(senha);
        };
        getUsernameAndPassord();    
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setMsg("")
        });
        return unsubscribe;
    }, [navigation]);

    const validarCredenciais = () => {
        if (email === undefined && password === undefined) {
            setMsg("Informe seu email e senha para entrar");
        } else {
            LoginService.login(email, password, checked)
                .then(() => {
                    dispatch(userAction.getUser(email));
                    navigation.navigate("perfil", { propsEmail: email });
                })
                .catch((erro) => {
                    setMsg(erro);
                });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.loginBox}>
                <Image source={require('../../repositories/images/Logo_TI.png')}
                    style={styles.logoImage} />
                <View>
                    <TextInput
                        style={styles.inputs}
                        label="Email"
                        keyboardType="email-address"
                        value={email}
                        mode="outlined"
                        onChangeText={(value) => setEmail(value)}
                    />
                    <TextInput
                        style={styles.inputs}
                        label="Senha"
                        secureTextEntry={true}
                        value={password}
                        mode="outlined"
                        onChangeText={(value) => setPassword(value)}
                    />
                </View>
                <View style={styles.checkBox}>
                    <Text style={{ color: "#02A859" }}>Lembrar email e senha</Text>
                    <Checkbox
                        status={checked ? "checked" : "unchecked"}
                        uncheckedColor="#02A859"
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />
                </View>
                <View style={styles.buttonBox}>
                    <Button mode="contained" onPress={validarCredenciais}>
                        Login
                    </Button>
                    <Button
                        mode="contained"
                        onPress={() => navigation.navigate("registro")}
                    >
                        Cadastrar
                    </Button>
                </View>
                <View>
                    <Text style={{ color: "red", margin: 10, justifyContent: "center" }}>{msg}</Text>
                </View>
                <View>
                    <Text style={{
                        color: "#02A859",
                        fontSize: 16
                    }}
                        onPress={() => {
                            navigation.navigate("redefinir")
                        }}>
                        Redefinir minha senha
                    </Text>
                </View>
            </View>

        </View>
    );
}