import { FormEvent, useContext, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { toast } from 'react-toastify'

import styles from './styles.module.scss'
import logoImg from '../../../public/logo.svg'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/Button'
import Link from 'next/link'
import { AuthContext } from '../../contexts/AuthContext'

export default function SignUp() {
  const { signUp } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();
    if (name === '' || email === '' || password === '') {
      toast.error('Preencha todos os campos para cadastro')
      return
    }

    setLoading(true)

    let data = {
      name, 
      email, 
      password
    }

    await signUp(data)

    setLoading(false)


  }
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça Cadastro</title>
      </Head>
      <div className={styles.containerCenter} >
        <Image src={logoImg} alt="Logo Pizzaria" />

        <div className={styles.login}>
        <h1>Criando sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder='Digite seu nome'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder='Digite seu email'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder='Digite sua senha'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              loading={loading}
            >
              Cadastrar
            </Button>
          </form>
          <Link className={styles.text} href="/">
            Já possui uma conta? Faça login!
          
          </Link>
        </div>
      </div>
    </>
  )
}
