import { getRole } from "@/actions/user";
import Sidebar from "@/components/layout/Sidebar";
import Topnav from "@/components/layout/Topnav";
import { currentUser } from "@clerk/nextjs";

import { ReactNode } from "react";

export default async function layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const user = await currentUser();
  const role = (await getRole()) as string;

  return (
    <div className="">
       <Sidebar role={role} userId={user?.id as string} />
      {/* <Topnav /> */} 
      {/* <div className="pt-20 lg:ml-80 lg:pl-5 pl-10 pr-10">{children}</div>
       */}
       {/* <DashboardPage /> */}
       
        <main id="main" className="mx-auto max-w-7xl px-4 pb-20 sm:px-10">{children}</main>
    </div>
  );
}
