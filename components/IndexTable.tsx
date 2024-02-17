type IndexTableProps = {
    children?: React.ReactNode;
    name?: string;
  };
  
  export const IndexTable: React.FC<IndexTableProps> = ({children, name}) => (
    <div className="w-full">
      <h2 className="text-2xl font-bold">Indices</h2>
      <div className="border-2 rounded w-full my-4 p-2">
        <h2 className="text-xl font-bold">{name}</h2>
        <div className="grid grid-cols-6 gap-2">
          <div>Rule ID</div>
          <div className="col-span-4">Description</div>
          <div>Action</div>
          {children}
        </div>
      </div>
    </div>
  );