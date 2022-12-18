import { useState } from "react"
import Head from "next/head"
import { Header } from "../../components/ui/Header"
import { canSSRAuth } from "../../utils/canSSRAuth"

import { setupAPIClient } from "../../services/api"
import { FiRefreshCcw } from "react-icons/fi"
import Modal from 'react-modal'

import styles from './styles.module.scss'
import { ModalOrder } from "../../components/ui/ModalOrder"
import { toast } from "react-toastify"

type OrderItem = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
}

interface HomeProps {
  orders: OrderItem[];
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  }
  order: {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  }
}

export default function Dashboard({ orders }: HomeProps) {
  const [orderList, setOrderList ] = useState(orders || [])
  const [modalItem, setModalItem] = useState<OrderItemProps[]>()
  const [modalVisible, setModalVisible] = useState(false)
  const apiClient = setupAPIClient();

  async function handleOpenModalView(id: string){
    const response = await apiClient.get('/order/detail', {
      params: {
        order_id: id,
      }
    })

    setModalItem(response.data);
    setModalVisible(true)
  }

  function handleCloseModalView(){
    setModalVisible(false)
  }

  async function handleFinishItem(id: string) {
    await apiClient.put('/order/finish', {
      order_id: id,
    })
    listOrder();
    setModalVisible(false);
    toast.success("Pedido Finalizado com sucesso.")
  }

  function handleRefreshOrders(){
    listOrder();
  }

  async function listOrder() {
    const response = await apiClient.get('/orders');
    setOrderList(response.data)
  }

  Modal.setAppElement('#__next')

  return (
    <>
      <Head>
        <title>Painel - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>
              Últimos pedidos
            </h1>
            <button onClick={() => handleRefreshOrders()}>
              <FiRefreshCcw size={25} color="#3fffa3" />
            </button>
          </div>
          <article className={styles.listOrders}>
            {orderList.length === 0 && (
              <span className={styles.emptyList}>
                Nenhum pedido aberto foi encontrado.
              </span>
            )}

            {
              orderList.map(item => (
                <section key={item.id} className={styles.orderItem}>
                  <button onClick={() => handleOpenModalView(item.id) } >
                    <div className={styles.tag} ></div>
                    <span>Mesa {item.table}</span>
                  </button>
                </section>

              ))
            } 
          </article>
        </main>

        { modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCloseModalView}
            order={modalItem}
            handleFinishOrder={ handleFinishItem }
          />
        )}
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/orders");

  return {
    props: {orders: response.data}
  }
})