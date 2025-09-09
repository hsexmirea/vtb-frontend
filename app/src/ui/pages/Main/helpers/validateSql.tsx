import { keywords } from "./constants"

export interface ValidationResult {
    isValid: boolean
    errors: string[]
    warnings: string[]
}

export const validateSQL = (query: string): ValidationResult => {
    const errors: string[] = []
    const warnings: string[] = []

    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
        return {
            isValid: false,
            errors: ["Запрос не может быть пустым"],
            warnings: [],
        }
    }

    const sqlKeywords = [
        "SELECT",
        "INSERT",
        "UPDATE",
        "DELETE",
        "CREATE",
        "ALTER",
        "DROP",
    ]
    const hasSqlKeywords = sqlKeywords.some((keyword) =>
        trimmedQuery.toUpperCase().includes(keyword)
    )

    if (trimmedQuery.includes(" ") && !hasSqlKeywords) {
        warnings.push("Запрос не содержит основных SQL ключевых слов")
    }

    if (hasSqlKeywords && !trimmedQuery.endsWith(";")) {
        warnings.push("Необходимо завершать запрос точкой с запятой (;)")
    }

    if (hasSqlKeywords && trimmedQuery.length < 10) {
        warnings.push("Запрос слишком короткий для SQL")
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings,
    }
}

export const highlightSQL = (sql: string): React.ReactNode => {
    if (!sql.trim() || sql.trim().length < 3) {
        return sql
    }

    const parts: React.ReactNode[] = []
    let remaining = sql

    keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "gi")
        const match = regex.exec(remaining)

        if (match) {
            if (match.index > 0) {
                parts.push(remaining.substring(0, match.index))
            }

            parts.push(
                <span
                    key={parts.length}
                    style={{ color: "#336791", fontWeight: "bold" }}
                >
                    {match[0]}
                </span>
            )

            remaining = remaining.substring(match.index + match[0].length)
        }
    })

    if (remaining) {
        parts.push(remaining)
    }

    return (
        <div
            style={{
                fontFamily: "monospace",
                fontSize: "13px",
                lineHeight: "1.4",
            }}
        >
            {parts.length > 0 ? parts : sql}
        </div>
    )
}

export const highlightSQLSimple = (sql: string): string => {


    let result = sql

    keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "gi")
        result = result.replace(regex, `**${keyword}**`)
    })

    return result
}
