import { ArticleProps } from "@/types"

const Article = ({children, classes}:ArticleProps) => {

  
    return (
      <article className={classes} >
            {children}
      </article>
    )
  }
  
  export default Article