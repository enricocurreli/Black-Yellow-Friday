import { Config } from "ziggy-js";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth?: {
    user: User;
  };
  ziggy?: Config & { location: string };
  flash?:{
    message: string|null;
  }
};

export type ArticleProps = {
  classes?: string;
  children: React.ReactNode;
};

export type TitleProps = {
  children: React.ReactNode;
  classes?: string;
  tag: string;
};
export type ParagraphProps = {

  children:  React.ReactNode;
  classes?: string;
  
}
export type ImgProps = {

  src: string | undefined ;
  classes?: string;
  alt?: string;
}
export type CardProps = {
  children: React.ReactNode
}
export interface ProductFormData {
  titolo: string;
  prezzo: string;
  prezzo_scontato: string;
  descrizione: string;
  categorie: string[];
  img: File | null;
}
export interface ReviewFormData {
  user_id: number;
  product_id: number;
  titolo: string;
  descrizione: string;
}
export interface Product {
  id: number;
  titolo: string;
  prezzo: string;
  prezzo_scontato: string;
  descrizione: string;
  categorie: string[];
  img: string;
}

export interface Props extends PageProps {
  products?: Product[];
}

export type DetailProps = {
  product: Product;
  auth:{
    user: User
  };
  user:[ {
    id: number;
    name:string;
  }];
  reviews:[{
    id:number
    titolo:string
    descrizione:string
    product_id:number
    user_id:number
    created_at:string
    updated_at:string
  }]
}