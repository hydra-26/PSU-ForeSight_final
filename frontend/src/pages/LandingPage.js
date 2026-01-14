import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, BarChart3, TrendingUp, Users, ArrowRight, Sparkles, Award, BookOpen, Target } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: "easeOut" },
  }),
};

const LandingPage = ({ onSignIn }) => {

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-blue-950/90 backdrop-blur-md border-b-2 border-yellow-400 shadow-lg z-50">
        <div className="flex justify-between items-center px-6 lg:px-16 py-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center border-2 border-yellow-400">
              <GraduationCap className="w-6 h-6 text-yellow-400" />
            </div>
            <h1 className="text-xl font-bold text-white">PSU ForeSight</h1>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex gap-8 text-m font-semibold text-white">
            <button onClick={() => scrollToSection("hero")} className="hover:text-yellow-400 transition">Home</button>
            <button onClick={() => scrollToSection("features")} className="hover:text-yellow-400 transition">Features</button>
            <button onClick={() => scrollToSection("statistics")} className="hover:text-yellow-400 transition">About PSU</button>
          </div>

          {/* Sign In */}
          <button
            onClick={onSignIn}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold px-5 py-2.5 rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition-all shadow-md"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative mx-full px-20 pt-40 pb-40 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        style={{
          backgroundImage: `url('https://main.psu.edu.ph/wp-content/uploads/2022/06/lingayen.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800/80 to-transparent z-0"></div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative z-10 text-white"
        >
          <motion.div
            custom={0.1}
            variants={fadeInUp}
            className="inline-block bg-yellow-100 text-blue-900 px-4 py-2 rounded-full text-sm font-semibold mb-4"
          >
            Pangasinan State University
          </motion.div>

          <motion.h2
            custom={0.2}
            variants={fadeInUp}
            className="text-5xl font-bold mb-6 leading-tight text-white"
          >
            Dynamic Student Visualization and Forecasting Dashboard
          </motion.h2>

          <motion.p
            custom={0.3}
            variants={fadeInUp}
            className="text-lg text-blue-100 mb-8"
          >
            PSU ForeSight provides comprehensive visualization and forecasting tools to support strategic planning,
            academic development, and evidence-based policy formulation.
          </motion.p>

          <motion.button
            custom={0.4}
            variants={fadeInUp}
            onClick={onSignIn}
            className="relative flex items-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg group overflow-hidden hover:from-yellow-300 hover:to-yellow-400 hover:scale-105"
          >
            <span className="transition-all duration-300 group-hover:pr-6">Explore Dashboard</span>
            <ArrowRight className="absolute right-6 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </motion.button>
        </motion.div>
      </section>

      {/* Features Section */}
      <motion.section
        id="features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="relative pt-24 pb-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/50 to-white"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Powerful Analytics Platform</span>
            </div>
            <h2 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 bg-clip-text text-transparent mb-5">
              Key Features
            </h2>
            <p className="text-gray-600 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
              Transform your data into actionable insights with our advanced analytics and AI-powered forecasting platform
            </p>
            <div className="mt-8 flex justify-center gap-2">
              <div className="w-16 h-1.5 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-1.5 bg-yellow-400 rounded-full"></div>
              <div className="w-4 h-1.5 bg-blue-400 rounded-full"></div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="w-12 h-12 text-blue-600" />,
                title: "Data Visualization",
                text: "Interactive dashboards with real-time charts and metrics.",
                gradient: "from-blue-500 via-blue-600 to-cyan-600",
                bgGradient: "from-blue-50 via-blue-100/50 to-cyan-50",
                accentColor: "blue",
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-amber-600" />,
                title: "AI Forecasting",
                text: "Machine learning insights that predict enrollment trends.",
                gradient: "from-amber-500 via-yellow-500 to-orange-500",
                bgGradient: "from-amber-50 via-yellow-100/50 to-orange-50",
                accentColor: "amber",
              },
              {
                icon: <Users className="w-12 h-12 text-indigo-600" />,
                title: "Demographics Insights",
                text: "Student distribution by gender, location, and performance.",
                gradient: "from-indigo-500 via-purple-500 to-blue-600",
                bgGradient: "from-indigo-50 via-purple-100/50 to-blue-50",
                accentColor: "indigo",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -16, scale: 1.03 }}
                className="group relative"
              >
                
                <div className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-70 transition-all duration-500 blur-xl`}></div>
                
                <div className={`relative p-10 rounded-3xl bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm border-2 border-white/50 group-hover:border-white transition-all duration-500 shadow-xl h-full`}>
                  
                  <div className="relative mb-6 inline-block">
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-all duration-500 scale-110`}></div>
                    <div className="relative bg-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-base">
                    {feature.text}
                  </p>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ⭐⭐⭐ ABOUT PSU — 1x4 GRID ⭐⭐⭐ */}
      <section id="statistics" className="mx-full py-24 bg-gradient-to-b from-white via-gray-50 to-white mx-auto">
        <center>
          <h2 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 bg-clip-text text-transparent mb-24">
            About PSU
          </h2>
        </center>

        <div className="max-w-8xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Card 1 */}
          <StatCard
            end={27467}
            label="Total Students"
            description="Enrolled Across All Programs"
            icon={<Users className="w-16 h-16 text-yellow-400" />}
            color="from-blue-900 via-blue-800 to-blue-900"
            textColor="text-yellow-400"
          />

          {/* Card 2 */}
          <StatCard
            end={37}
            label="Programs Offered"
            description="Centers of Excellence"
            icon={<BookOpen className="w-16 h-16 text-blue-900" />}
            color="from-yellow-400 via-yellow-500 to-amber-500"
            textColor="text-blue-900"
          />

          {/* Card 3 */}
          <StatCard
            end={88}
            suffix="%"
            label="Graduation Rate"
            description="Student Success Rate"
            icon={<Target className="w-16 h-16 text-yellow-400" />}
            color="from-blue-800 via-indigo-700 to-blue-800"
            textColor="text-yellow-400"
          />

          {/* Card 4 */}
          <StatCard
            end={633}
            label="Qualified Instructors"
            description="Dedicated Educators"
            icon={<Award className="w-16 h-16 text-blue-900" />}
            color="from-amber-500 via-yellow-500 to-yellow-600"
            textColor="text-blue-900"
          />

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-950 to-blue-900 text-center py-8 text-yellow-400 font-semibold border-t-4 border-yellow-400">
        <div className="flex items-center justify-center gap-2 mb-2">
          <GraduationCap className="w-5 h-5" />
          <span className="text-xl font-bold">PSU ForeSight</span>
        </div>
        <p className="text-blue-200 text-sm">
          © {new Date().getFullYear()} Pangasinan State University — Empowering Education Through Data
        </p>
      </footer>
    </div>
  );
};

/* ================================
   ⭐ NEW StatCard Component ⭐
================================ */
const StatCard = ({ end, suffix = "", label, description, icon, color, textColor }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800;
    const increment = end / (duration / 16);

    const animate = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={`p-5 rounded-3xl bg-gradient-to-br ${color} shadow-xl border-4 border-white/20`}
    >
      <div className={`mb-4 ${textColor}`}>{icon}</div>

      <h3 className={`text-6xl font-extrabold mb-4 ${textColor}`}>
        {count.toLocaleString()}{suffix}
      </h3>

      <p className={`text-2xl font-bold mb-2 ${textColor}`}>
        {label}
      </p>

      <p className={`text-lg ${textColor === "text-blue-900" ? "text-blue-800" : "text-yellow-200"}`}>
        {description}
      </p>
    </motion.div>
  );
};

export default LandingPage;
