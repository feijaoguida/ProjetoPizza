import Head from 'next/head'
import Image from 'next/image'

import styles from '../../styles/Home.module.scss'
import logoImg from '../../public/logo.svg'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/Button'

export default function Home() {
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter} >
        <Image src={logoImg} alt="Logo Pizzaria" />

        <div className={styles.login}>
          <form >
            <Input
              placeholder='Digite seu email'
              type="text"
            />

            <Input
              placeholder='Digite sua senha'
              type="password"
            />

            <Button
              type="submit"
              loading={false}
            >
              Acessar
            </Button>
          </form>
          <a className={styles.text} >Não possui uma conta? Cadastre-se</a>
        </div>
      </div>
    </>
  )
}
