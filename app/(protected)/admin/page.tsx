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
        <h2 className="mt-5 text-lg text-gray-500">Customize home page</h2>
        <div className=" border border-black max-w-[200px]  rounded-xl">
          <div className=" w-full h-[100px]">Hero</div>
          <div className=" border-y-black border h-[100px]">About Us</div>
          <Button variant={"ghost"} className=" h-[100px] w-full rounded-none">
            Link
          </Button>
          <div></div>
        </div>
      </Container>
    </div>
  );
};

export default AdminPage;
