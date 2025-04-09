'use client'

import theme from "@/resources/assets/styles/Theme";

export default function NotFoundPage(){
    
    return(
        <section className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-2xl" style={{ color: theme.palette.red.main }}>404</p>
                <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl" style={{ color: theme.palette.primary.main}}>
                    Page not found
                </h1>
                <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
            </div>
        </section>
    )
}