import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ReactNode } from "react";

export default function RootLayout({ children }: {children: ReactNode }) {
    return (
    <div className="flex h-screen flex-col">
        <Header />
        <main className="flex-1">
            {children}
        </main>
        <Footer />
    </div>
    )
}