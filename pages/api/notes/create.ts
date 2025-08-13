import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
const formSchema = z.object({
  title: z.string().min(1, 'required'),
  description: z.string().min(1, 'required'),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method != 'POST') {
    return res.status(405).json({ errorMessage: 'Not Allowed' })
  }
  try {
    const validateData = formSchema.parse(req.body)
    return res
      .status(200)
      .json({ message: 'Form Submitted', data: validateData })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = Object.keys(error.formErrors.fieldErrors)?.reduce(
        (acc, key) => {
          acc[key] = error.formErrors.fieldErrors[key]?.[0] || 'Error'
          return acc
        },
        {} as Record<string, string>,
      )
      return res.status(400).json({ errors })
    }

    return res.status(500).json({ message: 'server error' })
  }
}
