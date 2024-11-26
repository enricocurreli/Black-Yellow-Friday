import { cn } from "@/lib/utils";
import Marquee from "./ui/marquee";
import logoM from "../../media/user-man.png"
import logoF from "../../media/user-female.png"
const reviews = [
  {
    id: 1,
    name: "Luca Rossi",
    username: "@lucarossi",
    img: "https://via.placeholder.com/150",
    body: "Esperienza fantastica, lo consiglio a tutti!",
    gender: "male",
  },
  {
    id: 2,
    name: "Giulia Bianchi",
    username: "@giuliabianchi",
    img: "https://via.placeholder.com/150",
    body: "Servizio eccellente e super veloce!",
    gender: "female",
  },
  {
    id: 3,
    name: "Marco Verdi",
    username: "@marcoverdi",
    img: "https://via.placeholder.com/150",
    body: "Ottima qualità e prezzi imbattibili.",
    gender: "male",
  },
  {
    id: 4,
    name: "Sara Conti",
    username: "@saraconti",
    img: "https://via.placeholder.com/150",
    body: "Sono davvero soddisfatta, cinque stelle!",
    gender: "female",
  },
  {
    id: 5,
    name: "Davide Esposito",
    username: "@davideesposito",
    img: "https://via.placeholder.com/150",
    body: "Tutto perfetto, esperienza da ripetere!",
    gender: "male",
  },
  {
    id: 6,
    name: "Chiara Colombo",
    username: "@chiaracolombo",
    img: "https://via.placeholder.com/150",
    body: "Un servizio impeccabile, davvero consigliato!",
    gender: "female",
  },
  {
    id: 7,
    name: "Francesco Ricci",
    username: "@francescoricci",
    img: "https://via.placeholder.com/150",
    body: "Prodotti eccellenti, oltre le aspettative.",
    gender: "male",
  },
  {
    id: 8,
    name: "Martina Barbieri",
    username: "@martinabarbieri",
    img: "https://via.placeholder.com/150",
    body: "Tutto è stato perfetto, non cambierei nulla!",
    gender: "female",
  },
  {
    id: 9,
    name: "Alessandro Gallo",
    username: "@alessandrogallo",
    img: "https://via.placeholder.com/150",
    body: "Assistenza clienti gentilissima e super disponibile.",
    gender: "male",
  },
  {
    id: 10,
    name: "Elena Moretti",
    username: "@elenamoretti",
    img: "https://via.placeholder.com/150",
    body: "Esperienza incredibile, da provare assolutamente!",
    gender: "female",
  },
];


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  id,
  gender,
  img,
  name,
  username,
  body,
}: {
  id:number,
  gender:string,
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border-2 border-gray-600 p-4 bg-slate-300",
        // light styles
        // "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        // "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={gender == "female" ? logoF : logoM} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-black">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-black/60">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-black">{body}</blockquote>
    </figure>
  );
};

export function ReviewsHome() {
  return (
    <div className="relative flex h-[400px] w-full flex-col items-center  overflow-hidden rounded-lg  bg-background ">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 dark:from-background"></div>
    </div>
  );
}
