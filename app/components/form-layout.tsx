import { type PropsWithChildren } from 'react'
import { useNavigate } from 'react-router'
import { Button } from './ui/button'

export interface FormLayoutProps extends PropsWithChildren {
  backUrl?: string
}

export default function FormLayout({ backUrl, children }: FormLayoutProps) {
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex p-5">
        {backUrl ? (
          <Button variant="outline" className="justify-self-start" to={backUrl}>Back</Button>
        ) : (
          <Button variant="outline" className="justify-self-start" onClick={() => navigate(-1)}>Back</Button>
        )}
        <div className="flex flex-auto">
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-[500px]">
          {children}
        </div>
      </div>
    </div>
  )
}