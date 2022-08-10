export interface BoardState {
  board: {
    name: string;
    items: {
      id: string;
      content: string;
    }[];
    id: string;
  }[];
}

export interface DeleteCardProps {
  index: number;
  id: string;
}

export interface ChangeTitleСolumnProps {
  index: number;
  text: string;
}

export interface ChangeTitleCardProps {
  indexColumn: number;
  indexCard: number;
  text: string;
}

export interface AddCardProps {
  index: number;
  text: string;
}
