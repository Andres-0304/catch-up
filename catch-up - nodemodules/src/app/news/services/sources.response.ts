export interface SourcesResponse {
  status: string;
  sources: SourcesResource[];
}

export interface SourcesResource {
  id: string;
  name: string;
  url: string;
  urlToLogo: string;
}
