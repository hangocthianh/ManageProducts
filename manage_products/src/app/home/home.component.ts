import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../core/services/products.service';
import { Product, Category } from '../core/models/products';
import { CategoriesService } from '../core/services/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  filteredProducts: Product[] = [];
  productName: string = '';
  categoryId: string = '';
  productDelId: string = '';

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {}

  // get all data product
  getDataList() {
    this.productsService.getProducts().subscribe();
    this.productsService.productsObs.subscribe({
      next: (result) => {
        this.products = result;
      },
    });
  }
  ngOnInit(): void {
    this.getDataList();
    this.categoriesService.getCategories().subscribe();
    this.categoriesService.cateObs.subscribe({
      next: (result) => {
        this.categories = result;
      },
    });
  }

  // filter by name product and category
  filterChanged() {
    if (this.productName || this.categoryId) {
      this.productsService
        .getProductsFilter(this.productName, this.categoryId)
        .subscribe({
          next: (result) => {
            this.products = result;
          },
        });
    } else{
      this.getDataList();
    }
  }
  onClear() {
    this.getDataList();
  }

  // handle delete product by id
  openModalDel(id: string) {
    this.productDelId = id;
  }
  deleteProduct() {
    this.productsService.deleteProduct(this.productDelId).subscribe({
      next: (result) => {
        this.productDelId = '';
        this.onClear();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
