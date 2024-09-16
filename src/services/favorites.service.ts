import localforage from 'localforage';
import { ProductData } from 'types';

const FAV_DB = '__wb-favorites';

class FavoritesService {
  init() {
    this._updCounters();
  }

  async addProduct(product: ProductData) {
    const products = await this.get();
    await this.set([...products, product]);
  }

  async removeProduct(product: ProductData) {
    const products = await this.get();
    await this.set(products.filter(({ id }) => id !== product.id));
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(FAV_DB)) || [];
  }

  async set(data: ProductData[]) {
    await localforage.setItem(FAV_DB, data);
    this._updCounters();
  }

  async isInFavorites(product: ProductData) {
    const products = await this.get();
    return products.some(({ id }) => id === product.id);
  }

  private async _updCounters() {
    const products = await this.get();
    const count = products.length >= 10 ? '9+' : products.length;
    const favHeaderBtn = document.querySelector('.favorites');

    //@ts-ignore
    document.querySelectorAll('.js__favs-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));

    if ((await this.get()).length === 0) {
      favHeaderBtn?.classList.add('favorites_invisible');
    } else favHeaderBtn?.classList.remove('favorites_invisible');
  }
}

export const favoritesService = new FavoritesService();
