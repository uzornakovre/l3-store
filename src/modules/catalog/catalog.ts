import { Component } from '../component';
import html from './catalog.tpl.html';

import { ProductList } from '../productList/productList';
import localforage from 'localforage';

class Catalog extends Component {
  productList: ProductList;

  constructor(props: any) {
    super(props);

    this.productList = new ProductList();
    this.productList.attach(this.view.products);
  }

  async render() {
    localforage.getItem('__wb-userId').then((id) => {
      fetch('/api/getProducts', {
        headers: {
          UserId: id as string
        }
      })
        .then((res) => res.json())
        .then((products) => {
          this.productList.update(products);
        });
    });
  }
}

export const catalogComp = new Catalog(html);
