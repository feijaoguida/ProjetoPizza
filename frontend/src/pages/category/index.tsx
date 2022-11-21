import Head from "next/head";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Header } from "../../components/ui/Header";
import { api } from "../../services/apiClient";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from './styles.module.scss'


export default function Category() {
  const [name, setName] = useState('')

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (name === '') {
      
      toast.warning("Informe um nome da categoria")
      return;
    }

    await api.post('/category', {
      name: name
    })

    toast.success("Categoria Cadastrada com sucesso")
    setName('')
    
  }

  return (
    <>
      <Head>
        <title>Nova Categoria - Sujeito Pizza</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1> Cadastrar categorias</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Digite o nome da categoria"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})