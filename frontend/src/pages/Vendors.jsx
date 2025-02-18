import { useQuery } from "@tanstack/react-query";
import { fetchLocalData } from "../api/fetchLocalData";

function Vendors() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["vendors"],
    queryFn: () => fetchLocalData("vendors.json"),
  });
  const vendors = data?.Invoices ?? [];

  return (
    <div>
      <h1>Vendors</h1>
      {vendors && !error && !isLoading ? (
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Status</td>
              <td>Amount Due</td>
              <td>Amount Paid</td>
              <td>Amount Credited</td>
              <td>Currency Code</td>
              <td>Due Date</td>
            </tr>
          </thead>
          <tbody>
            {vendors.map(
              ({
                InvoiceID,
                Status,
                AmountDue,
                AmountPaid,
                AmountCredited,
                Contact,
                DueDateString,
                CurrencyCode,
              }) => (
                <tr key={InvoiceID}>
                  <td>{Contact.Name}</td>
                  <td>{Status}</td>
                  <td>{AmountDue}</td>
                  <td>{AmountPaid}</td>
                  <td>{AmountCredited}</td>
                  <td>{CurrencyCode}</td>
                  <td>{DueDateString}</td>
                </tr>
              )
            )}
            {vendors.length === 0 && (
              <tr>
                <td colSpan={7}>No data available</td>
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

export default Vendors;
