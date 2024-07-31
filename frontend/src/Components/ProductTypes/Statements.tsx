import { useEffect, useState } from "react";
import {
  statementsCategories,
  Data,
  ErrorDataItem,
  transformStatementsData
} from "../../dataUtilities";
import Table from "../Table";
import Error from "../Error";
import useAuth from "../../Hooks/useAuth";
import { Button } from "plaid-threads";

const Statements = () => {
  const {
    linkSuccess,
    isItemAccess,
  } = useAuth();

  const [showTable, setShowTable] = useState(false);
  const [transformedData, setTransformedData] = useState<Data>([]);
  const [error, setError] = useState<ErrorDataItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pdf, setPdf] = useState<string | null>(null);

  const fileName = `Statement_${new Date().getTime()}.pdf`

  useEffect(() => {
    const getTransactionData = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/statements`, { method: "GET" });
      const data = await response.json();
      if (data.error != null) {
        setError(data.error);
        setIsLoading(false);
        return;
      }
      setTransformedData(transformStatementsData(data));
      if (data.pdf != null) {
        setPdf(data.pdf);
      }
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
        <>
          <div className="w-100 d-flex justify-content-end py-3">
            {pdf != null && (
              <Button
                small
                centered
                href={`data:application/pdf;base64,${pdf}`}
                componentProps={{ download: fileName}}
              >
                Download PDF
              </Button>
            )}
          </div>
          <Table
            categories={statementsCategories}
            data={transformedData}
            isIdentity={false}
          />
        </>
      )}
      {error != null && <Error error={error} />}
    </>
  );
};

Statements.displayName = "Statements";

export default Statements;
