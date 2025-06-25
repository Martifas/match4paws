import { auth0 } from "@/lib/auth0";
import { getUserByAuth0Id } from "@/lib/queries/users";
import { getUserFavoritedPets } from "@/lib/queries/favorites";
import Header from "@/components/ui/containers/Header";
import BackButton from "@/components/ui/buttons/BackButton";
import FavoritesList from "@/components/favorites/FavoritesList";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function FavoritesPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const user = await getUserByAuth0Id(session.user.sub);

  if (!user) {
    redirect("/auth/login");
  }

  const favoritedPets = await getUserFavoritedPets(user.id);

  return (
    <>
      <Header
        left={<BackButton />}
        center={
          <h1 className="text-lg font-semibold tracking-wide select-none">
            My Favorites
          </h1>
        }
      />

      <FavoritesList initialPets={favoritedPets} />
    </>
  );
}
