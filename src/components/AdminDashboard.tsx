import React, { useState } from 'react';
import { Booking, ContactMessage, ProjectGalleryItem } from '../types';
import { GALLERY_ITEMS, SERVICES_PACKAGES, COMPANY_INFO } from '../data/mockData';
import { db, doc, updateDoc, deleteDoc } from '../lib/firebase';
import { 
  Lock, X, Check, Clock, Calendar, Car, Phone, Shield, DollarSign, 
  Filter, Trash2, Plus, Image, MessageSquare, CheckCircle, Search, 
  RefreshCw, Printer, Download, Sparkles, AlertCircle, FileSpreadsheet, MapPin 
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onUpdateBookingStatus: (id: string, newStatus: Booking['status'], adminNotes?: string) => void;
  contactMessages: ContactMessage[];
  isGoogleAdmin?: boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  bookings,
  onUpdateBookingStatus,
  contactMessages,
  isGoogleAdmin = false
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isGoogleAdmin);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'bookings' | 'gallery' | 'inquiries' | 'analytics'>('bookings');
  
  // Gallery Management State
  const [galleryList, setGalleryList] = useState<ProjectGalleryItem[]>(GALLERY_ITEMS);
  const [newCarTitle, setNewCarTitle] = useState('');
  const [newCarModel, setNewCarModel] = useState('');
  const [newCategory, setNewCategory] = useState<'PPF' | 'Ceramic' | 'Detailing' | 'Tints' | 'Interior'>('PPF');
  const [newPackageUsed, setNewPackageUsed] = useState('Full Body Self-Healing PPF');
  const [newBeforeImg, setNewBeforeImg] = useState('');
  const [newAfterImg, setNewAfterImg] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  // Selected Booking for Detailed Job Sheet Modal
  const [selectedJobSheet, setSelectedJobSheet] = useState<Booking | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Filters
  const [bookingFilter, setBookingFilter] = useState<'all' | 'pending' | 'confirmed' | 'in_progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123' || password === 'empire' || password === '1234' || password === 'islamabad') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid Studio Key. (Try demo PIN: admin123)');
    }
  };

  const handleStatusChange = async (id: string, newStatus: Booking['status'], notes?: string) => {
    try {
      const docRef = doc(db, 'bookings', id);
      await updateDoc(docRef, {
        status: newStatus,
        updatedAt: new Date().toISOString(),
        ...(notes !== undefined ? { adminNotes: notes } : {}),
        ...(newStatus === 'confirmed' ? { confirmedAt: new Date().toISOString() } : {})
      });
    } catch (err) {
      console.warn('Firestore direct update fallback to local state:', err);
    }
    onUpdateBookingStatus(id, newStatus, notes);
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCarTitle || !newCarModel) return;

    const newProj: ProjectGalleryItem = {
      id: `gal-${Date.now()}`,
      title: newCarTitle,
      car: newCarModel,
      category: newCategory,
      packageUsed: newPackageUsed,
      description: newDesc || 'Completed at Empire Auto Spa G-9 Markaz Islamabad.',
      beforeImage: newBeforeImg || 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80',
      afterImage: newAfterImg || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
      completionTime: '1-2 Days',
      featured: true
    };

    setGalleryList([newProj, ...galleryList]);
    setShowAddProjectModal(false);
    setNewCarTitle('');
    setNewCarModel('');
    setNewBeforeImg('');
    setNewAfterImg('');
    setNewDesc('');
  };

  const exportBookingsCSV = () => {
    const headers = ['BookingID', 'Client', 'Phone', 'Car', 'Service', 'Date', 'TimeSlot', 'EstimatedTotal', 'Status'];
    const rows = bookings.map(b => [
      b.id,
      `"${b.customerName}"`,
      `"${b.phone}"`,
      `"${b.carYear} ${b.carMake} ${b.carModel}"`,
      `"${b.serviceName}"`,
      b.date,
      `"${b.timeSlot}"`,
      `"${b.estimatedTotal}"`,
      b.status
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `EmpireAutoSpa_Bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = bookingFilter === 'all' || b.status === bookingFilter;
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.carModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.carMake.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate revenue from completed/confirmed
  const totalRevenue = bookings.reduce((sum, b) => {
    if (typeof b.estimatedTotal === 'number' && (b.status === 'completed' || b.status === 'confirmed')) {
      return sum + b.estimatedTotal;
    }
    return sum;
  }, 0);

  const pendingCount = bookings.filter((b) => b.status === 'pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
  const inProgressCount = bookings.filter((b) => b.status === 'in_progress').length;
  const completedCount = bookings.filter((b) => b.status === 'completed').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl rounded-3xl bg-[#090C14] border border-[#00E5FF]/40 shadow-2xl shadow-cyan-950/80 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-[#0B1322] to-slate-900 border-b border-cyan-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-950 border border-cyan-400/40 text-[#00E5FF] shadow-lg shadow-cyan-950/50">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-[#00E5FF] tracking-wider">
                Empire Auto Spa • Studio Management Portal
              </div>
              <h2 className="text-xl font-bold font-['Syne',sans-serif] text-white">
                Admin Control & Booking Confirmation Center
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Studio Database Live
              </span>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* LOGIN GATE */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full my-auto space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950 border border-[#00E5FF]/40 text-[#00E5FF] flex items-center justify-center mx-auto shadow-lg shadow-cyan-950/80">
              <Shield className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold font-['Syne',sans-serif] text-white uppercase">
                Studio Staff Authorization
              </h3>
              <p className="text-xs text-slate-400">
                Enter your studio management PIN or click Quick Demo Access to review live bookings.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Studio PIN / Password
                </label>
                <input
                  type="password"
                  placeholder="Enter admin123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-[#00E5FF] focus:outline-none"
                />
                {errorMsg && (
                  <p className="text-[11px] text-rose-400 mt-1 font-mono">{errorMsg}</p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-[#00E5FF] to-[#38BDF8] text-black hover:brightness-110 transition-colors shadow-md shadow-cyan-500/25"
                >
                  Unlock Portal
                </button>
                <button
                  type="button"
                  onClick={() => setIsAuthenticated(true)}
                  className="px-4 py-2.5 rounded-xl text-xs font-mono bg-slate-800 text-slate-300 hover:text-white"
                >
                  Quick Demo Access
                </button>
              </div>

              <div className="text-center">
                <span className="text-[11px] font-mono text-slate-500">
                  Staff credentials: <code className="text-[#00E5FF]">admin123</code>
                </span>
              </div>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Top Navigation Tabs */}
            <div className="px-6 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {[
                  { id: 'bookings', label: `Bookings (${bookings.length})` },
                  { id: 'gallery', label: `Gallery Manager (${galleryList.length})` },
                  { id: 'inquiries', label: `Inquiries (${contactMessages.length})` },
                  { id: 'analytics', label: 'Revenue & Bay Stats' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                      activeTab === tab.id
                        ? 'bg-cyan-950/80 border border-[#00E5FF] text-[#00E5FF]'
                        : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {activeTab === 'bookings' && (
                  <button
                    onClick={exportBookingsCSV}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5"
                    title="Download CSV spreadsheet"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>Export CSV</span>
                  </button>
                )}

                {activeTab === 'gallery' && (
                  <button
                    onClick={() => setShowAddProjectModal(true)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase bg-[#00E5FF] text-black flex items-center gap-1.5 hover:bg-cyan-300"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Transformation</span>
                  </button>
                )}
              </div>
            </div>

            {/* TAB CONTENT */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* 1. BOOKINGS MANAGEMENT TAB */}
              {activeTab === 'bookings' && (
                <div className="space-y-4">
                  {/* KPI Quick Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/20">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">Pending Studio Review</span>
                      <span className="text-xl font-bold font-['Syne',sans-serif] text-amber-400">{pendingCount}</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-cyan-500/20">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">Confirmed & Bay Ready</span>
                      <span className="text-xl font-bold font-['Syne',sans-serif] text-[#00E5FF]">{confirmedCount}</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-indigo-500/20">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">In-Bay Detailing</span>
                      <span className="text-xl font-bold font-['Syne',sans-serif] text-indigo-400">{inProgressCount}</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-emerald-500/20">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">Completed Pipeline</span>
                      <span className="text-xl font-bold font-['Syne',sans-serif] text-emerald-400">
                        Rs. {totalRevenue.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Filter & Search Toolbar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-1.5 w-full sm:w-auto">
                      <Search className="w-4 h-4 text-slate-500 ml-2" />
                      <input
                        type="text"
                        placeholder="Search by client, phone, or car..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none w-full sm:w-64"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end flex-wrap">
                      <span className="text-[10px] font-mono text-slate-500">Status:</span>
                      {(['all', 'pending', 'confirmed', 'in_progress', 'completed'] as const).map((st) => (
                        <button
                          key={st}
                          onClick={() => setBookingFilter(st)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase ${
                            bookingFilter === st
                              ? 'bg-cyan-950 border border-[#00E5FF] text-[#00E5FF] font-bold'
                              : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {st.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bookings Table / List */}
                  <div className="space-y-3">
                    {filteredBookings.length === 0 ? (
                      <div className="text-center py-12 text-slate-500 text-xs font-mono bg-slate-950 rounded-2xl border border-slate-900">
                        No appointments found matching your filter criteria.
                      </div>
                    ) : (
                      filteredBookings.map((b) => (
                        <div
                          key={b.id}
                          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
                        >
                          <div className="space-y-1.5 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[#00E5FF] font-mono text-[10px] font-bold">
                                #{b.id}
                              </span>
                              <h4 className="text-white font-bold text-sm font-['Syne',sans-serif]">
                                {b.customerName}
                              </h4>
                              <a
                                href={`tel:${b.phone}`}
                                className="text-xs text-slate-400 hover:text-[#00E5FF] font-mono flex items-center gap-1"
                              >
                                <Phone className="w-3 h-3" />
                                {b.phone}
                              </a>
                              <span className="text-[10px] px-2 py-0.5 rounded uppercase font-mono font-bold bg-slate-800 text-slate-300">
                                {b.source || 'website'}
                              </span>
                              {b.confirmedAt && (
                                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                                  ✓ Studio Confirmed
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                              <span className="font-semibold text-cyan-300">
                                🚗 {b.carYear} {b.carMake} {b.carModel} ({b.vehicleType.toUpperCase()})
                              </span>
                              <span>•</span>
                              <span className="text-amber-300">
                                ⚡ {b.serviceName}
                              </span>
                              <span>•</span>
                              <span className="text-slate-400 font-mono">
                                📅 {b.date} at {b.timeSlot}
                              </span>
                            </div>

                            {b.notes && (
                              <p className="text-[11px] text-slate-400 italic bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
                                Client Note: "{b.notes}"
                              </p>
                            )}

                            {b.adminNotes && (
                              <p className="text-[11px] text-[#00E5FF] bg-cyan-950/40 p-2 rounded-lg border border-cyan-400/20 font-mono">
                                Studio Note: "{b.adminNotes}"
                              </p>
                            )}
                          </div>

                          {/* Status Changer & Quick Actions (Confirmation Mechanism) */}
                          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                            <div className="text-right">
                              <span className="text-[10px] text-slate-500 font-mono block">Estimated</span>
                              <span className="font-mono font-bold text-[#00E5FF] text-xs">
                                {typeof b.estimatedTotal === 'number'
                                  ? `Rs. ${b.estimatedTotal.toLocaleString()}`
                                  : b.estimatedTotal}
                              </span>
                            </div>

                            {/* 1-Click Studio Confirm Button if pending */}
                            {b.status === 'pending' && (
                              <button
                                onClick={() => handleStatusChange(b.id, 'confirmed', 'Bay reserved at G-9 Studio')}
                                className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase font-mono bg-gradient-to-r from-emerald-500 to-teal-400 text-black hover:brightness-110 flex items-center gap-1 shadow-md shadow-emerald-500/20"
                                title="Confirm Studio Appointment & Assign Detailing Bay"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Confirm Bay</span>
                              </button>
                            )}

                            {/* Status Selector */}
                            <select
                              value={b.status}
                              onChange={(e) => handleStatusChange(b.id, e.target.value as any)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono uppercase border focus:outline-none ${
                                b.status === 'confirmed'
                                  ? 'bg-cyan-950 border-cyan-500/60 text-[#00E5FF]'
                                  : b.status === 'completed'
                                  ? 'bg-emerald-950 border-emerald-500/60 text-emerald-300'
                                  : b.status === 'in_progress'
                                  ? 'bg-indigo-950 border-indigo-500/60 text-indigo-300'
                                  : 'bg-amber-950 border-amber-500/60 text-amber-300'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>

                            {/* Direct WhatsApp Client Confirmation message */}
                            <a
                              href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `*EMPIRE AUTO SPA ISLAMABAD*\n\nHi ${b.customerName}, your appointment for ${b.carMake} ${b.carModel} (#${b.id}) on ${b.date} at ${b.timeSlot} is *${b.status.toUpperCase()}*.\n\nStudio Address: G-9 Markaz, Islamabad.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900"
                              title="Send WhatsApp Confirmation to Customer"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </a>

                            {/* Detailed Job Sheet Trigger */}
                            <button
                              onClick={() => {
                                setSelectedJobSheet(b);
                                setAdminNoteInput(b.adminNotes || '');
                              }}
                              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
                              title="View & Edit Job Sheet"
                            >
                              <Printer className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* 2. GALLERY MANAGEMENT TAB */}
              {activeTab === 'gallery' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryList.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 overflow-hidden"
                      >
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                          <img
                            src={item.afterImage}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#00E5FF]">
                            {item.category}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-xs font-['Syne',sans-serif] truncate">
                            {item.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-mono block">
                            {item.packageUsed} • {item.car}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. CONTACT INQUIRIES TAB */}
              {activeTab === 'inquiries' && (
                <div className="space-y-3">
                  {contactMessages.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-xs font-mono bg-slate-950 rounded-2xl border border-slate-900">
                      No customer quote inquiries submitted yet.
                    </div>
                  ) : (
                    contactMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{msg.name}</span>
                            <span className="text-xs text-[#00E5FF] font-mono">({msg.phone})</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {new Date(msg.submittedAt).toLocaleString()}
                          </span>
                        </div>

                        <div className="text-xs text-slate-300">
                          <span className="text-slate-400">Car: </span>
                          <strong>{msg.carDetails || 'Not specified'}</strong> •{' '}
                          <span className="text-slate-400">Interest: </span>
                          <strong className="text-cyan-300">{msg.serviceInterest}</strong>
                        </div>

                        {msg.message && (
                          <p className="text-xs text-slate-400 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                            "{msg.message}"
                          </p>
                        )}

                        <div className="pt-2 flex justify-end gap-2">
                          <a
                            href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(msg.name)},%20this%20is%20Empire%20Auto%20Spa%20Islamabad%20regarding%20your%20quote%20request.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-950 border border-emerald-500/40 text-emerald-400"
                          >
                            Reply on WhatsApp
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* 4. ANALYTICS & STATS TAB */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 space-y-2">
                      <span className="text-xs font-mono uppercase text-[#00E5FF]">Top In-Demand Service</span>
                      <div className="text-lg font-bold font-['Syne',sans-serif] text-white">
                        Paint Protection Film (TPU Self-Healing)
                      </div>
                      <p className="text-xs text-slate-400">
                        Accounting for ~54% of studio appointments in Islamabad.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-2">
                      <span className="text-xs font-mono uppercase text-slate-400">Studio Turnaround</span>
                      <div className="text-lg font-bold font-['Syne',sans-serif] text-white">
                        1-2 Days (PPF) / 4 Hours (Detailing)
                      </div>
                      <p className="text-xs text-slate-400">
                        Operating with 3 dedicated indoor dust-free detailing bays in G-9 Markaz.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-2">
                      <span className="text-xs font-mono uppercase text-emerald-400">Customer Satisfaction</span>
                      <div className="text-lg font-bold font-['Syne',sans-serif] text-white">
                        4.9 ★ Rating on Google Maps
                      </div>
                      <p className="text-xs text-slate-400">
                        Over 140+ verified client reviews across Islamabad & Rawalpindi.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* DETAILED JOB SHEET MODAL (Print / Confirmation / Bay Assignment) */}
      {selectedJobSheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-cyan-500/50 p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedJobSheet(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#00E5FF] uppercase">
                Studio Job Card • #{selectedJobSheet.id}
              </span>
              <h3 className="text-lg font-bold font-['Syne',sans-serif] text-white">
                {selectedJobSheet.carMake} {selectedJobSheet.carModel} ({selectedJobSheet.carYear})
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Customer:</span>
                <span className="font-bold text-white">{selectedJobSheet.customerName} ({selectedJobSheet.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Service:</span>
                <span className="font-bold text-[#00E5FF]">{selectedJobSheet.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Schedule:</span>
                <span className="font-bold text-amber-300">{selectedJobSheet.date} at {selectedJobSheet.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Total:</span>
                <span className="font-mono font-bold text-emerald-400">
                  {typeof selectedJobSheet.estimatedTotal === 'number'
                    ? `Rs. ${selectedJobSheet.estimatedTotal.toLocaleString()}`
                    : selectedJobSheet.estimatedTotal}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono text-slate-300">
                Studio Technician Notes / Bay Instructions
              </label>
              <textarea
                rows={2}
                value={adminNoteInput}
                onChange={(e) => setAdminNoteInput(e.target.value)}
                placeholder="e.g. Bay 2 assigned, requires 3-stage compound before PPF..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-[#00E5FF] focus:outline-none"
              ></textarea>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  handleStatusChange(selectedJobSheet.id, selectedJobSheet.status, adminNoteInput);
                  setSelectedJobSheet(null);
                }}
                className="flex-1 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-[#00E5FF] text-black hover:bg-cyan-300 transition-colors"
              >
                Save Notes & Update
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl text-xs font-mono bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Print
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Gallery Modal */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-[#00E5FF]/40 p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setShowAddProjectModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold font-['Syne',sans-serif] text-white uppercase">
              Add Vehicle Transformation to Gallery
            </h3>

            <form onSubmit={handleAddProject} className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Porsche 911 GT3 - Full TPU Stealth PPF"
                  value={newCarTitle}
                  onChange={(e) => setNewCarTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-[#00E5FF] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Car Model *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Porsche 911"
                    value={newCarModel}
                    onChange={(e) => setNewCarModel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-[#00E5FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-[#00E5FF] focus:outline-none"
                  >
                    <option value="PPF">PPF</option>
                    <option value="Ceramic">Ceramic</option>
                    <option value="Detailing">Detailing</option>
                    <option value="Interior">Interior</option>
                    <option value="Tints">Tints</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">After Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newAfterImg}
                  onChange={(e) => setNewAfterImg(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-[#00E5FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Details about paint correction and chemical finish..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-[#00E5FF] focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-[#00E5FF] text-black hover:bg-cyan-300 transition-colors"
              >
                Save to Studio Showcase
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
