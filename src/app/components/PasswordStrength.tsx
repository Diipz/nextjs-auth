import { cn } from "clsx-tailwind-merge";

interface Props {
    passStrength: number;
}

export default function PasswordStrength({ passStrength }: Props) {
  return (
    <div className="col-span-2 flex gap-2">
        {Array.from({ length: passStrength+1 }).map((i, index) => (
            <div key={index} className={cn("h-2 w-32 rounder-md", {
                "bg-red-500": passStrength === 0,
                "bg-orange-500": passStrength === 1,
                "bg-yellow-500": passStrength === 2,
                "bg-green-500": passStrength === 3,

                })}
            ></div>
        ))}    
    </div>
  )
}
