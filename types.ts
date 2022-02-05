export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  categories: string[];
  price: number;
}

export interface GuessData extends Product {
  guessed: boolean;
  guess: number;
}
