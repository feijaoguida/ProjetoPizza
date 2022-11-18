import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import { toast } from 'react-toastify';
import Router from 'next/router'
import { api } from '../services/apiClient'

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (Credentials: SignUpProps) => Promise<void>;
}
type UserProps = {
  id: string;
  name: string;
  email: string;
}
type SignInProps = {
  email: string;
  password: string;
}
type SignUpProps = {
  name: string;
  email: string;
  password: string;
}
type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  try {
    destroyCookie(undefined, '@nextauth.token')
    toast.success('Obrigado e volte sempre!')
    Router.push('/')
  } catch (error) {
    toast.error('Ops... Erro ao deslogar!')
    console.log('Erro ao deslogar - ', error)
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user;

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies();
    if (token) {
      api.get('/me').then(response => {
        const { id, name, email } = response.data;

        setUser({
          id,
          name,
          email
        })
      }).catch(() => {
        signOut();
      })
    }
  })

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/session', {
        email, 
        password
      })
      const { id, name, token } = response.data;
      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: '/' // Quais caminhos tem acesso ao cookie - / igual a todos
      })

      setUser({
        id,
        name,
        email
      })

      //Passar token no header por padrão
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      toast.success(`Seja bem vindo ${name}`)
      Router.push('/dashboard')
      

    } catch (error) {
      toast.error('Ops... Erro ao acessar!')
      console.log("Erro ao acessar - ", error)
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post('/users', {
        name, 
        email,
        password
      })

      toast.success(`${name}, cadastro realizado com sucesso!`)

      Router.push('/')
    } catch (error) {
      toast.error('Ops... Erro ao cadastrar!')
      console.log("erro ao cadastrar = ", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp}}>
      { children }
    </AuthContext.Provider>
  )
}