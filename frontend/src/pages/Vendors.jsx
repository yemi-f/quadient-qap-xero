import { useState } from "react";
import { AppNav } from "../components/AppNav";
import { useQuery } from "@tanstack/react-query";
import { fetchLocalData } from "../api/fetchLocalData";

function Vendors() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["vendors"],
    queryFn: () => fetchLocalData("vendors.json"),
  });

  // if (isLoading) return <p>Loading...</p>
  // if (error) return <p>Error: {error.message}</p>
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
              <td>Due Date</td>
              <td>Currency Code</td>
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
                Date,
                DueDate,
                CurrencyCode,
              }) => (
                <tr key={InvoiceID}>
                  <td>{Contact.Name}</td>
                  <td>{Status}</td>
                  <td>{DueDate}</td>
                  <td>{CurrencyCode}</td>
                </tr>
              )
            )}
            {vendors.length === 0 && (
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

export default Vendors;
