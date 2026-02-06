export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic Leather Jacket',
    price: 129.99,
    description: 'Premium leather jacket with quilted lining and metal zipper.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    name: 'Running Sneakers',
    price: 79.5,
    description: 'Lightweight running sneakers with breathable mesh upper.',
    image: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    name: 'Wireless Headphones',
    price: 199.0,
    description: 'Noise-cancelling over-ear headphones with 30h battery life.',
    image: 'https://images.unsplash.com/photo-1518444021833-6dcbf0f3ee30?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    name: 'Canvas Tote Bag',
    price: 24.99,
    description: 'Durable canvas tote with reinforced handles.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '5',
    name: 'Smart Watch',
    price: 149.99,
    description: 'Fitness-focused smartwatch with heart-rate and GPS.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '6',
    name: 'Ceramic Mug',
    price: 12.5,
    description: 'Handmade ceramic mug with gloss finish, 350ml.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
  },
];

export default PRODUCTS;
