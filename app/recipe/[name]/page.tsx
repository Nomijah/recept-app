type PageParams = {
  params: {
    name: string;
  };
};

export default function Page({ params }: PageParams) {
  return <h1>{params.name}</h1>;
}
