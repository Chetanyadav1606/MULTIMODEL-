"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
type Mode = "fast" | "deep";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const idea = searchParams.get("idea") || "";
  const mode = (searchParams.get("mode") as Mode) || "fast";

  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchReport = useCallback(
    async (currentIdea: string, currentMode: Mode) => {
      if (!currentIdea) return;
      setLoading(true);
      setError(null);

      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch(`${API_BASE}/validate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idea: currentIdea, mode: currentMode }),
          signal: controller.signal,
        });
        const data = await res.json();
        if (!res.ok || data?.error) throw new Error(data?.error || `Validate failed: ${res.status}`);
        setReport(data.report);
      } catch (e: any) {
        if (e.name !== "AbortError") setError(e?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchReport(idea, mode);
    return () => abortRef.current?.abort();
  }, [idea, mode, fetchReport]);

  const mrr: number[] = useMemo(() => {
    const dyn = report?.traction?.monthly_mrr; // preferred dynamic series
    const legacy = report?.traction?.MRR;      // legacy mock series
    return Array.isArray(dyn) ? dyn : Array.isArray(legacy) ? legacy : [];
  }, [report]);

  const chartData = useMemo(
    () => ({
      labels: mrr.map((_, i) => `Month ${i + 1}`),
      datasets: [
        {
          label: "MRR Growth ($k)",
          data: mrr,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
          tension: 0.3,
        },
      ],
    }),
    [mrr]
  );

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: { display: true, labels: { color: "#fff" } },
        title: { display: true, text: "Monthly Recurring Revenue Growth", color: "#fff" },
      },
      scales: {
        x: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
        y: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
      },
    }),
    []
  );

  const downloadReport = async () => {
    try {
      const res = await fetch(`${API_BASE}/generate_report`);
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        const j = await res.json();
        throw new Error(j?.error || "Report generation failed");
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Startup_Validation_Report.docx";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (e: any) {
      alert(e?.message || "Failed to download report");
    }
  };

  const rerun = (newMode: Mode) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("mode", newMode);
    router.replace(`/result?${params.toString()}`);
  };

  if (!idea) return <p className="text-center p-10 text-red-400">❌ No idea provided.</p>;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-10">
        <h1 className="text-3xl font-bold mb-6">🚀 Validation Report</h1>
        <p className="mb-4">Idea: <strong>{idea}</strong></p>
        <div className="bg-red-900/40 border border-red-600 text-red-200 p-4 rounded-lg mb-6">{error}</div>
        <div className="flex gap-3">
          <button onClick={() => fetchReport(idea, mode)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Retry</button>
          <button onClick={() => rerun("fast")} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">Run Fast</button>
          <button onClick={() => rerun("deep")} className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg">Deep Research</button>
        </div>
      </div>
    );
  }

  if (loading) return <p className="text-center p-10 text-blue-400">⏳ {mode === "deep" ? "Running deep research…" : "Analyzing your idea…"} </p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-3xl font-bold">🚀 Validation Report</h1>
        <span
          className={`text-xs px-2 py-1 rounded-full border ${
            mode === "deep" ? "bg-purple-700/30 border-purple-500 text-purple-200" : "bg-gray-700/40 border-gray-500 text-gray-200"
          }`}
          title="Analysis mode"
        >
          {mode.toUpperCase()}
        </span>
      </div>

      <p className="mb-6 text-lg"><strong>Idea:</strong> {idea}</p>

      {/* Quick re-run controls */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => rerun("fast")}
          className={`px-4 py-2 rounded-lg border ${mode === "fast" ? "bg-cyan-600 border-cyan-400" : "bg-gray-800 hover:bg-gray-700 border-gray-600"}`}
        >
          Run Fast
        </button>
        <button
          onClick={() => rerun("deep")}
          className={`px-4 py-2 rounded-lg border ${mode === "deep" ? "bg-purple-600 border-purple-400" : "bg-gray-800 hover:bg-gray-700 border-gray-600"}`}
          title="Runs a more thorough analysis"
        >
          Deep Research
        </button>
      </div>

      {/* Problem & Solution */}
      <div className="bg-gray-800 p-6 rounded-xl shadow mb-4">
        <h2 className="text-xl font-semibold mb-2">Problem</h2>
        <p className="text-gray-300">{report?.problem}</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-xl shadow mb-4">
        <h2 className="text-xl font-semibold mb-2">Solution</h2>
        <p className="text-gray-300">{report?.solution}</p>
      </div>

      {/* Trends & Risks */}
      <div className="bg-gray-800 p-6 rounded-xl shadow mb-4">
        <h2 className="text-xl font-semibold mb-2">Trends</h2>
        <ul className="list-disc list-inside text-gray-300">
          {report?.trends?.map((t: string, i: number) => <li key={i}>{t}</li>)}
        </ul>
      </div>
      <div className="bg-gray-800 p-6 rounded-xl shadow mb-4">
        <h2 className="text-xl font-semibold mb-2">Risks</h2>
        <ul className="list-disc list-inside text-gray-300">
          {report?.risks?.map((r: string, i: number) => <li key={i}>{r}</li>)}
        </ul>
      </div>

      {/* Deep-mode: rich agent paragraphs */}
      {mode === "deep" && report?.sections && (
  <div className="bg-gray-800 p-6 rounded-xl shadow mb-6">
    <h2 className="text-xl font-semibold mb-4">🔍 Deep Research Details</h2>
    {report.sections.market && (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Market Researcher</h3>
        <pre className="whitespace-pre-wrap text-gray-300">{report.sections.market}</pre>
      </div>
    )}
    {report.sections.competitors && (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Competitor Analyst</h3>
        <pre className="whitespace-pre-wrap text-gray-300">{report.sections.competitors}</pre>
      </div>
    )}
    {report.sections.financials && (
      <div className="mb-2">
        <h3 className="text-lg font-semibold mb-2">Financial Modeler</h3>
        <pre className="whitespace-pre-wrap text-gray-300">{report.sections.financials}</pre>
      </div>
    )}
  </div>
)}

      {/* Traction Chart */}
      <div className="bg-gray-800 p-6 rounded-xl shadow mb-4">
        <h2 className="text-xl font-semibold mb-4">Traction (MRR Growth)</h2>
        {mrr.length > 0 ? <Line data={chartData} options={chartOptions} /> : <p className="text-gray-400">No MRR data returned for this idea.</p>}
      </div>

      {/* Market Size */}
      <div className="bg-gray-800 p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Market Size</h2>
        <ul className="list-disc list-inside text-gray-300">
          <li>TAM: ${report?.market?.TAM}B</li>
          <li>SAM: ${report?.market?.SAM}B</li>
          <li>SOM: ${report?.market?.SOM}B</li>
        </ul>
      </div>

      {/* Optional narrative */}
      {report?.report_text && (
        <div className="bg-gray-800 p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">Narrative</h2>
          <pre className="whitespace-pre-wrap text-gray-300">{report.report_text}</pre>
        </div>
      )}

      <button onClick={downloadReport} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
        📥 Download Pitch Deck Report
      </button>
    </div>
  );
}
