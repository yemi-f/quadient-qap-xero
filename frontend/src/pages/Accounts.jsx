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
              <td>Reporting Code Name</td>
            </tr>
          </thead>
          <tbody>
            {accounts.map(
              ({ AccountID, Name, Status, Type, ReportingCodeName }) => (
                <tr key={AccountID}>
                  <td>{Name}</td>
                  <td>{Status}</td>
                  <td>{Type}</td>
                  <td>{ReportingCodeName}</td>
                </tr>
              )
            )}
            {accounts.length === 0 && (
              <tr>
                <td colSpan={4}>No data available</td>
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
