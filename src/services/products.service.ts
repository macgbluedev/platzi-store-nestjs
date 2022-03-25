import { Injectable } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { threadId } from 'worker_threads';

@Injectable()
export class ProductsService {
  private counterId = 1;

  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'More details for product 1',
      price: 122,
      stock: 50,
      image: 'https//:URIForImage',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((item) => item.id === id);
  }

  create(payload: any) {
    this.counterId += 1;
    const newProduct: Product = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: any) {
    const product = this.findOne(id)
    if (product) {
      const indexProduct = this.products.findIndex((p) => p.id === id)
      this.products[indexProduct] = {
        ...product,
        ...payload,
      };
      return this.products[indexProduct];
    }
    return null;
  }

  delete(payload: any) {
    let positionProduct = this.products.findIndex(p => p.id == payload.id);
    this.products.splice(positionProduct,1)
    return positionProduct;
  }
}
