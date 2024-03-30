export type UserType = {
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
  company: {
    bs: string;
    catchPhrase: string;
    name: string;
  };
  address: {
    street: string;
    suite: string;
    zipcode: `${number}-${number}`;
    city: string;
    geo: { lat: `${number}`; lng: `${number}` };
  };
};

type Special = {
  userId: number;
  id: number;
  title: string;
};

export type PostType = Special & {
  body: string;
};

export type CommentType = Pick<Special, "id"> & {
  postId: number;
  name: string;
  email: string;
  body: string;
};

export type TodoType = Special & {
  completed: boolean;
};

export type AlbumType = Special;
export type PhotoType = Omit<Special, "userId"> & {
  albumId: number;
  url: string;
  thumbnailUrl: string;
};
