import { useEffect, useState } from 'react';

type Account = {
  id: string;
  name: string;
};

function Chat() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/accounts.json');
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        console.log('GET /accounts.json response:', data);
        setAccounts(data);
      } catch (err) {
        console.error(err);
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(`Failed to load accounts: ${message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div className="w-full flex flex-col bg-slate-100">
      <div className="h-full bg-white p-2 m-3 rounded-3xl">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1 text-left">Name</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td className="border px-2 py-1 text-center">Loading...</td>
              </tr>
            )}
            {error && !loading && (
              <tr>
                <td className="border px-2 py-1 text-center text-red-500">{error}</td>
              </tr>
            )}
            {!loading &&
              !error &&
              accounts.map((account) => (
                <tr key={account.id}>
                  <td className="border px-2 py-1">{account.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <input
        type="text"
        className="border border-black rounded-3xl m-2 outline-none p-2 focus:shadow-2xl"
        placeholder="Enter Prompt..."
      />
    </div>
  );
}

export default Chat;