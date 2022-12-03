export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type Photo = {
  url: string;
};

export interface HighlightInterface {
  top: number | undefined;
  left: number | undefined;
  right: number | undefined;
  bottom: number | undefined;
  width: number | undefined;
  height: number | undefined;
}
