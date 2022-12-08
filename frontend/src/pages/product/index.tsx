import Head from "next/head";
import { ChangeEvent, FormEvent, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { Header } from "../../components/ui/Header";
import { api } from "../../services/apiClient";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from './styles.module.scss'
import { FiUpload } from 'react-icons/fi'
import { setupAPIClient } from "../../services/api";

type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps {
  categoryList: ItemProps[]
}


export default function Product({ categoryList }: CategoryProps) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [categories, setCategories] = useState(categoryList || [])
  const [categorySelected, setCategorySelected] = useState(0)
  const [imageAvatar, setImageAvatar] = useState<File | null>(null)


  function handlefile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    const image = e.target.files[0]

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setImageAvatar(image)
      setAvatarUrl(URL.createObjectURL(e.target.files[0]))
    }
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (name === '' || price === '' || description === '' || imageAvatar === null) {
      toast.warning("Informe todos os campos!")
      return;
    }

    try {
      const data = new FormData();

      data.append('name', name);
      data.append('price', price);
      data.append('description', description);
      data.append('category_id', categories[categorySelected].id);
      data.append('file', imageAvatar);
      
      await api.post('/product', data)
      
      toast.success("Produto Cadastrado com sucesso")
      setName('')
      setPrice('')
      setDescription('')
      setImageAvatar(null)
      setAvatarUrl('')
      setCategorySelected(0)
      
    } catch (error) {
      console.log(error);
      toast.error("Opss!!! erro ao Cadastrar!")
    }

    
  }

  function handleChangeEvent(event: any) {
    setCategorySelected(event.target.value)
  }

  return (
    <>
      <Head>
        <title>Novo Produto - Sujeito Pizza</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1> Cadastrar Produto</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={25} color="#FFF" />
              </span>
              <input type="file" accept="image/png, image/jpeg" onChange={handlefile} />

              {avatarUrl && (
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt="Foto do produto"
                  width={250}
                  height={250}
                />
              )}
            </label>
            
            <select value={categorySelected} onChange={handleChangeEvent} className={styles.input}>
              {
                categories.map((item, index) => {
                  return (
                    <option key={item.id} value={index}>
                      {item.name}
                    </option>
                  )
                })
              }
            </select>
            <input
              type="text"
              placeholder="Digite o nome do produto"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Preço do produto"
              className={styles.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              placeholder="Descreva seu produto..."
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export const getServerSideProps = canSSRAuth(async (ctx: any) => {

  const apiClient = setupAPIClient(ctx)

  const response = await apiClient.get('/category')
  return {
    props: {
      categoryList: response.data
    }
  }
})