export type Product = {
  id: string;
  name: string;
  price: number; // cents
  image: string;
  description: string;
  category?: string; // optional category id (e.g., 'hoodies')
  sizes?: string[]; // available sizes
  stock?: number; // units available
  tag?: string; // optional tag like 'Limited' or 'New'
};

export type Category = {
  id: string;
  name: string;
  image?: string;
  description?: string;
  featured?: boolean;
}; 

export const categories: Category[] = [
  {
    id: 'featured',
    name: 'Featured',
    image: '/Images/young-japanese-couple.jpg',
    description: 'Limited drops & signature pieces',
    featured: true,
  },
  {
    id: 'hoodies',
    name: 'Hoodies',
    image: '/Images/people-grandstands.jpg',
  },
  {
    id: 'tshirts',
    name: 'T-Shirts',
    image: '/Images/shirt-mockup-concept-with-plain-clothing.jpg',
  },
  {
    id: 'jackets',
    name: 'Jackets',
    image: '/Images/portrait-young-japanese-woman-with-jacket.jpg',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: '/Images/glasses-casual-outfit-composition.jpg',
  },
];

export const products: Product[] = [
  {
    id: 'res-hoodie-1',
    name: 'RES Heavyweight Hoodie',
    price: 3000,
    image: '/Images/Men Hoodie Mockup, Front View.png',
    description: 'Premium heavyweight hoodie with RES branding.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 0,
  },
  {
    id: 'res-tee-1',
    name: 'RES Logo Tee',
    price: 19900,
    image: '/Images/Women T-Shirt Mockup, Floating.png',
    description: 'Premium cotton T-shirt with bold RES graphic.',
    category: 'tshirts',
    sizes: ['S', 'M', 'L'],
    stock: 0,
  },
  {
    id: 'res-beanie-1',
    name: 'RES beanie',
    price: 69900,
    image: '/Images/Beanie Mockup Floating.png',
    description: 'Classic knit beanie; one size fits all.',
    category: 'accessories',
    sizes: ['One Size'],
    stock: 0,
  },
  {
    id: 'res-cap-1',
    name: 'RES Cap',
    price: 9900,
    image: '/Images/Cap Mockup.png',
    description: 'Unstructured cap with embroidered logo.',
    category: 'accessories',
    sizes: ['One Size'],
    stock: 0,
  },
  {
    id: 'res-bag-1',
    name: 'RES Tote Bag',
    price: 15900,
    image: '/Images/Tote Bag Mockup Hanging.png',
    description: 'Durable canvas tote bag with RES logo print.',
    category: 'accessories',
    sizes: ['One Size'],
    stock: 0,
  },
  {
    id: 'res-tee-2',
    name: 'RES Middle Logo Tee',
    price: 19900,
    image: '/Images/Men T Shirt Mockup, Front View .png',
    description: 'Premium cotton T-shirt with bold RES graphic.',
    category: 'tshirts',
    sizes: ['S', 'M', 'L'],
    stock: 0,
  },
];