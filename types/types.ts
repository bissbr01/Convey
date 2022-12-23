export interface Document {
  PK: string;
  SK: string;
}

export interface IllustrationMeta extends Document {
  text: string;
  image: string;
  date: string;
  keywords: Set<string>;
  entities: Set<string>;
}

export interface IllustrationKeyword extends Document {
  rank: number;
  count: number;
}

export interface IllustrationEntity extends Document {
  label: string;
  label_id: number;
}

export type KeywordIllustrations = [IllustrationKeyword];
