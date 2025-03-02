import { Spinner } from "@heroui/react"

export default function LoadingScreen() {
  return (
    <div className='flex justify-center items-center min-h-[300px] h-[500px]'>
      <div className='w-[200px] h-[200px]'>
        <Spinner className="w-20 h-20" />
      </div>
    </div>
  );
}