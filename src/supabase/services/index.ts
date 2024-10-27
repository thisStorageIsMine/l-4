import { supabase } from "..";
import { Database } from "../types";
import { PostgrestError } from "@supabase/supabase-js";

type TTables = keyof Database["public"]["Tables"];
type keys = keyof Database["public"]["Tables"];

class SupabaseService {
  static async getRow<T extends keys>(
    table: TTables,
    columns: string[],
    eq: [string, string][],
  ): Promise<
    [Database["public"]["Tables"][T]["Row"][] | null, null | PostgrestError]
  > {
    let query = supabase.from(table).select(columns.join(","));

    for (const [key, value] of eq) {
      query = query.eq(key, value);
    }

    const { data, error } = await query.select();
    return [data, error];
  }

  static async insertRows<T extends TTables>(
    table: T,
    rows: Array<Database["public"]["Tables"][T]["Insert"]>,
  ) {
    const { data, error } = await supabase
      .from(table as keyof Database["public"]["Tables"])
      .insert(rows)
      .select();

    return [data, error];
  }

  static async updateRows<T extends TTables>(
    table: T,
    eq: [string, string],
    row: Database["public"]["Tables"][T]["Update"],
  ) {
    const { data, error } = await supabase
      .from(table as keyof Database["public"]["Tables"])
      .update(row)
      .eq(eq[0], eq[1])
      .select();

    return [data, error];
  }
}

export { SupabaseService };
