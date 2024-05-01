export interface ISeo {
  title: string;
  description: string;
}

export interface ICategory {
  id: number;
  title: string;
  description: string;
  showInMenu: boolean;
  featured: boolean;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}
