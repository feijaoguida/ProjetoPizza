import Head from "next/head"
import { Header } from "../../components/ui/Header"
import { canSSRAuth } from "../../utils/canSSRAuth"

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Painel - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />
      </div>
      Painel
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})