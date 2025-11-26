import { useParams } from "react-router-dom";
export default function ProjectDetail(){
  const { slug } = useParams();
  return <>Project Detail: {slug}</>;
}
