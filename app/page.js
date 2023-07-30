import Cart from "./components/Cart";
import Shop from "./components/Shop";



export default async function  Home() {


  return (
    <main className="md:p-10">
        <Cart/>
      <div className="container mx-auto">
        <Shop/>
      </div>
    </main>
  )
}
