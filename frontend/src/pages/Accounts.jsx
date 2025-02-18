import { useState } from "react";
import { AppNav } from "../components/AppNav";
import { useQuery } from "@tanstack/react-query";
import { fetchLocalData } from "../api/fetchLocalData";

function Accounts() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: () => fetchLocalData("accounts.json"),
  });
  const accounts = data?.Accounts ?? [];

  return (
    <div>
      <h1>Accounts</h1>
      {accounts && !error && !isLoading ? (
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Status</td>
              <td>Type</td>
              <td>Last Updated</td>
            </tr>
          </thead>
          <tbody>
            {accounts.map(
              ({
                AccountID,
                Name,
                Status,
                Type,
                Description,
                ReportingCodeName,
                UpdatedDateUTC,
              }) => (
                <tr key={AccountID}>
                  <td>{Name}</td>
                  <td>{Status}</td>
                  <td>{Type}</td>
                  <td>{UpdatedDateUTC}</td>
                </tr>
              )
            )}
            {accounts.length === 0 && (
              <tr>
                <td colSpan={5}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <>
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
        </>
      )}
    </div>
  );
}

export default Accounts;
