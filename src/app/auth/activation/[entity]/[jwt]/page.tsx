import { activateUser } from "@/lib/actions/authActions"

interface Props {
    params: {
        jwt: string,
        entity: string
    }
}

//***TODO design more aesthetically pleasing pages below
export default async function ActivationPage({ params }: Props) {

    const result = await activateUser(params.jwt, params.entity)

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            {
                result === "userNotExist" ? <p className="text-red-500 text-2xl">The user does not exist</p>
                    :
                    result === "alreadyActivated" ? <p className="text-red-500 text-2xl">The user is already activated</p>
                        :
                        result === "success" ? <p className="text-green-500 text-2xl">Success! The user has been activated</p>
                            :
                            result === "linkExpired" ? <p className="text-red-500 text-2xl">The activation link has expired. Please re-register</p>
                                :
                                <p className="text-yellow-500 text-2xl">Oops! Something went wrong</p>
            }
        </div>
    )
}
