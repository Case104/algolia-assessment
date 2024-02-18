import { useAlgolia } from "@/hooks/useAlgolia";
import { LabeledInput } from "@/components/LabeledInput";
import Link from "next/link";
import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  SearchBox,
} from "react-instantsearch";

const future = { preserveSharedStateOnUnmount: true };

export default function Lorcana() {
  const { setApiKey, setAppId, loadCards, client, appId, apiKey } =
    useAlgolia();

  return (
    <main className="flex h-screen w-full justify-center">
      <div className="flex flex-col items-center w-9/10">
        <h1 className="text-4xl font-bold mt-4">Algolia Assessment</h1>
        <p className="text-xl">Just for Fun</p>
        <div>
          <Link href="/">
            <button className="bg-red-500 font-bold rounded-full py-2 px-4 my-4 mx-2">
              Assessment
            </button>
          </Link>
          <button
            className="bg-purple-500 font-bold rounded-full py-2 px-4 my-4 mx-2"
            onClick={loadCards}
          >
            Load Cards
          </button>
        </div>
        <div className="w-full max-w-xs mb-5">
          <LabeledInput
            id="algoliaAppId"
            label="Algolia App ID"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
          />
          <LabeledInput
            id="algoliaApiKey"
            label="Algolia API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
        <div className="w-full">
          <InstantSearch
            searchClient={client}
            indexName="cards"
            future={future}
          >
            <Configure hitsPerPage={6} />
            <div className="flex">
              <div className="flex-1"></div>
              <div className="flex-3">
                <SearchBox placeholder="" className="mb-2 text-black" />
                <Hits hitComponent={Hit} />
                <div className="mx-auto my-8 text-center">
                  <Pagination />
                </div>
              </div>
            </div>
          </InstantSearch>
        </div>
      </div>
    </main>
  );
}

function Hit({ hit }: any) {
  return (
    <article>
      <img src={hit.image} alt={hit.name} />
      <div>
        <h1>
          <Highlight attribute="name" hit={hit} />
        </h1>
        <p>
          <Highlight attribute="title" hit={hit} />
        </p>
      </div>
    </article>
  );
}
