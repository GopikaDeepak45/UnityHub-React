import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface CardWrapperProps{
  title:string,
  description:string,
  footer:string,
  children:React.ReactNode
}

const MyCard = ({title,description,footer,children}:CardWrapperProps) => {
  return (
    
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        <p>{footer}</p>
      </CardFooter>
    </Card>
    
  )
}

export default MyCard