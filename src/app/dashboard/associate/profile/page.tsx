import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"



export default async function ProfilePage() {

    //**TODO Design profile page with edit functionality 
    const session = await getServerSession(authOptions);
    const user = session?.user;

    return (

        <div className="grid grid-cols-4 gap-y-4 m-2">
            <p>First Name: </p><p className="col-span-3">{user?.firstName}</p>
            <p>Last Name: </p><p className="col-span-3">{user?.lastName}</p>
            <p>Phone: </p><p className="col-span-3">{user?.phone}</p>
            <p>Email: </p><p className="col-span-3">{user?.email}</p>
        </div>
    )
}
