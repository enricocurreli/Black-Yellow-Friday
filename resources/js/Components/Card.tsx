import { CardProps, Product, Props } from "@/types";
import Title from "./Title";
import Paragraph from "./Paragraph";
import Img from "./Img";



const Card = ({children}: CardProps) => {
  return (
    <div className="card glass md:w-80 w-60 h-[500px] shadow-xl my-5 hover:-translate-y-2 transition-all">
      {children}
    </div>
  );
};
Card.Img = Img;
Card.Paragraph = Paragraph;
Card.Title = Title;
export default Card;
