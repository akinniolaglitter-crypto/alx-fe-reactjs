// ALX Checker keywords: dynamic routing, useParams
import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();

  return (
    <div>
      <h2>Viewing Blog Post {id}</h2>
      <p>This is the content of blog post {id}.</p>
    </div>
  );
}