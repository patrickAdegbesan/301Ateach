'use client';

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { WorkType, EmploymentType, Job } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Folder, Building2, Clock, MapPin, Briefcase, DollarSign, Star, List, Grid, X } from "lucide-react";

const JOBS_PER_PAGE = 12;

export default function JobsPage() {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadJobs() {
      try {
        const response = await fetch('/api/jobs');
        const data = await response.json();
        if (data.ok) {
          setAllJobs(data.jobs);
        }
      } catch (error) {
        console.error('Failed to load jobs:', error);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterWorkType, setFilterWorkType] = useState<WorkType | "All">("All");
  const [filterDepartment, setFilterDepartment] = useState<string>("All");
  const [filterEmploymentType, setFilterEmploymentType] = useState<EmploymentType | "All">("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const departments = useMemo(() => {
    const depts = new Set(allJobs.map(job => job.department));
    return ["All", ...Array.from(depts)].sort();
  }, [allJobs]);

  const filteredJobs = useMemo(() => {
    const filtered = allJobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesWorkType = filterWorkType === "All" || job.workType === filterWorkType;
      const matchesDepartment = filterDepartment === "All" || job.department === filterDepartment;
      const matchesEmploymentType = filterEmploymentType === "All" || job.employmentType === filterEmploymentType;

      return matchesSearch && matchesWorkType && matchesDepartment && matchesEmploymentType;
    });
    
    // Reset to page 1 when filters change
    setCurrentPage(1);
    return filtered;
  }, [allJobs, searchTerm, filterWorkType, filterDepartment, filterEmploymentType]);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);

  const clearFilters = () => {
    setSearchTerm("");
    setFilterWorkType("All");
    setFilterDepartment("All");
    setFilterEmploymentType("All");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="py-12 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-navy mb-4"></div>
          <p className="text-gray-600">Loading opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 min-h-screen bg-gray-50">
      <div className="container-custom">
        {/* Header with Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-navy">Open Positions</h1>
          <p className="text-xl text-charcoal mb-6">
            Find your next opportunity at 301A TECH
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg md:rounded-xl shadow-sm p-3 md:p-6 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 md:mb-4 gap-2 md:gap-4">
            <h2 className="text-base md:text-lg font-semibold text-navy">Filter Opportunities</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("list")}
                className={`px-2 md:px-3 py-1 rounded-md text-xs md:text-sm font-medium transition-colors inline-flex items-center gap-1 ${
                  viewMode === "list" 
                    ? "bg-techBlue text-white" 
                    : "bg-softGray text-charcoal hover:bg-softGray-dark"
                }`}
              >
                <List className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden sm:inline">List</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-2 md:px-3 py-1 rounded-md text-xs md:text-sm font-medium transition-colors inline-flex items-center gap-1 ${
                  viewMode === "grid" 
                    ? "bg-techBlue text-white" 
                    : "bg-softGray text-charcoal hover:bg-softGray-dark"
                }`}
              >
                <Grid className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden sm:inline">Grid</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="label text-navy flex items-center gap-1 text-xs md:text-sm mb-1">
                <Search className="w-3 h-3 md:w-4 md:h-4" /> Search
              </label>
              <input
                id="search"
                type="text"
                placeholder="Job title, keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field text-sm"
              />
            </div>

            {/* Department Filter */}
            <div>
              <label htmlFor="department" className="label text-navy flex items-center gap-1 text-xs md:text-sm mb-1">
                <Folder className="w-3 h-3 md:w-4 md:h-4" /> Department
              </label>
              <select
                id="department"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="input-field text-sm"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Work Type Filter */}
            <div>
              <label htmlFor="workType" className="label text-navy flex items-center gap-1 text-xs md:text-sm mb-1">
                <Building2 className="w-3 h-3 md:w-4 md:h-4" /> Work Type
              </label>
              <select
                id="workType"
                value={filterWorkType}
                onChange={(e) => setFilterWorkType(e.target.value as WorkType | "All")}
                className="input-field text-sm"
              >
                <option value="All">All</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            {/* Employment Type Filter */}
            <div>
              <label htmlFor="employmentType" className="label text-navy flex items-center gap-1 text-xs md:text-sm mb-1">
                <Clock className="w-3 h-3 md:w-4 md:h-4" /> Employment
              </label>
              <select
                id="employmentType"
                value={filterEmploymentType}
                onChange={(e) => setFilterEmploymentType(e.target.value as EmploymentType | "All")}
                className="input-field text-sm"
              >
                <option value="All">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
          
          {(searchTerm || filterWorkType !== "All" || filterDepartment !== "All" || filterEmploymentType !== "All") && (
            <div className="mt-4">
              <button
                onClick={clearFilters}
                className="text-sm text-techBlue hover:text-techBlue-dark font-medium inline-flex items-center gap-1"
              >
                <X className="w-4 h-4" /> Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count and Pagination Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
          <div>
            <p className="text-charcoal">
              Showing <span className="font-semibold text-techBlue">{startIndex + 1}-{Math.min(startIndex + JOBS_PER_PAGE, filteredJobs.length)}</span> of <span className="font-semibold text-techBlue">{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'position' : 'positions'}
            </p>
            {allJobs.length === 100 && (
              <p className="text-xs text-gray-500 mt-1">Showing most recent 100 opportunities</p>
            )}
          </div>
          {totalPages > 1 && (
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-lg shadow-sm"
          >
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-techBlue/10 rounded-full">
                <Search className="w-16 h-16 text-techBlue" />
              </div>
            </div>
            <p className="text-2xl font-bold text-navy mb-2">No positions found</p>
            <p className="text-charcoal mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={clearFilters}
              className="bg-techBlue hover:bg-techBlue-dark text-white px-6 py-2 rounded-lg transition-colors font-medium"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              {viewMode === "list" ? (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-4"
                >
                  {paginatedJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <Link 
                        href={`/careers/jobs/${job.slug}`}
                        className="card block hover:border-techBlue hover:shadow-lg group transition-all"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h2 className="text-xl md:text-2xl font-bold group-hover:text-techBlue transition-colors text-navy">
                                {job.title}
                              </h2>
                              {job.featured && (
                                <span className="text-xs font-bold px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-current" /> Featured
                                </span>
                              )}
                            </div>
                            
                            <div className="flex flex-wrap gap-4 mb-3 text-sm">
                              <span className="flex items-center gap-1 text-charcoal font-medium">
                                <MapPin className="w-4 h-4" /> {job.location}
                              </span>
                              <span className="flex items-center gap-1 text-charcoal font-medium">
                                <Briefcase className="w-4 h-4" /> {job.department}
                              </span>
                              <span className="flex items-center gap-1">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                  job.workType === "Remote" 
                                    ? "bg-green-100 text-green-800"
                                    : job.workType === "Hybrid"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-purple-100 text-purple-800"
                                }`}>
                                  {job.workType}
                                </span>
                              </span>
                              <span className="flex items-center gap-1 text-charcoal">
                                <Clock className="w-4 h-4" /> {job.employmentType.replace('_', '-')}
                              </span>
                            </div>
                            
                            <p className="text-charcoal mb-3 line-clamp-2">
                              {job.summary}
                            </p>

                            {job.salaryRange && (
                              <p className="text-techBlue font-bold text-lg">
                                {job.salaryRange}
                              </p>
                            )}
                          </div>

                          <div className="flex lg:flex-col items-center lg:items-end gap-3 lg:min-w-[160px]">
                            <span className="text-xs text-charcoal lg:text-right">
                              {job.postedAt}
                            </span>
                            <span className="bg-techBlue hover:bg-techBlue-dark text-white text-sm px-6 py-2 rounded-lg transition-colors inline-block whitespace-nowrap font-medium">
                              View Details →
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {paginatedJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <Link 
                        href={`/careers/jobs/${job.slug}`}
                        className="card block hover:border-techBlue hover:shadow-lg group transition-all h-full flex flex-col"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            job.workType === "Remote" 
                              ? "bg-green-100 text-green-800"
                              : job.workType === "Hybrid"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }`}>
                            {job.workType}
                          </span>
                          {job.featured && (
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2 group-hover:text-techBlue transition-colors line-clamp-2 text-navy">
                          {job.title}
                        </h3>
                        
                        <div className="space-y-2 mb-3 text-sm text-charcoal">
                          <p className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-techBlue" /> {job.location}
                          </p>
                          <p className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-techBlue" /> {job.department}
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-techBlue" /> {job.employmentType.replace('_', '-')}
                          </p>
                        </div>
                        
                        <p className="text-charcoal text-sm line-clamp-3 mb-4 flex-1">
                          {job.summary}
                        </p>
                        
                        {job.salaryRange && (
                          <p className="text-techBlue font-bold text-sm mb-3">
                            {job.salaryRange}
                          </p>
                        )}
                        
                        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                          <span className="text-xs text-charcoal">{job.postedAt}</span>
                          <span className="text-sm font-semibold text-techBlue group-hover:underline">
                            Apply →
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 flex justify-center items-center gap-2"
              >
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-md bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-softGray transition-colors font-medium text-navy"
                >
                  ← Previous
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 7) {
                      pageNum = i + 1;
                    } else if (currentPage <= 4) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 3) {
                      pageNum = totalPages - 6 + i;
                    } else {
                      pageNum = currentPage - 3 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 rounded-md font-medium transition-colors ${
                          currentPage === pageNum
                            ? "bg-techBlue text-white"
                            : "bg-white border border-gray-300 hover:bg-softGray text-navy"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-md bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-softGray transition-colors font-medium text-navy"
                >
                  Next →
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
