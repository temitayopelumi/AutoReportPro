"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";



export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [url, setUrl] = useState(""); // State to store URL input


  // Ensures the component is mounted on the client before fetching data
  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`/api/fetchData?url=${encodeURIComponent(url)}`);
      setData(response.data);

      console.log(response.data["Recommended Charts"])
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };



  if (!isClient) return null; // Prevent SSR mismatch

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6">AutoReportPro</h1>

      <form onSubmit={fetchData} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="url" className="block text-lg font-medium text-gray-700">
            Enter URL:
          </label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-200"
          disabled={loading}
        >
          {loading ? "Processing..." : "Analyse Data"}
        </button>
      </form>

      {data && (
        <div className="mt-10 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Summary</h2>
          <p className="text-gray-700">{JSON.stringify(data["Summary"])}</p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Additional Insights</h2>
          <p className="text-gray-700">{JSON.stringify(data["Additional Insights"])}</p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Recommended Charts</h2>
          <p className="text-gray-700">{JSON.stringify(data["Recommended Charts"])}</p>

        </div>
      )
      }
    </div >
  );
}
