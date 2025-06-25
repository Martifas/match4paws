import { auth0 } from "@/lib/auth0";
import { getUserByAuth0Id } from "@/lib/queries/users";
import { getUserFavoritedPets } from "@/lib/queries/favorites";
import Header from "@/components/ui/containers/Header";
import BackButton from "@/components/ui/buttons/BackButton";
import PetCard from "@/components/pet/PetCard";
import { redirect } from "next/navigation";

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

      <div className="max-w-xl mx-auto px-4">
        {favoritedPets.length > 0 ? (
          <div className="grid gap-3 md:gap-6 grid-cols-2 lg:grid-cols-3 py-6">
            {favoritedPets.map((pet) => (
              <PetCard
                key={pet.id}
                id={pet.id}
                name={pet.name}
                age={pet.ageGroup}
                breed={pet.breed}
                size={pet.size}
                imageUrl={pet.imageUrl}
                isFavorite={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-4 text-6xl">💔</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start exploring pets and add some to your favorites!
            </p>
            <a
              href="/searchresults"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
            >
              Explore Pets
            </a>
          </div>
        )}
      </div>
    </>
  );
}
