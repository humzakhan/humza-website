import type { MetaFunction, LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { Nav } from "~/components/Nav";
import { ArticleLayout } from "~/components/ArticleLayout";
import { getArticle, type ArticleMeta } from "./articles";
import "~/styles/blog.css";

// Article content components — keyed by slug
import { OnBuildingThings } from "~/components/articles/OnBuildingThings";

const contentMap: Record<string, React.ComponentType> = {
  "on-building-things": OnBuildingThings,
};

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug ?? "";
  const article = getArticle(slug);
  if (!article) {
    throw new Response("Not Found", { status: 404 });
  }
  return { article };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [{ title: "Not Found — Humza Khan" }];
  }
  const { article } = data as { article: ArticleMeta };
  return [
    { title: `${article.title} — Humza Khan` },
    { name: "description", content: article.description },
  ];
};

export default function BlogPost() {
  const { article } = useLoaderData<typeof loader>() as { article: ArticleMeta };
  const Content = contentMap[article.slug];

  return (
    <div className="content">
      <Nav />
      <ArticleLayout meta={article}>
        {Content ? <Content /> : null}
      </ArticleLayout>
    </div>
  );
}
