// ./src/components/Layout.js

import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import { Suspense } from "react"

export default function Layout() {
    return (
        <>
            <Header />
            <main>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </>
    )
}