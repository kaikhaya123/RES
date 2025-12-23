export type Product = {
  id: string;
  name: string;
  price: number; // cents
  image: string;
  description: string;
  slug?: string;
};

export const products: Product[] = [
  {
    id: 'res-hoodie-1',
    name: 'RES Heavyweight Hoodie',
    price: 3000,
    image: '/Images/Essentials Hoodie (Black) - XS.jpg',
    description: 'Comfortable, heavyweight hoodie with RES branding. Available in S-XL.',
    slug: 'res-hoodie'
  },
  {
    id: 'res-tee-1',
    name: 'RES Logo Tee',
    price: 19900,
    image: '/Images/college-students.jpg',
    description: 'Premium cotton T-shirt with bold RES graphic.',
    slug: 'res-tee'
  },
  {
    id: 'res-jacket-1',
    name: 'RES Coach Jacket',
    price: 69900,
    image: '/Images/students-rehashing-theater-class%20(1).jpg',
    description: 'Lightweight coach jacket — great for studio & stage.',
    slug: 'res-jacket'
  },
  {
    id: 'res-cap-1',
    name: 'RES Cap',
    price: 9900,
    image: '/Images/young-adults-meeting-up-study-min.jpg',
    description: 'Unstructured cap with embroidered logo.',
    slug: 'res-cap'
  }
];