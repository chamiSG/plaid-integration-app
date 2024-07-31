import { useEffect, useState } from "react";
import {
  transactionsCategories,
  transformTransactionsData,
  Data,
  ErrorDataItem
} from "../../dataUtilities";
import Table from "../Table";
import Error from "../Error";
import useAuth from "../../Hooks/useAuth";

const Transactions = () => {
  const {
    linkSuccess,
    isItemAccess,
  } = useAuth();

  const [showTable, setShowTable] = useState(false);
  const [transformedData, setTransformedData] = useState<Data>([]);
  const [error, setError] = useState<ErrorDataItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTransactionData = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/transactions`, { method: "GET" });
      const data = await response.json();
      if (data.error != null) {
        setError(data.error);
        setIsLoading(false);
        return;
      }
      setTransformedData(transformTransactionsData(data));
      setShowTable(true);
      setIsLoading(false);
    };

    if (linkSuccess && isItemAccess) {
      getTransactionData()
    }
  }, [linkSuccess, isItemAccess])


  return (
    <>
      {isLoading && (
        <div className="w-100 d-flex justify-content-center py-3">Loading...</div>
      )}
      {showTable && (
        <Table
          categories={transactionsCategories}
          data={transformedData}
          isIdentity={false}
        />
      )}
      {error != null && <Error error={error} />}
    </>
  );
};

Transactions.displayName = "Transactions";

export default Transactions;
