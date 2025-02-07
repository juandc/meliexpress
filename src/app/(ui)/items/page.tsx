import { redirect } from "next/navigation";

type NextProps = {
  searchParams: Promise<{ q: string }>;
};

export default async function SearchPage(props: NextProps) {
  const searchParams = await props.searchParams;
  const query = searchParams.q;
  if (!query?.length) {
    redirect("/");
  } else {
    redirect(`/search/${query}`);
  }
}
