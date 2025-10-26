export const csr = true

export const load = async ({ params }) => {
    const { slug } = params
    return { slug }
}
