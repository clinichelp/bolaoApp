import React, { useState, useEffect } from "react"
import { View, Text, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'

import * as userAction from "../../../store/action";
import * as UserService from '../../../services/userServices'
import { useDispatch } from "react-redux"

import RNPickerSelect from "react-native-picker-select"

import Header from '../../../components/header'
import styles from "./styles"

import {
  Button
} from "react-native-paper"

const times = [
  { label: 'Flamengo', value: 'Flamengo', },
  { label: 'Santos', value: 'Santos', },
  { label: 'Palmeiras', value: 'Palmeiras', },
  { label: 'América-MG', value: 'América-MG', },
  { label: 'Athletico-PR', value: 'Athletico-PR', },
  { label: 'Atlético-GO', value: 'Atlético-GO', },
  { label: 'Atlético-MG', value: 'Atlético-MG', },
  { label: 'Avaí', value: 'Avaí', },
  { label: 'Botafogo', value: 'Botafogo', },
  { label: 'Ceará', value: 'Ceará', },
  { label: 'Corinthians', value: 'Corinthians', },
  { label: 'Coritiba', value: 'Coritiba', },
  { label: 'Cuiaba', value: 'Cuiaba', },
  { label: 'São Paulo', value: 'São Paulo', },
  { label: 'Fluminense', value: 'Fluminense', },
  { label: 'Fortaleza', value: 'Fortaleza', },
  { label: 'Goiás', value: 'Goiás', },
  { label: 'Internacional', value: 'Internacional', },
  { label: 'Juventude', value: 'Juventude', },
  { label: 'Bragantino', value: 'Bragantino', },
];


export default function Cadastro({ navigation }) {

  // Dados do usuário da store
  const user = useSelector((user) => user);

  const [msg, setMsg] = useState()
  const [aposta, setAposta] = useState({
    '1°': "sem aposta",
    '2°': "sem aposta",
    '3°': "sem aposta",
    '4°': "sem aposta",
    '5°': "sem aposta",
    '6°': "sem aposta",
    '17°': "sem aposta",
    '18°': "sem aposta",
    '19°': "sem aposta",
    '20°': "sem aposta"
  })

  const dispatch = useDispatch();

  const placeholder1 = {
    label: 'Selecione o campeão',
    value: aposta["1°"],
    color: '#9EA0A4',
  };

  const placeholder2 = {
    label: 'Selecione o vice-campeão',
    value: aposta["2°"],
    color: '#9EA0A4',
  };

  const placeholder3 = {
    label: 'Selecione o terceiro',
    value: aposta["3°"],
    color: '#9EA0A4',
  };

  const placeholder4 = {
    label: 'Selecione o quarto',
    value: aposta["4°"],
    color: '#9EA0A4',
  };

  const placeholder5 = {
    label: 'Selecione o quinto',
    value: aposta["5°"],
    color: '#9EA0A4',
  };

  const placeholder6 = {
    label: 'Selecione o sexto',
    value: aposta["6°"],
    color: '#9EA0A4',
  };

  const placeholder17 = {
    label: 'Selecione o 17°',
    value: aposta["17°"],
    color: '#9EA0A4',
  };

  const placeholder18 = {
    label: 'Selecione o 18°',
    value: aposta["18°"],
    color: '#9EA0A4',
  };

  const placeholder19 = {
    label: 'Selecione o 19°',
    value: aposta["19°"],
    color: '#9EA0A4',
  };

  const placeholder20 = {
    label: 'Selecione o lanterna',
    value: aposta["20°"],
    color: '#9EA0A4',
  };

  const saveUserBet = async () => {    
    const valores = {
      nome: user.nome,
      tempo_anos: user.tempo_ti.anos,
      tempo_meses: user.tempo_ti.meses,
      aposta: aposta
    }
    await UserService.saveUserBet(user.email, valores).then(() => {
      setMsg("Apostas salvas. Boa sorte!")
    }).catch((err) => {
      setMsg(`Ocorreu um erro: ${err.message}`)
    })
    await UserService.updateFieldUser(user.email).then(() => {
      setMsg("Seu usuário foi atualizado")
    }).catch((err) => {
      setMsg(`Ocorreu um erro: ${err.message}`)
    })
    dispatch(userAction.getUser(user.email));
  }

  return (
    <React.Fragment>
      <Header navigation={navigation} labels={title = "Cadastro de aposta"} />
      <View style={styles.container}>
        <Text style={styles.title}>{`Olá ${user && user.nome}`}</Text>
        <Text style={{ marginBottom: 15 }}>Cadastre sua aposta</Text>

        {
          msg ?
            <View>
              <Text>{msg}</Text>
            </View>
            :
            <View style={styles.secondContainer}>
              <ScrollView>

                <View style={styles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={placeholder1}
                    items={times}
                    onValueChange={value => {
                      setAposta(state => ({
                        ...state, '1°': value,
                      }))
                    }}
                    value={placeholder1.value}
                    style={styles.inputAndroid}
                  />
                </View>
                <View style={styles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={placeholder2}
                    items={times}
                    onValueChange={value => {
                      setAposta(state => ({
                        ...state, '2°': value,
                      }))
                    }}
                    value={placeholder2.value}
                    style={styles.inputAndroid}
                  />
                </View>
                <View style={styles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={placeholder3}
                    items={times}
                    onValueChange={value => {
                      setAposta(state => ({
                        ...state, '3°': value,
                      }))
                    }}
                    value={placeholder3.value}
                    style={styles.inputAndroid}
                  />
                </View>
                <View style={styles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={placeholder4}
                    items={times}
                    onValueChange={value => {
                      setAposta(state => ({
                        ...state, '4°': value,
                      }))
                    }}
                    value={placeholder4.value}
                    style={styles.inputAndroid}
                  />
                </View>
                <View style={styles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={placeholder5}
                    items={times}
                    onValueChange={value => {
                      setAposta(state => ({
                        ...state, '5°': value,
                      }))
                    }}
                    value={placeholder5.value}
                    style={styles.inputAndroid}
                  />
                </View>
                <View style={styles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={placeholder6}
                    items={times}
                    onValueChange={value => {
                      setAposta(state => ({
                        ...state, '6°': value,
                      }))
                    }}
                    value={placeholder6.value}
                    style={styles.inputAndroid}
                  />
                </View>
                <View style={styles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={placeholder17}
                    items={times}
                    onValueChange={value => {
                      setAposta(state => ({
                        ...state, '17°': value,
                      }))
                    }}
                    value={placeholder17.value}
                    style={styles.inputAndroid}
                  />
                </View>
                <View style={styles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={placeholder18}
                    items={times}
                    onValueChange={value => {
                      setAposta(state => ({
                        ...state, '18°': value,
                      }))
                    }}
                    value={placeholder18.value}
                    style={styles.inputAndroid}
                  />
                </View>
                <View style={styles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={placeholder19}
                    items={times}
                    onValueChange={value => {
                      setAposta(state => ({
                        ...state, '19°': value,
                      }))
                    }}
                    value={placeholder19.value}
                    style={styles.inputAndroid}
                  />
                </View>
                <View style={styles.inputAndroid}>
                  <RNPickerSelect
                    placeholder={placeholder20}
                    items={times}
                    onValueChange={value => {
                      setAposta(state => ({
                        ...state, '20°': value,
                      }))
                    }}
                    value={placeholder20.value}
                    style={styles.inputAndroid}
                  />
                </View>            
                
                <Button
                  style={styles.button}
                  mode='contained'
                  onPress={() => { saveUserBet() }}
                ><Text>Salvar apostas</Text>
                </Button>
              </ScrollView>
            </View>
        }

      </View>
    </React.Fragment>
  )
}