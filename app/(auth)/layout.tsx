import { ReactNode } from "react"

const Layout = ({children}: {children: ReactNode}) => {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-200 bg-dotted-pattern bg-cover bg-fixed bg-center">
            {children}
        </div>
    )
}

export default Layout