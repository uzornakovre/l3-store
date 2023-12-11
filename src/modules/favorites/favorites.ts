import { Component } from '../component';
import html from './favorites.tpl.html';
import { ProductList } from '../productList/productList';
import { favoritesService } from '../../services/favorites.service';

class Favorites extends Component {
  productList: ProductList;

  constructor(props: any) {
    super(props);

    this.productList = new ProductList();
    this.productList.attach(this.view.products);
  }

  async render() {
    const products = await favoritesService.get();
    this.productList.update(products);
  }
}

export const favoritesComp = new Favorites(html);
