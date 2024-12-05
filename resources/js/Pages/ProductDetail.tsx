import Article from "@/Components/Article";
import CardRev from "@/Components/CardRev";
import Img from "@/Components/Img";
import Navbar from "@/Components/Navbar";
import Paragraph from "@/Components/Paragraph";
import Title from "@/Components/Title";
import DetailLayout from "@/Layouts/DetailLayout";
import { DetailProps, Props, ReviewFormData } from "@/types";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { div } from "framer-motion/client";
import { useEffect, useState } from "react";

const ProductDetail = ({ product, reviews }: DetailProps) => {
  const { flash, auth } = usePage().props;

  let userID;
  let userName;
  if (auth?.user) {
    userID = auth.user.id;
    userName = auth.user.name;
  }

  const { data, setData, post, errors, reset, progress } =
    useForm<ReviewFormData>({
      user_name: userName!,
      user_id: userID!,
      product_id: product.id,
      titolo: "",
      descrizione: "",
    });

  const handleSubmitReviews = (e: React.FormEvent) => {
    e.preventDefault();
    post("/reviews", {
      onSuccess: () => {
        reset();
      },
    });
  };

  const [flashMsg, setFlashMsg] = useState(flash?.message);
  useEffect(() => {
    if (flash?.message) {
      setFlashMsg(flash.message);
      const timeout = setTimeout(() => {
        setFlashMsg(null);
      }, 2000);

      // Pulizia per evitare memory leaks
      return () => clearTimeout(timeout);
    }
  }, [flash?.message]);

  const { id } = product;

  //Recensione del singolo prodotto
  const searchRev = reviews.filter((rev) => rev.product_id == id);

  return (
    <DetailLayout>
      <Navbar auth={auth} />

      <Article classes="grid lg:grid-cols-2 p-6 ">
        <Article classes="lg:mt-40 mt-20 p-6  flex justify-center">
          <Img
            src={"/storage/" + product.img}
            alt={product.img}
            classes=" md:w-[580px]   shadow-xl rounded-xl"
          />
        </Article>

        <Article classes="md:mt-40 mt-10 p-6  justify-center bg-sky-950 shadow-xl rounded-xl">
          <div className="flex gap-5 text-lg mb-5">
            {product.categorie.map((categoria) => {
              return (
                <Paragraph classes="" key={categoria}>
                  {categoria}
                </Paragraph>
              );
            })}
          </div>
          <Title classes="text-5xl mb-3" tag="h2">
            {product.titolo}
          </Title>
          <Paragraph classes="text-xl mb-5">{product.descrizione}</Paragraph>
          {product.prezzo_scontato != 0 ? (
            <Title tag="h3" classes="font-bold text-xl mb-2">
              Prezzo:{" "}
              <span className="line-through decoration-red-700 text-2xl">
                {product.prezzo} €
              </span>
              {" -> "}
              {product.prezzo_scontato} €
            </Title>
          ) : (
            <Title tag="h3" classes="font-bold text-xl mb-2">
              Prezzo: {product.prezzo} €
            </Title>
          )}
        </Article>
        {flashMsg && (
          <div role="alert" className="alert alert-success w-1/2 m-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{flashMsg}</span>
          </div>
        )}
      </Article>
      <Article classes="bg-sky-950 mt-20">
        <Title
          tag="h2"
          classes="md:pt-10 mt-8 p-4 md:ps-10 md:text-4xl text-3xl content-center font-bold text-center md:text-start"
        >
          Lascia una recensione
        </Title>
        {auth?.user ? (
          <form className="gap-5 p-10" onSubmit={handleSubmitReviews}>
            <div>
              <label className="text-gray-900 form-control max-w-lg ">
                <div className="label">
                  <span className="label-text text-lg text-white">Titolo</span>
                </div>
                <input
                  type="text"
                  placeholder="Titolo recensione"
                  className="input bg-white border-black  max-w-lg"
                  value={data.titolo}
                  onChange={(e) => setData("titolo", e.target.value)}
                />
              </label>
              {errors.titolo && (
                <div className="text-red-500">{errors.titolo}</div>
              )}
            </div>
            <div className="my-5">
              <label className="form-control">
                <div className="label">
                  <span className="label-text text-lg text-white">
                    Descrizione{" "}
                    <span
                      className={
                        data.descrizione.length < 500
                          ? "text-base ps-3 "
                          : "text-base ps-3 text-red-600"
                      }
                    >
                      {" "}
                      {data.descrizione.length}/500{" caratteri "}
                    </span>
                  </span>
                </div>

                <textarea
                  className="textarea bg-white border-black h-32 max-w-lg text-gray-900"
                  placeholder="Descrizione"
                  value={data.descrizione}
                  onChange={(e) => setData("descrizione", e.target.value)}
                />
              </label>
              {errors.descrizione && (
                <div className="text-red-500">{errors.descrizione}</div>
              )}
            </div>
            {data.descrizione.length < 500 ? (
              <button
                className="p-5 my-5 md:text-2xl text-lg content-center font-medium text-center md:text-start btn bg-black text-[#FDED00]  shadow-2xl hover:bg-[#FDED00] hover:text-black transition-all"
                type="submit"
              >
                Aggiungi
              </button>
            ) : (
              <>
              <div className="text-red-600"> Limite massimo caratteri superato!</div>
              <button
                className="p-5 my-5 md:text-2xl text-lg content-center font-medium text-center md:text-start btn bg-black text-[#FDED00]  shadow-2xl hover:bg-[#FDED00] hover:text-black transition-all"
                type="submit"
                disabled
              >
                Aggiungi
              </button>
              </>
            )}   
          </form>
        ) : (
          <div className="ps-10">
            <Link
              className="p-5 my-3 md:text-2xl text-lg content-center font-medium text-center md:text-start btn bg-black text-[#FDED00]  shadow-2xl hover:bg-[#FDED00] hover:text-black transition-all"
              href={route("login")}
            >
              Accedi
            </Link>
          </div>
        )}
        <Article>
          <Title
            tag="h2"
            classes="md:my-5 mt-8 p-4 ps-10 md:text-4xl text-3xl content-center font-bold text-center md:text-start"
          >
            Recensioni
          </Title>
          <Article classes="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 p-10 justify-content ">
            {searchRev.map((review) => {
              return (
                <CardRev
                  key={review.id}
                  review={review}
                  classes="max-w-[370px]"
                />
              );
            })}
          </Article>
        </Article>
      </Article>
    </DetailLayout>
  );
};

export default ProductDetail;
