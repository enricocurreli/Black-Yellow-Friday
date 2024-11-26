import { ImgProps } from "@/types"

const Img = ({classes, src, alt}: ImgProps) => {
  
    return <img className={classes} src={src} alt={alt} />
}

export default Img