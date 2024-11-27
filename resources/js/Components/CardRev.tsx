import { Review } from "@/types";


const CardRev = ({review,classes}:Review) => {
  return (
    <div className={"card bg-zinc-300 text-primary-content " + classes}>
      <div className="card-body">
        <h2 className="card-title text-black">{review.user_name} :</h2>
        <h2 className=" font-bold text-black">{review.titolo}</h2>
        <p className="text-black">{review.descrizione}</p>
      </div>
    </div>
  );
};

export default CardRev;
