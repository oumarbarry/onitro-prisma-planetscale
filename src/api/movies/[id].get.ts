export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, z.object({ id: z.coerce.number() }).parse)

  const movie = await prisma.movie.findUnique({ where: { id } })

  if (!movie)
    throw createError({ statusCode: 400, statusMessage: "Movie not found." })

  return movie
})
