import RouteDetail from "@/application/features/routes/RouteDetail/RouteDetail";
import useSession from "@/application/hooks/useSession";
import MainLayout from "@/application/pages/layouts/MainLayout";

const Route = () => {
  useSession();

  return (
    <MainLayout>
      <RouteDetail />
    </MainLayout>);
}

export default Route;