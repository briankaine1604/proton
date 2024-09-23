import { Card, CardHeader, CardFooter, CardContent } from "../ui/card";
import { Backbutton } from "./backbutton";
import Header from "./header";
import Image from "next/image";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="sm:w-[400px] px-2 sm:px-0 shadow-lg border-none">
      <CardHeader>
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Proton company logo"
              width="100"
              height="100"
            />
          </div>
          <p>Welcome back!</p>
        </div>
      </CardHeader>
      {/* {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )} */}
      <CardContent>{children}</CardContent>

      <CardFooter>
        <Backbutton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
