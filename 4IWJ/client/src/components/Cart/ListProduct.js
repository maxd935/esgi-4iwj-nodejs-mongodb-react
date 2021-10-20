import List from "./List";
import manager from "./productManager";
import ProductItem from "./ProductItem";
import cartManager from "./cartManager";

export default function ListProduct() {
  const Item = (props) => {
    return <ProductItem {...props} onAdd={(item) => cartManager.add(item)} />;
  };
  return <List manager={manager} ItemComponent={Item} />;
}
