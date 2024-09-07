import PathTrail from "@/components/Breadcrumb";
import Container from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AdminPage = () => {
  return (
    <div>
      <Container>
        <PathTrail />
        <h1 className=" text-3xl font-semibold">Admin page</h1>
        <Separator className=" my-2" />
      </Container>
    </div>
  );
};

export default AdminPage;
