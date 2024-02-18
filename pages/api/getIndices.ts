import algoliasearch from "algoliasearch";
import type { NextApiRequest, NextApiResponse } from "next";

interface Rule {
  objectID: string;
  description: string;
}

interface Index {
  name: string;
  rules: Rule[];
}

interface SuccessResponseBody {
  indices: Index[];
}

interface ErrorResponseBody {
  message: string;
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponseBody | ErrorResponseBody>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed', error: 'This endpoint requires a POST request' });
    return;
  }

  const { algoliaAppId, algoliaApiKey } = req.body;

  const client = algoliasearch(algoliaAppId, algoliaApiKey);
  let indicesData: Index[] = [];

  try {
    const list = await client.listIndices();
    const indices = list.items;

    const rulesPromises = indices.map(async (index) => {
      const rules = await client.initIndex(index.name).searchRules();
      return { ...index, rules: rules.hits };
    });

    indicesData = await Promise.all(rulesPromises);

    const formattedData: Index[] = indicesData.map((index) => {
      return {
        name: index.name,
        rules: index.rules.map((rule) => {
          return {
            objectID: rule.objectID,
            description: rule.description,
          };
        }),
      };
    });
    res.status(200).json({ indices: formattedData });
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching Algolia indices or rules', error: error.message });
  }
}