export interface Document {
  PK: string;
  SK: string;
}

export interface IllustrationMeta extends Document {
  text: string;
  image: string;
  date: string;
  link: string;
  keywords: Set<string>;
  entities: Set<string>;
}

export interface IllustrationKeyword extends Document {
  rank: number;
  date: string;
  count: number;
  image: string;
  link: string;
}

export interface IllustrationEntity extends Document {
  label: string;
  label_id: number;
}

export type KeywordIllustrations = [IllustrationKeyword];

export type KeywordAndWeight = [number, string];
