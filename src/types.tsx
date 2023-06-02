
export interface CardObj {
  name: string;
  points: string;
  color: string;
  image_uri: string;
  isSelected: boolean;
  selection: string;
  onClick: () => void;
}
