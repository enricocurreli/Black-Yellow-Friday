import Article from "@/Components/Article";
import Img from "@/Components/Img";
import Navbar from "@/Components/Navbar";
import Paragraph from "@/Components/Paragraph";
import Title from "@/Components/Title";
import DetailLayout from "@/Layouts/DetailLayout";
import { DetailProps, Props, ReviewFormData } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { div } from "framer-motion/client";
import { useEffect, useState } from "react";

const ProductDetail = ({ product, reviews,user }: DetailProps) => {
  const { flash, auth } = usePage().props;
  const userID = auth?.user.id;
  const { data, setData, post, errors, reset, progress } =
    useForm<ReviewFormData>({
      
      user_id:userID!,
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


  // console.log(user);
  // console.log(reviews);
  
  const {id} = product;
 
  //Recensione del singolo prodotto
  const searchRev = reviews.filter((rev)=> rev.product_id == id)
 


  
  

  return (
    <DetailLayout>
      <Navbar auth={auth}/>
      
      <Article classes="grid md:grid-cols-2 p-6 ">
        <Article classes="md:mt-40 mt-20 p-6  flex justify-center">
          <Img
            src={"/storage/" + product.img}
            alt={product.img}
            classes=" md:w-[480px] shadow-xl rounded-xl"
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

          <Title tag="h3" classes="font-bold text-xl mb-2">
            Prezzo:{" "}
            <span className="line-through decoration-red-700 text-2xl">
              {product.prezzo} €
            </span>
            {" -> "}
            {product.prezzo_scontato} €
          </Title>
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
      <Article>
        <Title
          tag="h2"
          classes="md:mt-8  mt-8 p-4 md:ps-10 md:text-4xl text-3xl content-center font-bold text-center md:text-start"
        >
          Lascia una recensione
        </Title>
        <form
          className="gap-5 p-5"
          onSubmit={handleSubmitReviews}
        >
               <div>
                    <label className="text-gray-900 form-control max-w-lg ">
                      <div className="label">
                        <span className="label-text text-lg text-gray-900">Titolo</span>
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
                  <div>
                    <label className="form-control">
                      <div className="label">
                        <span className="label-text text-lg text-gray-900">
                          Descrizione
                        </span>
                      </div>
                      <textarea
                        className="textarea bg-white border-black h-32 max-w-lg text-gray-900 "
                        placeholder="Descrizione"
                        value={data.descrizione}
                        onChange={(e) => setData("descrizione", e.target.value)}
                      ></textarea>
                    </label>
                    {errors.descrizione && (
                      <div className="text-red-500">{errors.descrizione}</div>
                    )}
                  </div>
                  <button className="btn text-white  bg-sky-950 mt-5" type="submit">
                    Aggiungi
                  </button>
        </form>

      </Article>
      <Article>
        <Title
          tag="h2"
          classes="md:my-8 mt-8 p-4 ps-10 md:text-4xl text-3xl content-center font-bold text-center md:text-start"
        >
          Recensioni
        </Title>
        {

        }
      </Article>
    </DetailLayout>
  );
};

export default ProductDetail;
