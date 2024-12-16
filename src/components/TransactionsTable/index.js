import React, { useState } from "react";
import "./styles.css";
import { Radio, Select, Table } from "antd";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";
import EditEditDeleteModal from "../EditDelete";
import { updateTransactionOnFirebase } from "../../hooks/updateTransaction";
import { deleteTransactionOnFirebase } from "../../hooks/deleteTransactionOnFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { AiOutlineSearch } from "react-icons/ai";

const TransactionsTable = ({
  transactions,
  addTransaction,
  fetchTransactions,
  selectedCurrency
}) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortKey, setSortKey] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [user] = useAuthState(auth);

  
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  let filterTransactionsArray = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLocaleLowerCase()) &&
      item.type.includes(typeFilter)
  );

  let sortedTransactions = filterTransactionsArray.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  // this function for downloading our csv file or exporting a csv file
  const exportCSV = () => {
    // Specifying fields and data explicitly
    var csv = unparse({
      fields: ["name", "type", "tag", "date", "amount"],
      data: transactions,
    });
    var data = new Blob([csv], { type: "text/csv:charsetutf-8;" });
    const csvURL = window.URL.createObjectURL(data);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.download = "transactions.csv";
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  // function for import a csv file
  const importCSV = (event) => {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          // now results.data is an array of objects representing your CSV rows
          for (const transaction of results.data) {
            // Skip this transaction if the 'amount' is not a valid number
            if (isNaN(transaction.amount)) {
              continue;
            }

            const newTransaction = {
              ...transaction,
              // Convert the 'amount' field to a number using parseFloat instead of parseInt
              amount: parseFloat(transaction.amount+`${selectedCurrency}`),
            };
            // Write each transaction to Firebase (addDoc), you can use the addTransaction function here
            await addTransaction(newTransaction, true);
          }
          toast.success("All transactions added");
          fetchTransactions();
          event.target.value = null; // Reset the input field
        },
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setShowEditModal(true);
  };

  const handleEditSave = async (editedTransaction) => {
    // Call the function to update the transaction in Firebase
    await updateTransactionOnFirebase(user.uid, editedTransaction);
    setShowEditModal(false);
    fetchTransactions(); // Fetch the updated data from Firebase
  };

  const handleDeleteSave = async (editedTransaction) => {
    // Call the function to update the transaction in Firebase
    await deleteTransactionOnFirebase(user.uid, editedTransaction);
    setShowEditModal(false);
    fetchTransactions(); // Fetch the updated data from Firebase
  };

  const handleEditCancel = () => {
    setShowEditModal(false);
  };

  return (
    <div class="table-box container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg max-w-[95%]">
  <h2 class="text-2xl font-bold text-center text-gray-700 mb-4">My Transactions</h2>

  <div class="search-and-filter flex flex-wrap items-center gap-4 mb-4">
    <AiOutlineSearch class="text-gray-500 text-lg" />
    <input
      type="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search by name"
      class="flex-grow p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <Select
      onChange={(value) => setTypeFilter(value)}
      value={typeFilter}
      placeholder="Filter"
      allowClear
      class="min-w-[180px] border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <Select.Option value="">All</Select.Option>
      <Select.Option value="income">Income</Select.Option>
      <Select.Option value="expense">Expense</Select.Option>
    </Select>
  </div>

  <div class="import-export-sort flex flex-wrap justify-between items-center mb-4 gap-4">
    <Radio.Group
      class="flex items-center gap-2 text-sm"
      onChange={(e) => setSortKey(e.target.value)}
      value={sortKey}
    >
      <Radio.Button class="p-2 rounded-md border" value="">No Sort</Radio.Button>
      <Radio.Button class="p-2 rounded-md border" value="date">Sort by Date</Radio.Button>
      <Radio.Button class="p-2 rounded-md border" value="amount">Sort by Amount</Radio.Button>
    </Radio.Group>
    <div class="flex gap-4">
      <button class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 text-sm" onClick={exportCSV}>Export CSV</button>
      <label htmlFor="file-csv" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm cursor-pointer">
        Import CSV
      </label>
      <input
        type="file"
        id="file-csv"
        accept=".csv"
        class="hidden"
        onChange={importCSV}
      />
    </div>
  </div>

  <div class="table-container overflow-x-auto rounded-lg">
    <Table
      dataSource={sortedTransactions}
      columns={columns}
      class="w-full text-center border rounded-lg"
      onRow={(record) => ({
        onClick: () => handleEdit(record),
      })}
    />
    {showEditModal && selectedTransaction && (
      <EditEditDeleteModal
        transaction={selectedTransaction}
        onSave={handleEditSave}
        onDelete={handleDeleteSave}
        onCancel={handleEditCancel}
      />
    )}
  </div>
</div>

  );
};

export default TransactionsTable;
