import { defineField, defineType } from 'sanity'
import { RiPagesLine } from "react-icons/ri";

export const serviceType = defineType({
    name: 'service',
    title: 'Service Types',
    type: 'document',
    icon: RiPagesLine,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Service Category',
            type: 'reference',
            to: [{ type: 'serviceCategory' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: (doc: Record<string, unknown>) => {
                    const category = doc.category as { _ref?: string } | undefined
                    const ref = category?._ref ?? ''
                    const title = (doc.title as string) ?? ''
                    return `__ref:${ref}__${title}`
                },
                slugify: async (
                    input: string,
                    _schemaType: unknown,
                    context: { getClient: (opts: { apiVersion: string }) => { fetch: (query: string, params: Record<string, string>) => Promise<unknown> } }
                ) => {
                    const match = input.match(/^__ref:(.+?)__([\s\S]*)$/)
                    const slugifyTitle = (t: string) =>
                        t
                            .toLowerCase()
                            .replace(/\s+/g, '-')
                            .replace(/[^a-z0-9-]/g, '')
                            .slice(0, 96)
                    if (!match) return '/' + slugifyTitle(input)
                    const [, ref, title] = match
                    const slugifiedTitle = slugifyTitle(title)
                    if (!ref) return `/${slugifiedTitle}`
                    const client = context.getClient({ apiVersion: '2024-01-01' })
                    const categorySlug = await client.fetch(
                        `*[_id == $ref][0].slug.current`,
                        { ref }
                    ) as string | null
                    return `/${categorySlug ?? 'uncategorized'}/${slugifiedTitle}`
                },
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'titleHero',
            title: 'Hero Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'imagePrimary',
            title: 'Primary Image',
            type: 'image',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'imageSecond',
            title: 'Second Image',
            type: 'image',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'titlePrimary',
            title: 'Primary Section Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'descriptionPrimary',
            title: 'Primary Section Description',
            type: 'array',
            of: [{ type: 'block' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'bookNowText',
            title: 'Book Now Text',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'bookNowSubtext',
            title: 'Book Now Subtext',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'titleSecond',
            title: 'Second Section Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'descriptionSecond',
            title: 'Second Section Description',
            type: 'array',
            of: [{ type: 'block' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'titleThird',
            title: 'Third Section Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'descriptionThird',
            title: 'Third Section Description',
            type: 'array',
            of: [{ type: 'block' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'thirdItems',
            title: 'Third Section Items',
            type: 'array',
            of: [{type: 'reference', to: [{type: 'serviceItem'}]}]
        }),
        defineField({
            name: 'faqItems',
            title: 'FAQ Section Items',
            type: 'array',
            of: [{type: 'reference', to: [{type: 'serviceItem'}]}]
        }),

    ],
});