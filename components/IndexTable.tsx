type IndexTableProps = {
  children?: React.ReactNode;
  name?: string;
};

export const IndexTable: React.FC<IndexTableProps> = ({ children, name }) => (
  <div className="border-2 rounded w-full my-4 p-2">
    <h2 className="text-xl font-bold">{name}</h2>
    <div className="grid grid-cols-6 gap-2">
      <div>Rule ID</div>
      <div className="col-span-3">Description</div>
      <div className="col-span-2 text-center">Action</div>
      {children}
    </div>
  </div>
);
