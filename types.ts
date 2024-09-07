export type Project = {
  id: string;
  name: string;
  description: string;
  price: number;
  address: string;
  images: Image[];
  inStock: boolean;
  slug: string;
};

export interface Image {
  id: string;
  url: string;
}

export type BlogPost = {
  id: string;
  title: string;
  subtitle: string | undefined;
  coverImage: string;
  content: string;
  published: boolean;
  slug: string;
};

export type CategoryData = {
  label: string;
  value: string;
};

export type Team = {
  id: string;
  name: string;
  bio: string | null;
  role: string;
  image: string;
};

export type ExternalLinks = {
  id: string;
  link: string;
};
export type FAQS = {
  id: string;
  question: string;
  answer: string;
};

export type News = {
  id: string;
  link: string | null;
  content: string;
};
