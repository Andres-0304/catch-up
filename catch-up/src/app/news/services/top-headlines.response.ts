export interface TopHeadlinesResponse {
  status: string;
  totalResults: number;
  articles: ArticleResource[];
}

export interface ArticleResource {
  source:{ id:string | null; name: string };
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}
