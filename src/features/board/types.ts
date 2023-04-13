export type BoardState = {
  board: {
    name: string;
    items: {
      id: string;
      content: string;
    }[];
    id: string;
  }[];
};

export type DeleteCardProps = {
  index: number;
  id: string;
};

export type ChangeTitleСolumnProps = {
  index: number;
  text: string;
};

export type ChangeTitleCardProps = {
  indexColumn: number;
  indexCard: number;
  text: string;
};

export type AddCardProps = {
  index: number;
  text: string;
};
