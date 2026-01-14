// src/pages/Graduation.js
import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { GraduationCap, TrendingUp, Award, Calendar } from "lucide-react";
import { 
  StatsCard, 
  ChartContainer, 
  DataTable,
  LoadingSpinner, 
  EmptyState 
} from "../components/shared";
import { COLORS, CHART_CONFIG } from "../config/constants";

const Graduation = ({ data, isLoading, error }) => {
  // Mock graduation data - replace with actual data from your backend
  const graduationTrends = useMemo(() => [
    { year: "2019", graduates: 3200, rate: 89, onTime: 2848, delayed: 352 },
    { year: "2020", graduates: 3450, rate: 90, onTime: 3105, delayed: 345 },
    { year: "2021", graduates: 3680, rate: 91, onTime: 3349, delayed: 331 },
    { year: "2022", graduates: 3850, rate: 92, onTime: 3542, delayed: 308 },
    { year: "2023", graduates: 4100, rate: 92, onTime: 3772, delayed: 328 },
    { year: "2024", graduates: 4350, rate: 93, onTime: 4046, delayed: 304 }
  ], []);

  const collegeGraduation = useMemo(() => [
    { college: "COE", graduates: 850, rate: 94 },
    { college: "CAS", graduates: 720, rate: 91 },
    { college: "CBA", graduates: 680, rate: 89 },
    { college: "CAFNR", graduates: 520, rate: 90 },
    { college: "COED", graduates: 490, rate: 92 },
    { college: "CON", graduates: 380, rate: 95 }
  ], []);

  const graduationByProgram = useMemo(() => [
    { program: "BSCS", graduates: 245, rate: 95 },
    { program: "BSIT", graduates: 230, rate: 93 },
    { program: "BSE", graduates: 185, rate: 91 },
    { program: "BSBA", graduates: 210, rate: 89 },
    { program: "BSA", graduates: 175, rate: 90 },
    { program: "BSN", graduates: 195, rate: 96 },
    { program: "AB Comm", graduates: 140, rate: 88 },
    { program: "BSED", graduates: 155, rate: 92 }
  ], []);

  const employmentData = useMemo(() => [
    { category: "Employed", count: 3200, percentage: 74 },
    { category: "Graduate School", count: 680, percentage: 16 },
    { category: "Self-Employed", count: 260, percentage: 6 },
    { category: "Job Seeking", count: 210, percentage: 4 }
  ], []);

  const stats = useMemo(() => ({
    totalGraduates: 4350,
    graduationRate: 93,
    onTimeGraduation: 93,
    employmentRate: 96
  }), []);

  // Table columns
  const tableColumns = [
    { 
      header: "Program", 
      key: "program",
      render: (row) => <span className="text-gray-900 font-medium">{row.program}</span>
    },
    { 
      header: "Graduates", 
      key: "graduates",
      className: "text-right",
      render: (row) => <span className="text-gray-900">{row.graduates}</span>
    },
    { 
      header: "Graduation Rate", 
      key: "rate",
      className: "text-right",
      render: (row) => (
        <span className={`font-semibold ${row.rate >= 90 ? 'text-green-600' : 'text-yellow-600'}`}>
          {row.rate}%
        </span>
      )
    },
    { 
      header: "Status", 
      key: "status",
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.rate >= 92 ? 'bg-green-100 text-green-800' : 
          row.rate >= 85 ? 'bg-yellow-100 text-yellow-800' : 
          'bg-red-100 text-red-800'
        }`}>
          {row.rate >= 92 ? 'Excellent' : row.rate >= 85 ? 'Good' : 'Needs Improvement'}
        </span>
      )
    }
  ];

  if (isLoading) {
    return <LoadingSpinner size="large" text="Loading graduation data..." />;
  }

  if (error) {
    return (
      <EmptyState
        icon={GraduationCap}
        title="Failed to Load Graduation Data"
        description="There was an error loading the graduation statistics."
      />
    );
  }

// import React from "react";

// const Graduation = () => {
//   return (
//     <div className="text-gray-800 text-2xl font-semibold">
//       Graduation Content Placeholder
//     </div>
//   );
// };

// export default Graduation;

import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { Users, GraduationCap, Download, TrendingUp } from "lucide-react";
import { 
  StatsCard, 
  ChartContainer, 
  DataTable, 
  LoadingSpinner, 
  EmptyState,
  ErrorAlert 
} from "../components/shared";
import { COLORS, CHART_CONFIG } from "../config/constants";

const Graduation = ({ data, isLoading, error }) => {
  const semOrder = ["1st", "2nd", "Mid"];

  // Filter states
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState("All");
  const [selectedSem, setSelectedSem] = useState("All");

  // Set default latest year
  useMemo(() => {
    if (data && data.length > 0 && selectedYear === null) {
      const latestYear = data.reduce(
        (max, row) => (row.year > max ? row.year : max),
        data[0].year
      );
      setSelectedYear(latestYear);
    }
  }, [data, selectedYear]);

  // Filter options
  const filterOptions = useMemo(() => {
    if (!data || data.length === 0)
      return { years: ["all"], colleges: ["All"], semesters: ["All"] };

    const years = [...new Set(data.map((d) => d.year))].sort((a, b) => b - a);
    const colleges = ["All", ...new Set(data.map((d) => d.college))];

    let semesters = [];
    if (selectedYear && selectedYear !== "all") {
      const semestersSet = new Set(
        data
          .filter((d) => d.year === selectedYear)
          .map((d) => d.sem)
          .filter(Boolean)
      );
      semesters = ["All", ...semOrder.filter((s) => semestersSet.has(s))];
    } else {
      semesters = ["All", ...semOrder];
    }

    return { years: ["all", ...years], colleges, semesters };
  }, [data, selectedYear]);

  // Set default latest semester
  useMemo(() => {
    if (!data || data.length === 0) return;
    const yearData = selectedYear
      ? data.filter((d) => d.year === selectedYear)
      : data;
    if (yearData.length === 0) return;

    const latestSem = yearData
      .map((d) => d.sem)
      .filter(Boolean)
      .sort((a, b) => semOrder.indexOf(b) - semOrder.indexOf(a))[0];

    if (selectedSem !== latestSem) {
      setSelectedSem(latestSem);
    }
  }, [data, selectedYear]);

  // Apply filters
  const statsData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) => {
      if (selectedYear && selectedYear !== "all" && item.year !== selectedYear)
        return false;
      if (selectedCollege !== "All" && item.college !== selectedCollege)
        return false;
      if (selectedSem && selectedSem !== "All" && item.sem !== selectedSem)
        return false;
      return true;
    });
  }, [data, selectedYear, selectedCollege, selectedSem]);

  // Stats calculation
  const stats = useMemo(() => {
    if (!statsData || statsData.length === 0) return {
      totalGraduates: 0,
      totalMale: 0,
      totalFemale: 0
    };

    const totalMale = statsData.reduce((sum, row) => sum + (row.male || 0), 0);
    const totalFemale = statsData.reduce((sum, row) => sum + (row.female || 0), 0);
    const totalGraduates = totalMale + totalFemale;

    return { 
      totalGraduates, 
      totalMale, 
      totalFemale
    };
  }, [statsData]);

  // College graduate data
  const collegeData = useMemo(() => {
    if (!statsData || statsData.length === 0) return [];
    const grouped = {};
    statsData.forEach(item => {
      if (!grouped[item.college]) grouped[item.college] = { name: item.college, graduates: 0 };
      grouped[item.college].graduates += (item.male || 0) + (item.female || 0);
    });
    return Object.values(grouped).sort((a, b) => b.graduates - a.graduates);
  }, [statsData]);

  // Program graduate data
  const programData = useMemo(() => {
    if (!statsData || statsData.length === 0) return [];
    const grouped = {};
    statsData.forEach(item => {
      const program = item.program || "Unknown";
      if (!grouped[program]) grouped[program] = { name: program, graduates: 0 };
      grouped[program].graduates += (item.male || 0) + (item.female || 0);
    });
    return Object.values(grouped).sort((a, b) => b.graduates - a.graduates);
  }, [statsData]);

  // Semester Graduate Trends (1st, 2nd, Mid)
  const mergedSemesterTrends = useMemo(() => {
    if (!statsData || statsData.length === 0) return [];

    const grouped = {};
    statsData.forEach(item => {
      const year = item.year;
      const sem = item.sem;
      if (!grouped[year]) grouped[year] = { year };
      if (sem) {
        grouped[year][sem] = (grouped[year][sem] || 0) + ((item.male || 0) + (item.female || 0));
      }
    });

    return Object.values(grouped).sort((a, b) => a.year.localeCompare(b.year));
  }, [statsData]);

  // Gender distribution data for chart
  const genderData = useMemo(() => {
    if (!stats || stats.totalGraduates === 0) return [];
    return [
      { name: "Male", value: stats.totalMale },
      { name: "Female", value: stats.totalFemale }
    ];
  }, [stats]);

  // Table columns
  const tableColumns = [
    { header: "Year", key: "year", render: row => <span className="font-medium">{row.year}</span> },
    { header: "Semester", key: "sem", render: row => <span className="font-medium">{row.sem}</span> },
    { header: "College", key: "college", render: row => <span>{row.college}</span> },
    { header: "Program", key: "program", render: row => <span>{row.program}</span> },
    { header: "Male", key: "male", className: "text-right", render: row => <span className="font-semibold text-blue-600">{row.male}</span> },
    { header: "Female", key: "female", className: "text-right", render: row => <span className="font-semibold text-pink-600">{row.female}</span> },
    { header: "Total", key: "Total", className: "text-right", render: row => <span className="font-bold text-gray-900">{(row.male + row.female).toLocaleString()}</span> }
  ];

  // Export CSV
  const handleExport = async () => {
    try {
      const csvContent = [
        ["Year", "Semester", "College", "Program", "Male", "Female", "Total"],
        ...statsData.map(row => [
          row.year,
          row.sem,
          row.college,
          row.program,
          row.male,
          row.female,
          row.male + row.female
        ])
      ].map(row => row.join(",")).join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `graduate_data_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(`Export failed: ${err.message}`);
    }
  };

  if (isLoading) return <LoadingSpinner size="large" text="Loading graduate data..." />;
  if (error) return (
    <div className="space-y-6">
      <ErrorAlert error={error} />
      <EmptyState title="Failed to Load Data" description="Error loading graduate data" action={<button onClick={() => window.location.reload()}>Retry</button>} />
    </div>
  );
  if (!data || data.length === 0) return <EmptyState icon={GraduationCap} title="No Graduate Data" description="No graduate data available" />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Graduation Data</h2>
        <p className="text-sm text-gray-500">Graduation rates, trends, and student outcomes</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Graduates"
          value={stats.totalGraduates.toLocaleString()}
          subtitle="Academic Year 2023-2024"
          icon={GraduationCap}
          gradient="from-blue-500 to-blue-600"
        />

        <StatsCard
          title="Graduation Rate"
          value={`${stats.graduationRate}%`}
          subtitle="↑ 1% vs last year"
          icon={TrendingUp}
          gradient="from-green-500 to-green-600"
        />

        <StatsCard
          title="On-Time Graduation"
          value={`${stats.onTimeGraduation}%`}
          subtitle="Within 4 years"
          icon={Calendar}
          gradient="from-yellow-400 to-yellow-500"
          textColor="text-gray-900"
        />

        <StatsCard
          title="Employment Rate"
          value={`${stats.employmentRate}%`}
          subtitle="Within 6 months"
          icon={Award}
          gradient="from-purple-500 to-purple-600"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graduation Trends */}
        <ChartContainer
          title="Graduation Rate Trends"
          description="Graduation rates over the past 6 years"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={graduationTrends}>
              <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
              <XAxis dataKey="year" {...CHART_CONFIG.axis} />
              <YAxis {...CHART_CONFIG.axis} domain={[80, 100]} />
              <Tooltip {...CHART_CONFIG.tooltip} />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke={COLORS.success}
                strokeWidth={3}
                dot={{ fill: COLORS.success, r: 6 }}
                name="Graduation Rate %"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Graduates Count */}
        <ChartContainer
          title="Number of Graduates"
          description="Total graduates per year"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={graduationTrends}>
              <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
              <XAxis dataKey="year" {...CHART_CONFIG.axis} />
              <YAxis {...CHART_CONFIG.axis} />
              <Tooltip {...CHART_CONFIG.tooltip} />
              <Bar dataKey="graduates" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* On-Time vs Delayed */}
        <ChartContainer
          title="Graduation Timeline"
          description="On-time vs delayed graduation"
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={graduationTrends}>
              <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
              <XAxis dataKey="year" {...CHART_CONFIG.axis} />
              <YAxis {...CHART_CONFIG.axis} />
              <Tooltip {...CHART_CONFIG.tooltip} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="onTime" 
                stackId="1"
                stroke={COLORS.success}
                fill={COLORS.success}
                name="On-Time"
              />
              <Area 
                type="monotone" 
                dataKey="delayed" 
                stackId="1"
                stroke={COLORS.danger}
                fill={COLORS.danger}
                name="Delayed"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* College Graduation Rates */}
        <ChartContainer
          title="Graduation Rate by College"
          description="Comparison across colleges"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={collegeGraduation}>
              <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
              <XAxis dataKey="college" {...CHART_CONFIG.axis} />
              <YAxis {...CHART_CONFIG.axis} domain={[80, 100]} />
              <Tooltip {...CHART_CONFIG.tooltip} />
              <Bar dataKey="rate" fill={COLORS.secondary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Employment Status */}
      <ChartContainer
        title="Graduate Employment Status"
        description="Post-graduation outcomes within 6 months"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {employmentData.map((item, idx) => (
            <div key={idx} className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {item.count.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mb-2">{item.category}</div>
              <div className="text-2xl font-semibold text-blue-600">
                {item.percentage}%
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>

      {/* College Performance Comparison */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">College Performance</h3>
        <div className="space-y-4">
          {collegeGraduation.map((college, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-2">
                <div>
                  <span className="text-sm font-medium text-gray-900">{college.college}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({college.graduates} graduates)
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{college.rate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div 
                  className={`h-6 rounded-full transition-all duration-300 flex items-center justify-end pr-2 ${
                    college.rate >= 92 ? 'bg-green-500' : 
                    college.rate >= 85 ? 'bg-yellow-400' : 
                    'bg-red-500'
                  }`}
                  style={{ width: `${college.rate}%` }}
                >
                  <span className="text-xs font-medium text-white">{college.rate}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Program Graduation Table */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Program Performance</h3>
            <p className="text-sm text-gray-500 mt-1">Graduation statistics by program</p>
          </div>
        </div>
        <DataTable 
          columns={tableColumns}
          data={graduationByProgram}
          emptyMessage="No program data available"
        />
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8" />
            <h3 className="text-xl font-semibold">Positive Trend</h3>
          </div>
          <p className="text-3xl font-bold mb-2">+5.2%</p>
          <p className="text-sm opacity-90">
            Graduation rate has improved by 5.2 percentage points over the last 5 years, 
            demonstrating strong academic support and student success initiatives.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-8 h-8" />
            <h3 className="text-xl font-semibold">High Performance</h3>
          </div>
          <p className="text-3xl font-bold mb-2">93%</p>
          <p className="text-sm opacity-90">
            93% of graduates complete their degree on time, reflecting effective curriculum 
            design and student guidance programs.
          </p>
        </div>
      </div>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Filters */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Graduate Analytics</h2>
                <p className="text-sm text-gray-600 mt-1">Comprehensive graduation insights and trends</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <select
              value={selectedYear || "all"}
              onChange={(e) => setSelectedYear(e.target.value === "all" ? "all" : e.target.value)}
              className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-300 transition-colors"
            >
              {filterOptions.years.map((year) => (
                <option key={year} value={year}>
                  {year === "all" ? "All Years" : year}
                </option>
              ))}
            </select>

            <select
              value={selectedSem || "All"}
              onChange={(e) => setSelectedSem(e.target.value)}
              className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-300 transition-colors"
            >
              {filterOptions.semesters.map((sem) => (
                <option key={sem} value={sem}>
                  {sem === "All" ? "All Semesters" : sem}
                </option>
              ))}
            </select>

            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-300 transition-colors"
            >
              {filterOptions.colleges.map((college) => (
                <option key={college} value={college}>
                  {college}
                </option>
              ))}
            </select>

            <button onClick={handleExport} className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard 
            title="Total Graduates" 
            value={stats.totalGraduates.toLocaleString()} 
            subtitle={selectedYear === "all" ? "All Years" : `Year: ${selectedYear}`} 
            icon={GraduationCap} 
            gradient="from-purple-500 to-purple-600" 
          />
          
          <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300"></div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl w-fit mb-4 shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-500 mb-1">Male Graduates</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalMale.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">{stats.totalGraduates > 0 ? ((stats.totalMale / stats.totalGraduates) * 100).toFixed(1) : 0}% of total</p>
            </div>
          </div>

          <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500 to-pink-600 opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300"></div>
            <div className="relative">
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-3 rounded-xl w-fit mb-4 shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-500 mb-1">Female Graduates</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalFemale.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">{stats.totalGraduates > 0 ? ((stats.totalFemale / stats.totalGraduates) * 100).toFixed(1) : 0}% of total</p>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartContainer title="Graduates by College" description="Distribution across colleges">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={collegeData.slice(0, 6)}>
                <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
                <XAxis dataKey="name" {...CHART_CONFIG.axis} angle={-45} textAnchor="end" height={80} />
                <YAxis {...CHART_CONFIG.axis} />
                <Tooltip {...CHART_CONFIG.tooltip} />
                <Bar dataKey="graduates" fill="#a855f7" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer title="Graduates by Program" description="Distribution across programs">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={programData.slice(0, 8)}>
                <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
                <XAxis dataKey="name" {...CHART_CONFIG.axis} angle={-45} textAnchor="end" height={80} />
                <YAxis {...CHART_CONFIG.axis} />
                <Tooltip {...CHART_CONFIG.tooltip} />
                <Bar dataKey="graduates" fill="#ec4899" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Semester Trends */}
        <ChartContainer title="Semester Graduate Trends" description="Graduation trends per semester over the years">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={mergedSemesterTrends}>
              <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
              <XAxis dataKey="year" {...CHART_CONFIG.axis} />
              <YAxis {...CHART_CONFIG.axis} />
              <Tooltip {...CHART_CONFIG.tooltip} />
              <Legend verticalAlign="top" height={40} iconType="circle" />
              <Line type="monotone" dataKey="1st" stroke="#a855f7" strokeWidth={3} dot={{ fill: "#a855f7", r: 5, strokeWidth: 2, stroke: "#fff" }} name="1st Semester" />
              <Line type="monotone" dataKey="2nd" stroke="#ec4899" strokeWidth={3} dot={{ fill: "#ec4899", r: 5, strokeWidth: 2, stroke: "#fff" }} name="2nd Semester" />
              <Line type="monotone" dataKey="Mid" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", r: 5, strokeWidth: 2, stroke: "#fff" }} name="Midyear" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Gender Distribution Chart */}
        <ChartContainer title="Gender Distribution" description="Graduate distribution by gender">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={genderData} layout="vertical">
              <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
              <XAxis type="number" {...CHART_CONFIG.axis} />
              <YAxis type="category" dataKey="name" {...CHART_CONFIG.axis} />
              <Tooltip {...CHART_CONFIG.tooltip} />
              <Bar dataKey="value" fill="#a855f7" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Recent Graduates</h3>
              <p className="text-sm text-gray-500 mt-1">Latest graduate records</p>
            </div>
          </div>
          <DataTable columns={tableColumns} data={statsData.slice(0, 10)} emptyMessage="No graduate records found" />
        </div>
      </div>
    </div>
  );
};

export default Graduation;