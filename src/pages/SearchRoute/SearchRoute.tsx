import SearchRouteMap from "@/features/maps/SearchRouteMap/SearchRouteMap";
import MainLayout from "@/layouts/MainLayout";

const SearchRoute = () => {
  return (
    <MainLayout contentClassName="sm:w-[90%] m-auto min-h-[80vh]">
      <SearchRouteMap />
    </MainLayout>);
}

export default SearchRoute;