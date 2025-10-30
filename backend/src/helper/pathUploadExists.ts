import fs from "fs"
import path from "path"

export function ensureUploadDir(uploadDir: string, defaultImageSource: string): void {
    try {
        // Cria o diretório se não existir
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true })
            console.log(`Diretório criado: ${uploadDir}`)
        }

        // Copia a imagem padrão se não existir
        const defaultImagePath = path.join(uploadDir, "default-avatar.svg")
        if (!fs.existsSync(defaultImagePath) && fs.existsSync(defaultImageSource)) {
            fs.copyFileSync(defaultImageSource, defaultImagePath)
            console.log(`Imagem padrão restaurada`)
        }
    } catch (error) {
        console.error("Erro ao configurar upload:", error)
    }
}