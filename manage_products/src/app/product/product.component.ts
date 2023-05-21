import { Component, OnInit, ViewChild } from '@angular/core';
import { Category, Product } from '../core/models/products';
import { CategoriesService } from '../core/services/categories.service';
import { ProductsService } from '../core/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  addProductForm: FormGroup;
  product: Product = {
    id: '',
    name: '',
    description: '',
    color: '',
    price: 0,
    category: {id:'', name:''} as Category,
  };
  categories: Category[] = [];
  message: string = '';
  typeNote: string = '';
  onlyRead: boolean = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {
    this.addProductForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      category: new FormControl(),
      color: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl(),
    });
  }
  ngOnInit(): void {
    //check is page detail
    if (this.router.url.includes('detail-product')) {
      this.onlyRead = true;
      this.addProductForm.disable();
    }
    const { id } = this.activatedRoute.snapshot.params;
    // get detail info product
    if (id) {
      this.productsService.getProductDetail(id).subscribe({
        next: (result) => {
          this.product = result;
          this.addProductForm.setValue(result);
        },
      });
    }
    // get options category
    this.categoriesService.getCategories().subscribe();
    this.categoriesService.cateObs.subscribe({
      next: (result) => {
        this.categories = result;
      },
    });
  }


  handleSubmit() {
    if (this.addProductForm.invalid) {
      this.message = 'Incomplete information!';
      this.typeNote = 'danger';
      return;
    }
    const { id } = this.activatedRoute.snapshot.params;
    if (id) {
      if (this.onlyRead) {
        this.router.navigate([`/edit-product/${id}`]);
      } else {
        this.productsService.updateProduct(id, this.product).subscribe({
          next: (result) => {
            this.message = 'Update product success';
            this.typeNote = 'success';
          },
          error: (err) => {
            this.message = err.error.message;
            this.typeNote = 'error';
          },
        });
      }
    } else {
      this.productsService.createProduct(this.product).subscribe({
        next: (result) => {
          this.message = 'Create product success';
          this.typeNote = 'success';
          this.resetForm();
        },
        error: (err) => {
          this.message = err.error.message;
          this.typeNote = 'error';
        },
      });
    }
  }
  //close alter
  onCloseAlter() {
    this.message = '';
    this.typeNote = '';
  }
  // handle select category
  onChangeCategory(e: string) {
    const selected: any = this.categories.find((_) => _?.id === e);
    this.product.category = selected;
  }
  resetForm() {
    this.addProductForm.reset();
  }
}
