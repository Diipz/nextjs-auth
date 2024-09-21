import { BellAlertIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { UserType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";




export default async function DashboardNavbar({ userType, firstName, lastName }: { userType: UserType, firstName: string, lastName: string }) {

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect(`/auth/signin/${userType}`);
  }

  const email = session?.user.email;

  const associate = await prisma.associate.findUnique({
    where: { email },
  });

  const notificationsCount = await prisma.notification.count({
    where: {
      associateId: associate?.id,
      read: false,
    },
  });


  return (
    <div className="flex items-center justify-end p-4">
      {userType === "associate" &&
        <Link href={"/dashboard/associate/notifications"} className="cursor-pointer mr-4 relative">
          <BellAlertIcon className="h-8 w-8" />
          {notificationsCount > 0 && (
            <div className="flex item-center justify-center absolute rounded-full text-xs -top-2 -right-1 w-4 h-4 bg-[#5D2CA8]">
              {notificationsCount}
            </div>
          )}
        </Link>
      }
      <div className="flex flex-col items-center mr-4">
        <span className="text-s font-medium">{firstName}</span>
        <span className="text-s font-medium">{lastName}</span>
      </div>
      {userType === "client" ? (
        <Link href={"/dashboard/client/organisation"} className="cursor-pointer">
          <UserCircleIcon className="h-8 w-8" />
        </Link>
      ) : (
        <Link href={"/dashboard/associate/profile"} className="cursor-pointer">
          <UserCircleIcon className="h-8 w-8" />
        </Link>
      )}
    </div>
  )
}