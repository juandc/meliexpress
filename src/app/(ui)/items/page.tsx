import { redirect } from "next/navigation";

type NextProps = {
  searchParams: Promise<{ q: string }>;
};

export default async function SearchPage(props: NextProps) {
  const { q: query } = await props.searchParams;
  if (!query?.length) {
    redirect("/");
  } else {
    redirect(`/search/${query}`);
  }
}
