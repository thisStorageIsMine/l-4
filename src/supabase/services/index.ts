import { supabase } from ".."

class SupabaseService {

    static async getRow(table: string, columns: string[], eq: [string, string]) {
        const { data, error } = await supabase
            .from(table)
            .select(columns.join(','))
            .eq(eq[0], eq[1])

        return [data, error]
    }

    static async insertRows(table: string, rows: Record<string, unknown>[]) {
        const { data, error } = await supabase
            .from(table)
            .insert(rows)
            .select()

        return [data, error]
    }

    static async updateRows(table: string, eq: [string, string], row: Record<string, unknown>) {
        const { data, error } = await supabase
            .from(table)
            .update(row)
            .eq(eq[0], eq[1])
            .select()

        return [data, error]
    }
}

export { SupabaseService }