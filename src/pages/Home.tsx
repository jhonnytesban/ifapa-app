import Form from "../components/Form"
import Graphic from "../components/Graphic"
import { AppProvider } from "../service/AppContext"

const Home = () => {

  return (
    <>
      <AppProvider>
        <Form />
        <Graphic />
      </AppProvider>
    </>
  )
}

export default Home