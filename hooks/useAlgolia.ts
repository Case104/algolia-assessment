import { useState } from 'react';

interface UseAlgoliaReturn {
  appId: string;
  apiKey: string;
  indices: Index[];
  setAppId: React.Dispatch<React.SetStateAction<string>>;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
  loadIndices: () => Promise<void>;
};

interface Index {
    name: string;
    rules: Rule[];
};

interface Rule {
    objectID: string;
    description: string;
};


export function useAlgolia(): UseAlgoliaReturn {
  const [appId, setAppId] = useState(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '');
  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_ALGOLIA_API_KEY || '');
  const [indices, setIndices] = useState<Index[]>([]);

  const loadIndices = async () => {
    try {
      const response = await fetch("/api/getIndices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ algoliaAppId: appId, algoliaApiKey: apiKey }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setIndices(data.indices);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { appId, apiKey, indices, setAppId, setApiKey, loadIndices };
}
