export async function getProducts(
  search: string,
  offset: number,
  status: string = 'all'
): Promise<{
  products: Product[];
  newOffset: number | null;
  totalProducts: number;
}> {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  let query = supabase
    .from('products')
    .select('*', { count: 'exact' })

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  if (status !== 'all') {
    query = query.eq('status', status)
  }

  const { data: products, count } = await query
    .range(offset, offset + 4)
    .order('created_at', { ascending: false })

  return {
    products: products || [],
    newOffset: products && products.length === 5 ? offset + 5 : null,
    totalProducts: count || 0
  }
}