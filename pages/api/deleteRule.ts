import algoliasearch from "algoliasearch";
import type { NextApiRequest, NextApiResponse } from "next";

interface RequestBody {
    algoliaAppId: string;
    algoliaApiKey: string;
    index: string;
    objectID: string;
}

interface SuccessResponseBody {
    message: string;
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
  
    const { algoliaAppId, algoliaApiKey, index, objectID } = req.body;

    const client = algoliasearch(algoliaAppId, algoliaApiKey);
    const indexClient = client.initIndex(index);

  try {
    await indexClient.deleteRule(objectID);
    res.status(200).json({ message: `Rule ${objectID} deleted from ${index}}`});
  } catch (error) {
    res.status(500).json({ message: 'Error copying rule', error: error.message });
  }
}
