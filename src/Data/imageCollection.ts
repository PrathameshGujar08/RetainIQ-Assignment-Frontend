interface ImageObject {
  image: string;
  caption: string;
}

const ImageArray: ImageObject[] = [
  {
    image: "/images/item1.jpeg",
    caption: "Sale - Item 1"
  },
  {
    image: "/images/item2.jpeg",
    caption: "Sale - Item 2"
  },
  {
    image: "/images/item3.jpeg",
    caption: "Sale - Item 3"
  },
  {
    image: "/images/item4.jpeg",
    caption: "Sale - Item 3"
  },
  {
    image: "/images/item1.jpeg",
    caption: "Sale - Item 3"
  },
  {
    image: "/images/item4.jpeg",
    caption: "Sale - Item4"
  }
];

export default ImageArray;