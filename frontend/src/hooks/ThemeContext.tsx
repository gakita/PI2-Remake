import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

type Theme = "dark" | "light"

interface ThemeContextValue {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue>({
    theme: "dark",
    setTheme: () => undefined
})

const getInitialTheme = (): Theme => {
    const storedTheme = localStorage.getItem("theme") as Theme | null
    if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme
    }
    return "dark"
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme)

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
        document.documentElement.style.colorScheme = theme
        localStorage.setItem("theme", theme)
    }, [theme])

    const value = useMemo(() => ({ theme, setTheme }), [theme])

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
