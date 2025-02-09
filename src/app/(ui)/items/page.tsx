import { redirect } from "next/navigation";

type NextProps = {
  searchParams: Promise<{ search: string }>;
};

export default async function SearchPage(props: NextProps) {
  const { search: query } = await props.searchParams;
  if (!query?.length) {
    redirect("/");
  } else {
    redirect(`/search/${query}`);
  }
}
