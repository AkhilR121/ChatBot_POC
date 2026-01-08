import { useEffect, useState } from "react";

type Account = {
  id: string;
  name: string;
};

function Chat() {
  const [customers, setCustomers] = useState<Account[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("/accounts.json");
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        setCustomers(data);
      } catch (err) {
        console.error(err);
        err instanceof Error ? err.message : "Unknown error";
      }
    };

    fetchAccounts();
  }, []);

  function getCustomerList(){
    for (const obj of customers) {
      return customers.length > 0 ? Object.keys(obj) : [];
    }
  }

  return (
    <div className="w-full flex flex-col bg-slate-100">
      <div className="h-full bg-white p-2 m-3 rounded-3xl overflow-y-auto">
        {customers.length > 0 &&
          getCustomerList()?.map((col) => {
            const value = (customers[0] as any)[col];

            const isNestedObject =
              value &&
              typeof value === "object" &&
              !Array.isArray(value);

            if (!isNestedObject) {
              return (
                <table key={col} className="w-full border-collapse mt-4">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1 text-left">{col}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1 text-left">
                        {Array.isArray(value)
                          ? JSON.stringify(value)
                          : String(value ?? "Null")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              );
            }

            const nestedEntries = Object.entries(
              value as Record<string, unknown>
            );

            return (
              <table key={col} className="w-full border-collapse mt-4">
                <thead>
                  <tr>
                    <th colSpan={2} className="border px-2 py-1 text-left">
                      {col}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {nestedEntries.map(([nestedKey, nestedVal]) => (
                    <tr key={nestedKey}>
                      <td className="border px-2 py-1 text-left">
                        {nestedKey}
                      </td>
                      <td className="border px-2 py-1 text-left">
                        {typeof nestedVal === "object" && nestedVal !== null
                          ? JSON.stringify(nestedVal)
                          : String(nestedVal ?? "")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          })}
      </div>
      {/* <input
        type="text"
        className="border border-black rounded-3xl m-2 outline-none p-2 focus:shadow-2xl"
        placeholder="Enter Prompt..."
      /> */}
    </div>
  );
}

export default Chat;
