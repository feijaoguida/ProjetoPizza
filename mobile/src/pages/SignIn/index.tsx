import React, {useState, useContext} from 'react'
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { COLORS, images } from '../../constants'
import { AuthContext } from '../../contexts/AuthContext'

export default function SignIn(){
  const { signIn, loadingAuth } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function handleLogin(){
    if(email === '' || password === '') {
      return
    }
    await signIn({email, password})
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={images.logo}
      />

      <View style={styles.inputContainer }>
        <TextInput
          placeholder='Digite seu email'
          style={styles.input}
          placeholderTextColor={COLORS.gray100}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder='Sua senha'
          style={styles.input}
          placeholderTextColor={COLORS.gray100}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          { loadingAuth ? (
            <ActivityIndicator size={25} color={COLORS.white} />
          ) : (
            <Text style={styles.buttonText}>Acessar</Text>

          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark700
  },
  logo: {
    marginBottom: 18
  },
  inputContainer: {
    width: "95%",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 14,
  },
  input: {
    width: '95%',
    height: 40,
    backgroundColor: COLORS.Dark900,
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: COLORS.white
  },
  button:{
    width: '95%',
    height: 40,
    backgroundColor: COLORS.green900,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.Dark900
  }
})