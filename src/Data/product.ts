import { Product } from '../Types/types';

const ProductsList: Product[] =[
    {
      "id": 1,
      "product_filter": [
        {
          "source": "Product Collection1",
          "condition": "contains1",
          "value": "Anarkali dress"
        }
      ],
      "product_variants": [
        {
          "image": "/images/item4.jpeg",
          "caption": "Anarkali dress"
        },
        {
          "image": "/images/item1.jpeg",
          "caption": "Random Captions"
        }
      ]
    },
    {
      "id": 2,
      "product_filter": [
        {
          "source": "Product Collection2",
          "condition": "contains2",
          "value": "Anarkali dress"
        },
      ],
      "product_variants": [
        {
          "image": "/images/item2.jpeg",
          "caption": "Anarkali dress"
        },
        {
          "image": "/images/item2.jpeg",
          "caption": "Anarkali dress"
        }
      ]
    },
    {
      "id": 3,
      "product_filter": [
        {
          "source": "Product Collection3",
          "condition": "contains3",
          "value": "Anarkali dress"
        }
      ],
      "product_variants": [
        {
          "image": "/images/item3.jpeg",
          "caption": "Sale"
        },
        {
          "image": "/images/suit.jpeg",
          "caption": "Sale"
        }
      ]
    }
  ]
  
  export default ProductsList;
