import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './productList.tpl.html';
import { ProductData } from 'types';
import { Product } from '../product/product';
import { isInViewport, sendEvent } from '../../utils/analytics';

export class ProductList {
  view: View;
  products: ProductData[];

  constructor() {
    this.products = [];
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(products: ProductData[]) {
    this.products = products;
    this.render();
  }

  render() {
    this.view.root.innerHTML = '';

    this.products.forEach((product) => {
      const productComp = new Product(product);
      let secretKey: string | null = null;

      productComp.render();
      productComp.attach(this.view.root);

      const sendViewCardEvent = async () => {
        if (isInViewport(productComp.view.root)) {
          sendEvent(product.log.promotion ? 'viewCardPromo' : 'viewCard', {
            ...product,
            secretKey: secretKey
          });

          document.removeEventListener('scroll', sendViewCardEvent);
        }
      };

      fetch(`/api/getProductSecretKey?id=${product.id}`)
        .then((res) => res.json())
        .then((key) => {
          secretKey = key;
          document.addEventListener('scroll', sendViewCardEvent);
        });
    });
  }
}
