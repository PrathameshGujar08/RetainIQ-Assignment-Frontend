export interface ProductFilter {
    source: string;
    condition: string;
    value: string;
  }
  
  export interface ProductVariant {
    image: string;
    caption: string;
  }
  
  export interface Product {
    id: number;
    product_filter: ProductFilter[];
    product_variants: ProductVariant[];
  }
  