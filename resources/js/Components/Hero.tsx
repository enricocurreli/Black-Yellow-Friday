import { HeroProps } from "@/types";

const Hero = ({classes, children}:HeroProps) => {
  return (
    <div className={"flex  justify-center " + classes}>
      <div className="text-center content-center px-6">
        {children}
      </div>
    </div>
  );
};

export default Hero;
