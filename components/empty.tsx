import Image from "next/image"

interface EmptyProps{
    label : string
}

const Empty = ({label}:EmptyProps) => {
  return (
    <>
        <div className="h-full p-7 flex flex-col items-center justify-center">
            <div className="relative h-72 w-96">
                <Image 
                className="rounded-3xl"
                src='/empty.png'
                fill
                alt = "Empty"
                />
            </div>
        </div>
        <p className="text-muted-foreground text-sm text-center">
            {label}
        </p>
    </>
  )
}

export default Empty