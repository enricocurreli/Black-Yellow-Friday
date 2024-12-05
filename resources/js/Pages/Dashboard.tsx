import Article from "@/Components/Article";
import CardRev from "@/Components/CardRev";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { DetailProps, ProductFormData, Review, Reviews } from "@/types";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { pre } from "framer-motion/client";
import { ChangeEvent, useEffect, useState } from "react";

export default function Dashboard({ reviews, prodRev }: DetailProps) {
  const { data, setData, post, errors, reset, progress } =
    useForm<ProductFormData>({
      titolo: "",
      prezzo: "",
      prezzo_scontato: "",
      descrizione: "",
      categorie: [],
      img: null,
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/products", {
      onSuccess: () => {
        reset();
      },
    });
  };
  console.log(reviews, prodRev);
  
  const { flash, auth } = usePage().props;
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setData("img", file); // Salva il file
    } else {
      setData("img", null); // Gestisci il valore null
    }
  };
  const user = auth?.user.name;
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openRev, setOpenRev] = useState<boolean>(false);
  console.log(reviews);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard di {user}
        </h2>
      }
    >
      <Head title="Dashboard" />
      <div className="py-12 md:h-[80vh] lg:h-[100vh]">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className=" bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 my-10 p-5 md:p-0">
            <div className="flex justify-between border border-gray-300 p-6 rounded-lg">
              <div className=" text-gray-900 text-2xl dark:text-gray-100   mb-4 ">
                Aggiungi un nuovo prodotto
              </div>
              {!openAdd ? (
                <div
                  className=" content-center  text-gray-900 text-2xl dark:text-gray-100  cursor-pointer  rotate-90 "
                  onClick={() => setOpenAdd(!openAdd)}
                >
                  ❯
                </div>
              ) : (
                <div
                  className=" content-center  text-gray-900 text-2xl dark:text-gray-100  cursor-pointer  -rotate-90 "
                  onClick={() => setOpenAdd(!openAdd)}
                >
                  ❯
                </div>
              )}
            </div>
            <div>
              {openAdd ? (
                <form
                  className="grid md:grid-cols-3 gap-5 p-5"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label className="text-gray-900 form-control w-full max-w-xs ">
                      <div className="label">
                        <span className="label-text text-gray-900">Titolo</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Iphone 16 Pro..."
                        className="input bg-white border-black  w-full max-w-xs"
                        value={data.titolo}
                        onChange={(e) => setData("titolo", e.target.value)}
                      />
                    </label>
                    {errors.titolo && (
                      <div className="text-red-500">{errors.titolo}</div>
                    )}
                  </div>
                  <div>
                    <label className="text-gray-900 form-control w-full max-w-xs ">
                      <div className="label">
                        <span className="label-text text-gray-900">
                          Prezzo €
                        </span>
                      </div>
                      <input
                        type="number"
                        placeholder="1599"
                        className="input bg-white border-black  w-full max-w-xs"
                        value={data.prezzo}
                        onChange={(e) => setData("prezzo", e.target.value)}
                      />
                    </label>
                    {errors.prezzo && (
                      <div className="text-red-500">{errors.prezzo}</div>
                    )}
                  </div>
                  <div>
                    <label className="text-gray-900 form-control w-full max-w-xs ">
                      <div className="label">
                        <span className="label-text text-gray-900">
                         * Prezzo Scontato € 
                        </span>
                      </div>
                      <input
                        type="number"
                        placeholder="899"
                        className="input bg-white border-black  w-full max-w-xs"
                        value={data.prezzo_scontato}
                        onChange={(e) =>
                          setData("prezzo_scontato", e.target.value)
                        }
                      />
                    </label>
                    {errors.prezzo_scontato && (
                      <div className="text-red-500">
                        {errors.prezzo_scontato}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="form-control">
                      <div className="label">
                        <span className="label-text text-gray-900">
                          Descrizione
                        </span>
                      </div>
                      <textarea
                        className="textarea bg-white border-black h-24 max-w-xs text-gray-900 "
                        placeholder="Descrizione"
                        value={data.descrizione}
                        onChange={(e) => setData("descrizione", e.target.value)}
                      ></textarea>
                    </label>
                    {errors.descrizione && (
                      <div className="text-red-500">{errors.descrizione}</div>
                    )}
                  </div>
                  <div>
                    {" "}
                    <label className="text-gray-900 form-control w-full max-w-xs ">
                      <div className="label">
                        <span className="label-text text-gray-900">
                          Categorie (separate da virgola)
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Smartphone, Tablet, Accessori"
                        className="input bg-white border-black  w-full max-w-xs"
                        value={data.categorie.join(",")}
                        onChange={(e) =>
                          setData("categorie", e.target.value.split(","))
                        }
                      />
                    </label>
                    {errors.categorie && (
                      <div className="text-red-500">{errors.categorie}</div>
                    )}
                  </div>
                  <div>
                    <label className="text-gray-900 form-control w-full max-w-xs ">
                      <div className="label">
                        <span className="label-text text-gray-900">
                          Immagini
                        </span>
                      </div>
                      <input
                        type="file"
                        className="file-input file-input-bg bg-white border-black  w-full max-w-xs"
                        name="img"
                        onChange={handleFileChange}
                      />
                    </label>

                    {errors.img && (
                      <div className="text-red-500">{errors.img}</div>
                    )}
                  </div>
                  {progress && (
                    <progress value={progress.percentage} max="100">
                      {progress.percentage}%
                    </progress>
                  )}
                  <button className="btn text-white" type="submit">
                    Aggiungi
                  </button>
                  <span className="label-text text-gray-900">
                       * ( 0 per non inserire un prezzo scontato )
                      </span>
                </form>
              ) : (
                ""
              )}

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
            </div>
          </div>
          <div className="p-5">
            <div className="flex justify-between border border-gray-300 p-6 rounded-lg">
              <div className=" text-gray-900 text-2xl dark:text-gray-100   mb-4 ">
                Le tue recensioni
              </div>
              {!openRev ? (
                <div
                  className=" content-center  text-gray-900 text-2xl dark:text-gray-100  cursor-pointer  rotate-90 "
                  onClick={() => setOpenRev(!openRev)}
                >
                  ❯
                </div>
              ) : (
                <div
                  className=" content-center  text-gray-900 text-2xl dark:text-gray-100  cursor-pointer  -rotate-90 "
                  onClick={() => setOpenRev(!openRev)}
                >
                  ❯
                </div>
              )}
            </div>
          </div>
          <Article classes="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 p-10 justify-content ">
            {openRev
              ? reviews.map((review) => {
                  return (
                    <div
                    key={review.id}
                      className={
                        "card bg-zinc-300 text-primary-content max-h-[700px]"
                      }
                    >
                      <div className="card-body">
                       
                          {
                            prodRev.map((prod)=> {
                              if(prod.id === review.product_id){
                                return <Link href={`product/show/${prod.id}`} className="card-title text-black"> {prod.titolo} </Link >
                            }})  
                          } 
                        
                        
                        <h2 className=" font-bold text-black">
                          {review.titolo}
                        </h2>
                        <p className="text-black">{review.descrizione}</p>
                      </div>
                    </div>
                  );
                })
              : ""}
          </Article>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
