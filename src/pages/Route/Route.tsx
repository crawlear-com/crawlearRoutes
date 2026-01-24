import RouteDetail from "@/features/routes/RouteDetail/RouteDetail";
import useSession from "@/hooks/useSession";
import MainLayout from "@/layouts/MainLayout";

const Route = () => {
  useSession();

  return (
    <MainLayout>
      <RouteDetail />
    </MainLayout>);
}

export default Route;