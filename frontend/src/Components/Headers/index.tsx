import React, { useContext, useEffect, useState } from "react";
import Callout from "plaid-threads/Callout";
import Button from "plaid-threads/Button";
import InlineLink from "plaid-threads/InlineLink";
import ProductTypesContainer from "../ProductTypes/ProductTypesContainer";

import Link from "../Link";
import Context from "../../Context";

import styles from "./index.module.scss";
import { accountsCategories, Data, ErrorDataItem, transformAccountsData } from "../../dataUtilities";
import Table from "../Table";
import Error from "../Error";
import useAuth from "../../Hooks/useAuth";

const Header = () => {
  const [showTable, setShowTable] = useState(false);
  const [transformedData, setTransformedData] = useState<Data>([]);
  const [error, setError] = useState<ErrorDataItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    linkToken,
    backend,
    linkTokenError,
    isPaymentInitiation,
  } = useContext(Context);
  const { isItemAccess, linkSuccess } = useAuth()

  useEffect(() => {
    const getAccountData = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/accounts`, { method: "GET" });
      const data = await response.json();
      if (data.error != null) {
        setError(data.error);
        setIsLoading(false);
        return;
      }
      setTransformedData(transformAccountsData(data)); // transform data into proper format for each individual product
      setShowTable(true);
      setIsLoading(false);
    };

    if (linkSuccess && isItemAccess) {
      getAccountData()
    }
  }, [linkSuccess, isItemAccess])

  return (
    <div className={styles.grid}>
      <h3 className={styles.title}>Plaid Application</h3>

      {!linkSuccess ? (
        <>
          <h4 className={styles.subtitle}>
            An application to end-to-end integration with Plaid
          </h4>
          <p className={styles.introPar}>
            The Plaid flow begins when your user wants to connect their bank
            account to your app. Please countinue this by clicking the button below to
            Connect Link - it that your users will
            interact with in order to link their accounts to Plaid and allow you
            to access their accounts via the Plaid API.
          </p>
          {/* message if backend is not running and there is no link token */}
          {!backend ? (
            <Callout warning>
              Unable to fetch link_token: please make sure your backend server
              is running and that your .env file has been configured with your
              <code>PLAID_CLIENT_ID</code> and <code>PLAID_SECRET</code>.
            </Callout>
          ) : /* message if backend is running and there is no link token */
            linkToken == null && backend ? (
              <Callout warning>
                <div>
                  Unable to fetch link_token: please make sure your backend server
                  is running and that your .env file has been configured
                  correctly.
                </div>
                <div>
                  If you are on a Windows machine, please ensure that you have
                  cloned the repo with{" "}
                  <InlineLink
                    href="https://github.com/plaid/quickstart#special-instructions-for-windows"
                    target="_blank"
                  >
                    symlinks turned on.
                  </InlineLink>{" "}
                  You can also try checking your{" "}
                  <InlineLink
                    href="https://dashboard.plaid.com/activity/logs"
                    target="_blank"
                  >
                    activity log
                  </InlineLink>{" "}
                  on your Plaid dashboard.
                </div>
                <div>
                  Error Code: <code>{linkTokenError.error_code}</code>
                </div>
                <div>
                  Error Type: <code>{linkTokenError.error_type}</code>{" "}
                </div>
                <div>Error Message: {linkTokenError.error_message}</div>
              </Callout>
            ) : linkToken === "" ? (
              <div className={styles.linkButton}>
                <Button large disabled>
                  Loading...
                </Button>
              </div>
            ) : (
              <div className={styles.linkButton}>
                <Link />
              </div>
            )}
        </>
      ) : (
        <>
          {isPaymentInitiation ? (
            <>
              <h4 className={styles.subtitle}>
                Congrats! Your payment is now confirmed.
                <p />
                <Callout>
                  You can see information of all your payments in the{' '}
                  <InlineLink
                    href="https://dashboard.plaid.com/activity/payments"
                    target="_blank"
                  >
                    Payments Dashboard
                  </InlineLink>
                  .
                </Callout>
              </h4>
              <p className={styles.requests}>
                Now that the 'payment_id' stored in your server, you can use it to access the payment information:
              </p>
            </>
          ) : /* If not using the payment_initiation product, show the item_id and access_token information */ (
            <>
              {isItemAccess ? (
                <>
                  <h4 className={styles.subtitle}>
                    Congrats! By linking an account, you have created an Item.
                  </h4>
                  <ProductTypesContainer productType="Account Detail">
                    {isLoading && (
                      <div className="py-4">Loading...</div>
                    )}
                    {showTable && (
                      <Table
                        categories={accountsCategories}
                        data={transformedData}
                        isIdentity={false}
                      />
                    )}
                    {error != null && <Error error={error} />}
                  </ProductTypesContainer>
                </>
              ) : (
                <h4 className={styles.subtitle}>
                  <Callout warning>
                    Unable to create an item. Please check your server
                  </Callout>
                </h4>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

Header.displayName = "Header";

export default Header;
