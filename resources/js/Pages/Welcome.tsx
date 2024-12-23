import Article from "@/Components/Article";
import Card from "@/Components/Card";
import Countdown from "@/Components/Countdown";
import Footer from "@/Components/Footer";
import Hero from "@/Components/Hero";
import Navbar from "@/Components/Navbar";
import { ReviewsHome } from "@/Components/ReviewsHome";
import Title from "@/Components/Title";
import { VelocityScroll } from "@/Components/ui/scroll-based-velocity";
import ShimmerButton from "@/Components/ui/shimmer-button";
import { Props } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, products }: Props) {
  return (
    <>
      <Head title="Homepage" />
      <Navbar auth={auth} />
      <Hero classes="heroHomeBgrd">
        <Title tag="h1" classes="md:text-9xl text-5xl mt-10 mb-5 font-bold title2-3d">
          Black
          <span className="font-normal text-white font-[Electrolize] title-3d">
            Wave
          </span>
        </Title>
        <Title tag="h3" classes="md:text-4xl text-3xl font-bold filter">
          Cavalca l'onda dei super sconti in occasione del Black Friday!
        </Title>
      </Hero>
      <Article>
        <VelocityScroll
          text=" - Offerte valide fino al 10 Dic. "
          default_velocity={5}
          className="font-display text-center text-3xl font-bold tracking-[-0.01em] drop-shadow-sm md:text2xl md:leading-[5rem] banner-border "
        />
      </Article>
      <Article classes="grid md:auto-rows-auto justify-center px-7">
        <div className="bg-sky-950 rounded-3xl md:my-10 mt-16">
          <Title
            tag="h1"
            classes="text-center my-8 p-4 md:text-4xl text-3xl content-center font-bold"
          >
            Ottieni sconti incredibili prima che sia troppo tardi ⏳
          </Title>
          <Countdown />
          <div className="flex justify-center">
            {/* <ShimmerButton className="w-44 md:p-5 p-3 my-5 text-[#FDED00] font-medium shadow-2xl hover:bg-base-200">
              SCOPRI
            </ShimmerButton> */}
          </div>
        </div>
      </Article>
      <Article>
        <Title
          tag="h2"
          classes="md:my-8 mt-8 p-4 ps-10 md:text-5xl text-3xl content-center font-bold text-center md:text-start"
        >
          Offerte Speciali
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 justify-items-center">
          {products &&
            products.map((product) => {
              if (product.prezzo_scontato != 0) {
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
                          <div className="badge badge-accent">Offer</div>
                        </Card.Title>

                        {/* {
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
                        } */}
                        <Title tag="h3" classes="font-bold text-xl">
                          Prezzo:{" "}
                          <span className="line-through decoration-red-700 text-2xl">
                            {product.prezzo} €
                          </span>{" "}
                          {product.prezzo_scontato} €
                        </Title>
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
              }
            })}
        </div>
      </Article>
      <Article classes="p-5 md:px-10">
        <Title
          tag="h2"
          classes="md:my-8 mb-8 md:text-5xl text-3xl content-center font-bold text-center md:text-start"
        >
          Dicono di noi
        </Title>
        <ReviewsHome />
      </Article>
      <Footer />
    </>
  );
}
