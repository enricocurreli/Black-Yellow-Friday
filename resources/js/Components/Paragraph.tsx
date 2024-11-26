import { ParagraphProps } from "@/types"



const Paragraph = ({children, classes}: ParagraphProps) => {
  return (
    
    <p  className={classes}>{children}</p>
  )
}

export default Paragraph