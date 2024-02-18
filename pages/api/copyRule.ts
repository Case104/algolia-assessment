import algoliasearch from "algoliasearch";
import type { NextApiRequest, NextApiResponse } from "next";

interface RequestBody {
    algoliaAppId: string;
    algoliaApiKey: string;
    sourceIndex: string;
    targetIndex: string;
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
  
    const { algoliaAppId, algoliaApiKey, sourceIndex, targetIndex, objectID } = req.body;
    console.log(req.body);
    const client = algoliasearch(algoliaAppId, algoliaApiKey);
    const sourceIndexClient = client.initIndex(sourceIndex);
    const targetIndexClient = client.initIndex(targetIndex);

  try {
    const rule = await sourceIndexClient.getRule(objectID);
    await targetIndexClient.saveRule(rule);
    res.status(200).json({ message: `Rule copied from ${sourceIndex} to ${targetIndex}`});
  } catch (error) {
    res.status(500).json({ message: 'Error copying rule', error: error.message });
  }
}