import Article from "@/Components/Article";
import Card from "@/Components/Card";
import Footer from "@/Components/Footer";
import Hero from "@/Components/Hero";
import Navbar from "@/Components/Navbar";
import Title from "@/Components/Title";
import { Props } from "@/types";
import { Head, Link } from "@inertiajs/react";
import React from "react";

const Products = ({ auth, products }: Props) => {
  return (
    <>
      <Head title="Products" />
      <Navbar auth={auth} />
      <Hero classes="heroProdBgrd">
        <Title tag="h1" classes="md:text-9xl text-5xl mt-10 mb-5 font-bold title2-3d">
          Black
          <span className="font-normal text-white font-[Electrolize] title-3d">
            Wave
          </span>
        </Title>
        <Title tag="h3" classes="md:text-4xl text-3xl font-bold filter">
          Scopri tutti i nostri prodotti
        </Title>
      </Hero>
      <Article>
        <Title
          tag="h2"
          classes="md:mt-14 mt-8 p-4 ps-11 md:text-5xl text-3xl content-center font-bold text-center md:text-start"
        >
          Prodotti
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 justify-items-center">
          {products &&
            products.map((product) => {
  
                return (
                  <Link href={`product/show/${product.id}`} key={product.id}>
                    <Card>
                      <figure>
                        <Card.Img
                          src={"storage/" + product.img}
                          alt={product.img}
                          classes="md:h-[260px] h-[200px] w-full bg-white"
                        />
                      </figure>
                      <div className="card-body">
                        <Card.Title tag="h2" classes="card-title">
                          {product.titolo}
                          {
                             product.prezzo_scontato != 0 ? <div className="badge badge-accent">Offer</div> : " "
                          }
                          
                        </Card.Title>

                        {
                          product.prezzo_scontato != 0 ? (<Title tag="h3" classes="font-bold text-xl">
                            Prezzo:{" "}
                            <span className="line-through decoration-red-700 text-2xl">
                              {product.prezzo} €
                            </span>{" "}
                            {product.prezzo_scontato} €
                          </Title>
                          ) : (
                            <Title tag="h3" classes="font-bold text-xl">
                            Prezzo:{" "}  {product.prezzo}  €
                          </Title>
                          )
                        }
                        <Card.Paragraph classes="truncate">
                          {product.descrizione}
                        </Card.Paragraph>
                        <div className="card-actions md:justify-end ">
                          {product.categorie.map((categoria) => {
                            return (
                              <div
                                className="badge badge-outline"
                                key={categoria}
                              >
                                {categoria}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              
            })}
        </div>
      </Article>
      <Footer />
    </>
  );
};

export default Products;
