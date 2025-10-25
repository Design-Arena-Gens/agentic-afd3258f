export type CakeImage = {
  id: number;
  url: string;
  primaryImage: boolean;
};

export type CakeReview = {
  id: number;
  reviewer: string;
  comment: string;
  rating: number;
  createdAt: string;
};

export type Cake = {
  id: number;
  name: string;
  description: string;
  price: number;
  flavor: string;
  occasion: string;
  dietaryRestrictions: string;
  featured: boolean;
  createdAt: string;
  sizes: string[];
  frostingOptions: string[];
  images: CakeImage[];
  reviews: CakeReview[];
  averageRating: number;
};

export type Testimonial = {
  id: number;
  customerName: string;
  message: string;
  rating: number;
};

export type CartItem = {
  cake: Cake;
  quantity: number;
  size?: string;
  frostingOption?: string;
  customMessage?: string;
};

export type Address = {
  id?: number;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  defaultAddress?: boolean;
};

export type OrderItem = {
  cakeId: number;
  cakeName: string;
  quantity: number;
  selectedSize?: string;
  frostingOption?: string;
  customMessage?: string;
  unitPrice: number;
  totalPrice: number;
};

export type OrderSummary = {
  id: number;
  createdAt: string;
  estimatedDelivery: string;
  status: string;
  total: number;
  items: OrderItem[];
};

