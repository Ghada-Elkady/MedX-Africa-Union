import { useState } from "react";
import { Link } from "react-router-dom";

const ReportExplainer = () => {
  const [fastingGlucose, setFastingGlucose] = useState(105);
  const [hba1c, setHba1c] = useState(5.8);
  const [hemoglobin, setHemoglobin] = useState(13.8);
  const [totalCholesterol, setTotalCholesterol] = useState(210);

  const getGlucoseStatus = (val) => {
    if (val < 70) return { label: "Low (Hypoglycemia)", color: "text-amber-600 bg-amber-50 border-amber-200" };
    if (val <= 99) return { label: "Normal", color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
    if (val <= 125) return { label: "Slightly Elevated (Pre-diabetes range)", color: "text-amber-600 bg-amber-50 border-amber-200" };
    return { label: "High (Hyperglycemia)", color: "text-red-600 bg-red-50 border-red-200" };
  };

  const getHba1cStatus = (val) => {
    if (val < 5.7) return { label: "Normal", color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
    if (val <= 6.4) return { label: "Pre-diabetes Range", color: "text-amber-600 bg-amber-50 border-amber-200" };
    return { label: "Elevated (Diabetes Range)", color: "text-red-600 bg-red-50 border-red-200" };
  };

  const getCholesterolStatus = (val) => {
    if (val < 200) return { label: "Desirable / Normal", color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
    if (val <= 239) return { label: "Borderline High", color: "text-amber-600 bg-amber-50 border-amber-200" };
    return { label: "High", color: "text-red-600 bg-red-50 border-red-200" };
  };

  return (
    <div className="report-explainer min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-5xl space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl space-y-3">
          <span className="bg-[#19A7CE]/20 text-[#19A7CE] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Patient Educational Tool
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">Medical Report & Lab Explainer</h1>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            Understand your laboratory test metrics with reference range indicators and simplified educational breakdowns.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-800 leading-relaxed">
          <i className="fa-solid fa-triangle-exclamation text-amber-500 text-base mt-0.5"></i>
          <div>
            <strong>Educational Disclaimer:</strong> This explainer tool provides general reference range info for educational awareness. Lab results must always be interpreted by a qualified medical professional alongside your overall clinical history.
          </div>
        </div>

        {/* Input & Range Analysis Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Fasting Blood Glucose */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-base">Fasting Blood Glucose</h3>
              <span className="text-xs text-slate-400 font-semibold">Ref: 70 - 99 mg/dL</span>
            </div>
            <p className="text-xs text-slate-500">Measures concentration of glucose in the blood after an 8-hour fast.</p>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Enter Your Value (mg/dL)</label>
              <input
                type="number"
                value={fastingGlucose}
                onChange={(e) => setFastingGlucose(Number(e.target.value))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-[#19A7CE]"
              />
            </div>

            <div className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between ${getGlucoseStatus(fastingGlucose).color}`}>
              <span>Analysis Status:</span>
              <span>{getGlucoseStatus(fastingGlucose).label}</span>
            </div>
          </div>

          {/* Card 2: HbA1c */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-base">HbA1c (Glycated Hemoglobin)</h3>
              <span className="text-xs text-slate-400 font-semibold">Ref: Below 5.7 %</span>
            </div>
            <p className="text-xs text-slate-500">Reflects your average blood sugar levels over the past 2 to 3 months.</p>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Enter Your Value (%)</label>
              <input
                type="number"
                step="0.1"
                value={hba1c}
                onChange={(e) => setHba1c(Number(e.target.value))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-[#19A7CE]"
              />
            </div>

            <div className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between ${getHba1cStatus(hba1c).color}`}>
              <span>Analysis Status:</span>
              <span>{getHba1cStatus(hba1c).label}</span>
            </div>
          </div>

          {/* Card 3: Total Cholesterol */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-base">Total Serum Cholesterol</h3>
              <span className="text-xs text-slate-400 font-semibold">Ref: Below 200 mg/dL</span>
            </div>
            <p className="text-xs text-slate-500">Total amount of cholesterol in blood, including HDL and LDL components.</p>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Enter Your Value (mg/dL)</label>
              <input
                type="number"
                value={totalCholesterol}
                onChange={(e) => setTotalCholesterol(Number(e.target.value))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-[#19A7CE]"
              />
            </div>

            <div className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between ${getCholesterolStatus(totalCholesterol).color}`}>
              <span>Analysis Status:</span>
              <span>{getCholesterolStatus(totalCholesterol).label}</span>
            </div>
          </div>

          {/* Card 4: Hemoglobin */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-base">Hemoglobin (Hb)</h3>
              <span className="text-xs text-slate-400 font-semibold">Ref: 13.5 - 17.5 g/dL</span>
            </div>
            <p className="text-xs text-slate-500">Iron-containing protein in red blood cells that carries oxygen throughout the body.</p>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Enter Your Value (g/dL)</label>
              <input
                type="number"
                step="0.1"
                value={hemoglobin}
                onChange={(e) => setHemoglobin(Number(e.target.value))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-[#19A7CE]"
              />
            </div>

            <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-between">
              <span>Analysis Status:</span>
              <span>Normal Oxygen-Carrying Capacity</span>
            </div>
          </div>

        </div>

        {/* Action Bottom Bar */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Need a Doctor to Interpret Your Full Report?</h4>
            <p className="text-xs text-slate-500">Share your test values directly with a certified specialist during an online consultation.</p>
          </div>

          <Link to="/doctors">
            <button className="px-6 py-3 bg-[#19A7CE] hover:bg-[#148AA1] text-white font-bold rounded-2xl text-xs shadow-md transition-all whitespace-nowrap">
              Consult a Specialist
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ReportExplainer;
