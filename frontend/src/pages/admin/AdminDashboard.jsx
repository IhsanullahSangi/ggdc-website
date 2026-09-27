import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Activity,
  Globe,
  Save,
  Bell,
  Trash2,
  Edit,
  Images,
  Camera,
  Calendar,
  Link as LinkIcon,
  DownloadCloud,
  GraduationCap,
  LayoutTemplate,
  Database,
  Award,
} from "lucide-react";

import ManageAdmissionsPage from "./ManageAdmissionsPage";

import ManageAdmitCards from "./ManageAdmitCards";

import ManageResults from "./ManageResults";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("settings");
  const [isLoading, setIsLoading] = useState(false);

  // Settings State
  const [portalSettings, setPortalSettings] = useState({
    admissionPhase: "none",
    isPopupActive: false,
    popupTitle: "",
    popupContent: "",
    popupLinkText: "", // 🌟 NEW
    popupLinkUrl: "", // 🌟 NEW
    popupImageUrl: "",
    actionTitle: "",
    actionSubtitle: "",
    principalImageUrl: "",
    enrollmentCount: 0,
    feeLinkAD: "",
    feeLinkBS: "",
    curriculum11: "",
    curriculum12: "",
    curriculumADS: "",
    curriculumBS: "",
  });

  // Notices State
  const [noticesList, setNoticesList] = useState([]);
  const [isFetchingNotices, setIsFetchingNotices] = useState(false);
  const [noticeForm, setNoticeForm] = useState({
    title: "",
    category: "Latest News",
    fileUrl: "",
  });
  const [editingNoticeId, setEditingNoticeId] = useState(null);

  // Slider State
  const [heroImages, setHeroImages] = useState([]);
  const [newHeroImage, setNewHeroImage] = useState({
    imageUrl: "",
    caption: "",
  });

  // Gallery State
  const [galleryImages, setGalleryImages] = useState([]);
  const [newGalleryImage, setNewGalleryImage] = useState({
    title: "",
    imageUrl: "",
    category: "",
    eventDate: "",
  });

  // Timetables State
  const [timetables, setTimetables] = useState([]);
  const [newTimetable, setNewTimetable] = useState({
    title: "",
    fileUrl: "",
    category: "General",
  });

  // Downloads State
  const [downloadsList, setDownloadsList] = useState([]);
  const [newDownload, setNewDownload] = useState({
    title: "",
    fileUrl: "",
    category: "Admission Forms",
  });

  // 🌟 NEW: Faculty State
  const [facultyList, setFacultyList] = useState([]);
  const [newFaculty, setNewFaculty] = useState({
    name: "",
    designation: "",
    subject: "",
    qualification: "",
    photoUrl: "",
  });

  // 1. Fetch Global Settings
  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("http://localhost:8080/api/settings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setPortalSettings({
          admissionPhase: data.admissionPhase || "none",
          isPopupActive: data.isPopupActive || false,
          popupTitle: data.popupTitle || "",
          popupContent: data.popupContent || "",
          popupImageUrl: data.popupImageUrl || "",
          popupLinkText: data.popupLinkText || "", // 🌟 NEW
          popupLinkUrl: data.popupLinkUrl || "", // 🌟 NEW
          actionTitle: data.actionTitle || "",
          actionSubtitle: data.actionSubtitle || "",
          principalImageUrl: data.principalImageUrl || "",
          enrollmentCount: data.enrollmentCount || 0,
          feeLinkAD: data.feeLinkAD || "",
          feeLinkBS: data.feeLinkBS || "",
          curriculum11: data.curriculum11 || "",
          curriculum12: data.curriculum12 || "",
          curriculumADS: data.curriculumADS || "",
          curriculumBS: data.curriculumBS || "",
        });
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  };

  // 2. Fetch Notices
  const fetchNotices = async () => {
    setIsFetchingNotices(true);
    try {
      const res = await fetch("http://localhost:8080/api/notices");
      if (res.ok) setNoticesList(await res.json());
    } catch (error) {
      console.error("Failed to load notices");
    } finally {
      setIsFetchingNotices(false);
    }
  };

  // 3. Fetch Slider Images
  const fetchHeroImages = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/hero");
      if (res.ok) setHeroImages(await res.json());
    } catch (error) {
      console.error("Failed to fetch hero images");
    }
  };

  // 4. Fetch Gallery Images
  const fetchGalleryImages = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/gallery");
      if (res.ok) setGalleryImages(await res.json());
    } catch (error) {
      console.error("Failed to fetch gallery");
    }
  };

  // 5. Fetch Timetables
  const fetchTimetables = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/timetables");
      if (res.ok) setTimetables(await res.json());
    } catch (error) {
      console.error("Failed to fetch timetables");
    }
  };

  // 6. Fetch Downloads
  const fetchDownloads = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/downloads");
      if (res.ok) setDownloadsList(await res.json());
    } catch (error) {
      console.error("Failed to fetch downloads");
    }
  };

  // 🌟 7. Fetch Faculty
  const fetchFaculty = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/faculty");
      if (res.ok) setFacultyList(await res.json());
    } catch (error) {
      console.error("Failed to fetch faculty");
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Switch tabs effect
  useEffect(() => {
    if (activeTab === "notices") fetchNotices();
    if (activeTab === "slider") fetchHeroImages();
    if (activeTab === "gallery") fetchGalleryImages();
    if (activeTab === "timetable") fetchTimetables();
    if (activeTab === "downloads") fetchDownloads();
    if (activeTab === "faculty") fetchFaculty(); // 🌟 NEW
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  // Save Settings
  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        "http://localhost:8080/api/settings/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(portalSettings),
        },
      );
      if (response.ok) alert("Settings updated successfully!");
    } catch (error) {
      alert("Failed to update settings.");
    } finally {
      setIsLoading(false);
    }
  };

  // Notice Handlers
  const handleEditClick = (notice) => {
    setEditingNoticeId(notice._id);
    setNoticeForm({
      title: notice.title,
      category: notice.category,
      fileUrl: notice.fileUrl,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleCancelEdit = () => {
    setEditingNoticeId(null);
    setNoticeForm({ title: "", category: "Latest News", fileUrl: "" });
  };
  const handleSubmitNotice = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const url = editingNoticeId
      ? `http://localhost:8080/api/notices/${editingNoticeId}`
      : "http://localhost:8080/api/notices";
    const method = editingNoticeId ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(noticeForm),
      });
      if (res.ok) {
        alert(editingNoticeId ? "Notice updated!" : "Notice published!");
        handleCancelEdit();
        fetchNotices();
      }
    } catch (err) {
      alert("Error connecting to the server.");
    }
  };
  const handleDeleteNotice = async (id) => {
    if (!window.confirm("Delete this notice?")) return;
    const token = localStorage.getItem("adminToken");
    await fetch(`http://localhost:8080/api/notices/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotices();
  };

  return (
    <div className="flex h-screen bg-slate-100 font-body">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-heading font-bold text-white uppercase tracking-wider">
            IT Portal
          </h2>
          <p className="text-xs text-collegeCyan mt-1">GGDC Ghotki Control</p>
        </div>
        <nav className="flex-1 py-6 space-y-2 px-4 overflow-y-auto">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === "dashboard" ? "bg-collegeCyan text-white" : "hover:bg-slate-800"}`}
          >
            <LayoutDashboard size={20} /> Dashboard Home
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === "settings" ? "bg-collegeCyan text-white" : "hover:bg-slate-800"}`}
          >
            <Settings size={20} /> Portal Settings
          </button>
          <button
            onClick={() => setActiveTab("notices")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === "notices" ? "bg-collegeCyan text-white" : "hover:bg-slate-800"}`}
          >
            <MessageSquare size={20} /> Manage Notices
          </button>
          <button
            onClick={() => setActiveTab("slider")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === "slider" ? "bg-collegeCyan text-white" : "hover:bg-slate-800"}`}
          >
            <Images size={20} /> Manage Slider
          </button>

          <button
            onClick={() => setActiveTab("gallery")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === "gallery" ? "bg-collegeCyan text-white" : "hover:bg-slate-800"}`}
          >
            <Camera size={20} /> Manage Gallery
          </button>
          <button
            onClick={() => setActiveTab("timetable")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === "timetable" ? "bg-collegeCyan text-white" : "hover:bg-slate-800"}`}
          >
            <Calendar size={20} /> Manage Timetables
          </button>

          <button
            onClick={() => setActiveTab("downloads")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === "downloads" ? "bg-collegeCyan text-white" : "hover:bg-slate-800"}`}
          >
            <DownloadCloud size={20} /> Manage Downloads
          </button>

          {/* 🌟 NEW: Manage Faculty Button */}
          <button
            onClick={() => setActiveTab("faculty")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === "faculty" ? "bg-collegeCyan text-white" : "hover:bg-slate-800"}`}
          >
            <GraduationCap size={20} /> Manage Faculty
          </button>
          <button
            onClick={() => setActiveTab("admissionsPage")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === "admissionsPage" ? "bg-collegeCyan text-white" : "hover:bg-slate-800"}`}
          >
            <LayoutTemplate size={20} /> Edit Admissions Page
          </button>

          <button
            onClick={() => setActiveTab("admitCards")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === "admitCards" ? "bg-collegeCyan text-white" : "hover:bg-slate-800"}`}
          >
            <Database size={20} /> Manage Admit Cards
          </button>

          <button
            onClick={() => setActiveTab("results")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === "results" ? "bg-collegeCyan text-white" : "hover:bg-slate-800"}`}
          >
            <Award size={20} /> Manage Results
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded transition-colors"
          >
            <LogOut size={20} /> Secure Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-10">
        {/* PORTAL SETTINGS TAB */}
        {activeTab === "settings" && (
          <div className="max-w-3xl pb-20">
            <div className="flex items-center gap-3 mb-8">
              <Globe className="text-collegeCyan" size={32} />
              <h1 className="text-3xl font-heading font-bold text-slate-800">
                Public Website Controls
              </h1>
            </div>

            {/* Admissions Pipeline */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <Activity className="text-collegeDark" size={24} />
                <h2 className="text-xl font-bold text-slate-800">
                  Admissions Pipeline Phase
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all flex flex-col ${portalSettings.admissionPhase === "none" ? "border-gray-500 bg-gray-50" : "border-slate-200 hover:border-collegeCyan"}`}
                >
                  <input
                    type="radio"
                    name="phase"
                    value="none"
                    className="sr-only"
                    checked={portalSettings.admissionPhase === "none"}
                    onChange={(e) =>
                      setPortalSettings({
                        ...portalSettings,
                        admissionPhase: e.target.value,
                      })
                    }
                  />
                  <span className="font-bold text-gray-700">
                    None (Inactive)
                  </span>
                </label>
                <label
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all flex flex-col ${portalSettings.admissionPhase === "admission" ? "border-collegeGreen bg-green-50" : "border-slate-200 hover:border-collegeCyan"}`}
                >
                  <input
                    type="radio"
                    name="phase"
                    value="admission"
                    className="sr-only"
                    checked={portalSettings.admissionPhase === "admission"}
                    onChange={(e) =>
                      setPortalSettings({
                        ...portalSettings,
                        admissionPhase: e.target.value,
                      })
                    }
                  />
                  <span className="font-bold text-green-700">
                    Online Applications Open
                  </span>
                </label>
                <label
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all flex flex-col ${portalSettings.admissionPhase === "admitCard" ? "border-collegeCyan bg-cyan-50" : "border-slate-200 hover:border-collegeCyan"}`}
                >
                  <input
                    type="radio"
                    name="phase"
                    value="admitCard"
                    className="sr-only"
                    checked={portalSettings.admissionPhase === "admitCard"}
                    onChange={(e) =>
                      setPortalSettings({
                        ...portalSettings,
                        admissionPhase: e.target.value,
                      })
                    }
                  />
                  <span className="font-bold text-cyan-700">
                    Admit Cards Live
                  </span>
                </label>
                <label
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all flex flex-col ${portalSettings.admissionPhase === "result" ? "border-collegeDark bg-slate-100" : "border-slate-200 hover:border-collegeCyan"}`}
                >
                  <input
                    type="radio"
                    name="phase"
                    value="result"
                    className="sr-only"
                    checked={portalSettings.admissionPhase === "result"}
                    onChange={(e) =>
                      setPortalSettings({
                        ...portalSettings,
                        admissionPhase: e.target.value,
                      })
                    }
                  />
                  <span className="font-bold text-slate-800">
                    Results Announced
                  </span>
                </label>
              </div>
              {portalSettings.admissionPhase !== "none" && (
                <div className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-lg animate-in fade-in duration-300">
                  <h3 className="font-bold text-slate-700 mb-4">
                    Customize Button Text
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Main Title
                      </label>
                      <input
                        type="text"
                        value={portalSettings.actionTitle}
                        onChange={(e) =>
                          setPortalSettings({
                            ...portalSettings,
                            actionTitle: e.target.value,
                          })
                        }
                        className="w-full border p-2 rounded focus:outline-collegeCyan"
                        placeholder="BS ADMISSIONS OPEN"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={portalSettings.actionSubtitle}
                        onChange={(e) =>
                          setPortalSettings({
                            ...portalSettings,
                            actionSubtitle: e.target.value,
                          })
                        }
                        className="w-full border p-2 rounded focus:outline-collegeCyan"
                        placeholder="Apply online for Fall 2026"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Principal's Portrait & Campus Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <Users className="text-collegeDark" size={24} />
                <h2 className="text-xl font-bold text-slate-800">
                  College Profiles & Stats
                </h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-slate-700">
                    Principal's Portrait URL (Cloudinary Link)
                  </label>
                  <input
                    type="url"
                    value={portalSettings.principalImageUrl}
                    onChange={(e) =>
                      setPortalSettings({
                        ...portalSettings,
                        principalImageUrl: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 p-2 rounded focus:outline-collegeCyan"
                    placeholder="https://res.cloudinary.com/..."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Upload a vertical/portrait photo to Cloudinary (e.g., 4:5
                    ratio).
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-slate-700">
                    Currently Enrolled Girls
                  </label>
                  <input
                    type="number"
                    value={portalSettings.enrollmentCount}
                    onChange={(e) =>
                      setPortalSettings({
                        ...portalSettings,
                        enrollmentCount: Number(e.target.value),
                      })
                    }
                    className="w-full md:w-1/3 border border-gray-300 p-2 rounded focus:outline-collegeCyan"
                  />
                </div>
              </div>
            </div>

            {/* Academic Document Links */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <LinkIcon className="text-collegeDark" size={24} />
                <h2 className="text-xl font-bold text-slate-800">
                  Academic Document Links
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Fee Structure: AD (PDF Link)
                  </label>
                  <input
                    type="url"
                    value={portalSettings.feeLinkAD}
                    onChange={(e) =>
                      setPortalSettings({
                        ...portalSettings,
                        feeLinkAD: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded focus:outline-collegeCyan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Fee Structure: BS (PDF Link)
                  </label>
                  <input
                    type="url"
                    value={portalSettings.feeLinkBS}
                    onChange={(e) =>
                      setPortalSettings({
                        ...portalSettings,
                        feeLinkBS: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded focus:outline-collegeCyan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Curriculum: Class 11 Link
                  </label>
                  <input
                    type="url"
                    value={portalSettings.curriculum11}
                    onChange={(e) =>
                      setPortalSettings({
                        ...portalSettings,
                        curriculum11: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded focus:outline-collegeCyan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Curriculum: Class 12 Link
                  </label>
                  <input
                    type="url"
                    value={portalSettings.curriculum12}
                    onChange={(e) =>
                      setPortalSettings({
                        ...portalSettings,
                        curriculum12: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded focus:outline-collegeCyan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Curriculum: ADS (PDF Link)
                  </label>
                  <input
                    type="url"
                    value={portalSettings.curriculumADS}
                    onChange={(e) =>
                      setPortalSettings({
                        ...portalSettings,
                        curriculumADS: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded focus:outline-collegeCyan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Curriculum: BS (PDF Link)
                  </label>
                  <input
                    type="url"
                    value={portalSettings.curriculumBS}
                    onChange={(e) =>
                      setPortalSettings({
                        ...portalSettings,
                        curriculumBS: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded focus:outline-collegeCyan"
                  />
                </div>
              </div>
            </div>

            {/* Custom Popup Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <Bell className="text-collegeDark" size={24} />
                <h2 className="text-xl font-bold text-slate-800">
                  Custom Notification Popup
                </h2>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-slate-700">
                    Enable Custom Alert Popup
                  </h3>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={portalSettings.isPopupActive}
                    onChange={(e) =>
                      setPortalSettings({
                        ...portalSettings,
                        isPopupActive: e.target.checked,
                      })
                    }
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-collegeCyan"></div>
                </label>
              </div>
              {portalSettings.isPopupActive && (
                <div className="space-y-4 animate-in fade-in duration-300 border-t border-slate-100 pt-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Popup Title
                    </label>
                    <input
                      type="text"
                      value={portalSettings.popupTitle}
                      onChange={(e) =>
                        setPortalSettings({
                          ...portalSettings,
                          popupTitle: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded focus:outline-collegeCyan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Popup Message
                    </label>
                    <textarea
                      value={portalSettings.popupContent}
                      onChange={(e) =>
                        setPortalSettings({
                          ...portalSettings,
                          popupContent: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded focus:outline-collegeCyan resize-none"
                      rows="3"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Popup Image URL
                    </label>
                    <input
                      type="url"
                      value={portalSettings.popupImageUrl}
                      onChange={(e) =>
                        setPortalSettings({
                          ...portalSettings,
                          popupImageUrl: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded focus:outline-collegeCyan"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Button / Link Text
                      </label>
                      <input
                        type="text"
                        value={portalSettings.popupLinkText}
                        onChange={(e) =>
                          setPortalSettings({
                            ...portalSettings,
                            popupLinkText: e.target.value,
                          })
                        }
                        className="w-full border p-2 rounded focus:outline-collegeCyan"
                        placeholder="e.g., Download Form"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Clickable URL
                      </label>
                      <input
                        type="url"
                        value={portalSettings.popupLinkUrl}
                        onChange={(e) =>
                          setPortalSettings({
                            ...portalSettings,
                            popupLinkUrl: e.target.value,
                          })
                        }
                        className="w-full border p-2 rounded focus:outline-collegeCyan"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleSaveSettings}
                disabled={isLoading}
                className="bg-collegeCyan text-white font-bold py-3 px-8 rounded shadow-md flex items-center gap-2 hover:bg-cyan-600 transition-colors disabled:opacity-50 text-lg"
              >
                {isLoading ? (
                  "Saving..."
                ) : (
                  <>
                    <Save size={20} /> Update Live Site
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* MANAGE NOTICES TAB */}
        {activeTab === "notices" && (
          <div className="max-w-4xl space-y-8 pb-20">
            <h1 className="text-3xl font-heading font-bold text-slate-800">
              Manage Official Notices
            </h1>
            <div
              className={`p-6 rounded-lg shadow-sm border-l-4 ${editingNoticeId ? "bg-blue-50 border-blue-500" : "bg-white border-collegeGreen"}`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2
                  className={`text-xl font-bold ${editingNoticeId ? "text-blue-700" : "text-collegeDark"}`}
                >
                  {editingNoticeId
                    ? "✏️ Edit Official Notice"
                    : "Post New Official Update"}
                </h2>
                {editingNoticeId && (
                  <button
                    onClick={handleCancelEdit}
                    className="text-sm font-bold text-gray-500 hover:text-red-500"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
              <form onSubmit={handleSubmitNotice} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Notice Title
                    </label>
                    <input
                      required
                      type="text"
                      value={noticeForm.title}
                      onChange={(e) =>
                        setNoticeForm({ ...noticeForm, title: e.target.value })
                      }
                      className="w-full border p-2 rounded focus:outline-collegeCyan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Category
                    </label>
                    <select
                      required
                      value={noticeForm.category}
                      onChange={(e) =>
                        setNoticeForm({
                          ...noticeForm,
                          category: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded bg-white focus:outline-collegeCyan"
                    >
                      <option value="Latest News">Latest News</option>
                      <option value="Events">Events</option>
                      <option value="Announcements">Announcements</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Google Drive / File Link
                  </label>
                  <input
                    required
                    type="url"
                    value={noticeForm.fileUrl}
                    onChange={(e) =>
                      setNoticeForm({ ...noticeForm, fileUrl: e.target.value })
                    }
                    className="w-full border p-2 rounded focus:outline-collegeCyan"
                  />
                </div>
                <button
                  type="submit"
                  className={`${editingNoticeId ? "bg-blue-600 hover:bg-blue-700" : "bg-collegeGreen hover:bg-green-700"} text-white px-6 py-2 rounded font-bold transition-colors shadow-sm`}
                >
                  {editingNoticeId ? "Save Changes" : "Publish Official Notice"}
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-collegeDark mb-4 border-b pb-2">
                Active Notices on Website
              </h2>
              {isFetchingNotices ? (
                <p>Loading...</p>
              ) : (
                <div className="space-y-3">
                  {noticesList.map((notice) => (
                    <div
                      key={notice._id}
                      className="flex flex-col sm:flex-row justify-between p-4 border rounded-md hover:border-collegeCyan bg-slate-50"
                    >
                      <div>
                        <h3 className="font-bold text-slate-800">
                          {notice.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 mt-3 sm:mt-0">
                        <button
                          onClick={() => handleEditClick(notice)}
                          className="text-blue-600 px-3 py-1.5 rounded hover:bg-blue-100 flex items-center gap-1"
                        >
                          <Edit size={16} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteNotice(notice._id)}
                          className="text-red-600 px-3 py-1.5 rounded hover:bg-red-100 flex items-center gap-1"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* MANAGE SLIDER TAB */}
        {activeTab === "slider" && (
          <div className="max-w-4xl space-y-8 pb-20">
            <h1 className="text-3xl font-heading font-bold text-slate-800">
              Manage Hero Slider
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-collegeCyan">
              <h2 className="text-xl font-bold text-collegeDark mb-4">
                Add New Slider Image
              </h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const token = localStorage.getItem("adminToken");
                  const res = await fetch("http://localhost:8080/api/hero", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(newHeroImage),
                  });
                  if (res.ok) {
                    alert("Image added to slider!");
                    setNewHeroImage({ imageUrl: "", caption: "" });
                    fetchHeroImages();
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Cloudinary Image URL
                  </label>
                  <input
                    required
                    type="url"
                    value={newHeroImage.imageUrl}
                    onChange={(e) =>
                      setNewHeroImage({
                        ...newHeroImage,
                        imageUrl: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded focus:outline-collegeCyan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Caption (Optional)
                  </label>
                  <input
                    type="text"
                    value={newHeroImage.caption}
                    onChange={(e) =>
                      setNewHeroImage({
                        ...newHeroImage,
                        caption: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded focus:outline-collegeCyan"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-collegeCyan text-white px-6 py-2 rounded font-bold hover:bg-cyan-600 transition-colors"
                >
                  Add to Slider
                </button>
              </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {heroImages.map((img) => (
                <div
                  key={img._id}
                  className="bg-white rounded-lg shadow border p-4 flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={img.imageUrl}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                    <p className="font-semibold">{img.caption}</p>
                  </div>
                  <button
                    onClick={async () => {
                      if (!window.confirm("Delete this image?")) return;
                      const token = localStorage.getItem("adminToken");
                      await fetch(`http://localhost:8080/api/hero/${img._id}`, {
                        method: "DELETE",
                        headers: { Authorization: `Bearer ${token}` },
                      });
                      fetchHeroImages();
                    }}
                    className="mt-4 bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition-colors"
                  >
                    Delete Image
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MANAGE GALLERY TAB */}
        {activeTab === "gallery" && (
          <div className="max-w-4xl space-y-8 pb-20">
            <h1 className="text-3xl font-heading font-bold text-slate-800">
              Manage Homepage Gallery
            </h1>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-collegeCyan">
              <h2 className="text-xl font-bold text-collegeDark mb-4">
                Add Gallery Image
              </h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const token = localStorage.getItem("adminToken");
                  const res = await fetch("http://localhost:8080/api/gallery", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(newGalleryImage),
                  });
                  if (res.ok) {
                    alert("Image added to gallery!");
                    setNewGalleryImage({
                      title: "",
                      imageUrl: "",
                      category: "",
                      eventDate: "",
                    });
                    fetchGalleryImages();
                  } else {
                    alert("Failed to add image. Check required fields.");
                  }
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Image Title
                    </label>
                    <input
                      type="text"
                      value={newGalleryImage.title}
                      onChange={(e) =>
                        setNewGalleryImage({
                          ...newGalleryImage,
                          title: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded focus:outline-collegeCyan"
                      placeholder="e.g., Sports Festival Winners"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={newGalleryImage.category}
                      onChange={(e) =>
                        setNewGalleryImage({
                          ...newGalleryImage,
                          category: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded focus:outline-collegeCyan"
                      placeholder="e.g., Annual Sports, Seminar, Lab Work..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Cloudinary Image URL
                    </label>
                    <input
                      required
                      type="url"
                      value={newGalleryImage.imageUrl}
                      onChange={(e) =>
                        setNewGalleryImage({
                          ...newGalleryImage,
                          imageUrl: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded focus:outline-collegeCyan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Event Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={newGalleryImage.eventDate}
                      onChange={(e) =>
                        setNewGalleryImage({
                          ...newGalleryImage,
                          eventDate: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded focus:outline-collegeCyan"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-collegeCyan text-white px-6 py-2 rounded font-bold hover:bg-cyan-600 transition-colors"
                >
                  Add to Gallery
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {galleryImages.map((img) => (
                <div
                  key={img._id}
                  className="bg-white rounded-lg shadow border p-4 flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={img.imageUrl}
                      className="w-full h-32 object-cover rounded mb-3"
                      alt={img.title}
                    />
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded mb-2 inline-block">
                      {img.category}
                    </span>
                    <p className="font-semibold text-sm">{img.title}</p>
                  </div>
                  <button
                    onClick={async () => {
                      if (!window.confirm("Delete this image?")) return;
                      const token = localStorage.getItem("adminToken");
                      await fetch(
                        `http://localhost:8080/api/gallery/${img._id}`,
                        {
                          method: "DELETE",
                          headers: { Authorization: `Bearer ${token}` },
                        },
                      );
                      fetchGalleryImages();
                    }}
                    className="mt-4 bg-red-100 text-red-600 px-4 py-2 rounded text-sm hover:bg-red-600 hover:text-white transition-colors"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MANAGE TIMETABLES TAB */}
        {activeTab === "timetable" && (
          <div className="max-w-4xl space-y-8 pb-20">
            <h1 className="text-3xl font-heading font-bold text-slate-800">
              Manage Timetables
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-collegeCyan">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const token = localStorage.getItem("adminToken");
                  const res = await fetch(
                    "http://localhost:8080/api/timetables",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify(newTimetable),
                    },
                  );
                  if (res.ok) {
                    alert("Timetable uploaded!");
                    setNewTimetable({
                      title: "",
                      fileUrl: "",
                      category: "General",
                    });
                    fetchTimetables();
                  }
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Timetable Title
                    </label>
                    <input
                      required
                      type="text"
                      value={newTimetable.title}
                      onChange={(e) =>
                        setNewTimetable({
                          ...newTimetable,
                          title: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded focus:outline-collegeCyan"
                      placeholder="e.g., Fall 2026 CS Dept"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Category
                    </label>
                    <input
                      required
                      type="text"
                      value={newTimetable.category}
                      onChange={(e) =>
                        setNewTimetable({
                          ...newTimetable,
                          category: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded focus:outline-collegeCyan"
                      placeholder="General, Science, Arts..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Google Drive / File Link
                  </label>
                  <input
                    required
                    type="url"
                    value={newTimetable.fileUrl}
                    onChange={(e) =>
                      setNewTimetable({
                        ...newTimetable,
                        fileUrl: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded focus:outline-collegeCyan"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-collegeCyan text-white px-6 py-2 rounded font-bold hover:bg-cyan-600 transition-colors"
                >
                  Publish Timetable
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-collegeDark mb-4 border-b pb-2">
                Active Timetables
              </h2>
              <div className="space-y-3">
                {timetables.map((tt) => (
                  <div
                    key={tt._id}
                    className="flex flex-col sm:flex-row justify-between p-4 border rounded-md hover:border-collegeCyan bg-slate-50"
                  >
                    <div>
                      <h3 className="font-bold text-slate-800">{tt.title}</h3>
                      <span className="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-1 rounded mt-1 inline-block">
                        {tt.category}
                      </span>
                    </div>
                    <div className="flex items-center mt-3 sm:mt-0">
                      <button
                        onClick={async () => {
                          if (!window.confirm("Delete this?")) return;
                          const token = localStorage.getItem("adminToken");
                          await fetch(
                            `http://localhost:8080/api/timetables/${tt._id}`,
                            {
                              method: "DELETE",
                              headers: { Authorization: `Bearer ${token}` },
                            },
                          );
                          fetchTimetables();
                        }}
                        className="text-red-600 px-3 py-1.5 rounded hover:bg-red-100 flex items-center gap-1 transition-colors"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MANAGE DOWNLOADS TAB */}
        {activeTab === "downloads" && (
          <div className="max-w-4xl space-y-8 pb-20">
            <h1 className="text-3xl font-heading font-bold text-slate-800">
              Manage Downloads
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-collegeCyan">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const token = localStorage.getItem("adminToken");
                  const res = await fetch(
                    "http://localhost:8080/api/downloads",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify(newDownload),
                    },
                  );
                  if (res.ok) {
                    alert("Download link published!");
                    setNewDownload({
                      title: "",
                      fileUrl: "",
                      category: "Admission Forms",
                    });
                    fetchDownloads();
                  }
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Document Title
                    </label>
                    <input
                      required
                      type="text"
                      value={newDownload.title}
                      onChange={(e) =>
                        setNewDownload({
                          ...newDownload,
                          title: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded focus:outline-collegeCyan"
                      placeholder="e.g., BSc Part 1 Form"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Category (Strict)
                    </label>
                    <select
                      required
                      value={newDownload.category}
                      onChange={(e) =>
                        setNewDownload({
                          ...newDownload,
                          category: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded bg-white focus:outline-collegeCyan"
                    >
                      <option value="Admission Forms">Admission Forms</option>
                      <option value="Challan Forms">Challan Forms</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Google Drive / File Link
                  </label>
                  <input
                    required
                    type="url"
                    value={newDownload.fileUrl}
                    onChange={(e) =>
                      setNewDownload({
                        ...newDownload,
                        fileUrl: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded focus:outline-collegeCyan"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-collegeCyan text-white px-6 py-2 rounded font-bold hover:bg-cyan-600 transition-colors"
                >
                  Publish Download
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-collegeDark mb-4 border-b pb-2">
                Active Downloads
              </h2>
              <div className="space-y-3">
                {downloadsList.map((doc) => (
                  <div
                    key={doc._id}
                    className="flex flex-col sm:flex-row justify-between p-4 border rounded-md hover:border-collegeCyan bg-slate-50"
                  >
                    <div>
                      <h3 className="font-bold text-slate-800">{doc.title}</h3>
                      <span className="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-1 rounded mt-1 inline-block">
                        {doc.category}
                      </span>
                    </div>
                    <div className="flex items-center mt-3 sm:mt-0">
                      <button
                        onClick={async () => {
                          if (!window.confirm("Delete this document?")) return;
                          const token = localStorage.getItem("adminToken");
                          await fetch(
                            `http://localhost:8080/api/downloads/${doc._id}`,
                            {
                              method: "DELETE",
                              headers: { Authorization: `Bearer ${token}` },
                            },
                          );
                          fetchDownloads();
                        }}
                        className="text-red-600 px-3 py-1.5 rounded hover:bg-red-100 flex items-center gap-1 transition-colors"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 🌟 NEW: MANAGE FACULTY TAB 🌟 */}
        {activeTab === "faculty" && (
          <div className="max-w-4xl space-y-8 pb-20">
            <h1 className="text-3xl font-heading font-bold text-slate-800">
              Manage Teaching Faculty
            </h1>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-collegeCyan">
              <h2 className="text-xl font-bold text-collegeDark mb-4">
                Add New Faculty Member
              </h2>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const token = localStorage.getItem("adminToken");
                  const res = await fetch("http://localhost:8080/api/faculty", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(newFaculty),
                  });
                  if (res.ok) {
                    alert("Faculty member added successfully!");
                    setNewFaculty({
                      name: "",
                      designation: "",
                      subject: "",
                      qualification: "",
                      photoUrl: "",
                    });
                    fetchFaculty();
                  } else {
                    alert("Failed to add faculty. Check required fields.");
                  }
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      value={newFaculty.name}
                      onChange={(e) =>
                        setNewFaculty({ ...newFaculty, name: e.target.value })
                      }
                      className="w-full border p-2 rounded focus:outline-collegeCyan"
                      placeholder="e.g., Prof. Sarah"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Designation
                    </label>
                    <input
                      required
                      type="text"
                      value={newFaculty.designation}
                      onChange={(e) =>
                        setNewFaculty({
                          ...newFaculty,
                          designation: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded focus:outline-collegeCyan"
                      placeholder="e.g., Assistant Professor, Lecturer, Lab Assistant"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Subject / Department
                    </label>
                    <input
                      required
                      type="text"
                      value={newFaculty.subject}
                      onChange={(e) =>
                        setNewFaculty({
                          ...newFaculty,
                          subject: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded focus:outline-collegeCyan"
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Qualification
                    </label>
                    <input
                      required
                      type="text"
                      value={newFaculty.qualification}
                      onChange={(e) =>
                        setNewFaculty({
                          ...newFaculty,
                          qualification: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded focus:outline-collegeCyan"
                      placeholder="e.g., Ph.D, M.Phil, BS-IT"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Profile Picture URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={newFaculty.photoUrl}
                    onChange={(e) =>
                      setNewFaculty({ ...newFaculty, photoUrl: e.target.value })
                    }
                    className="w-full border p-2 rounded focus:outline-collegeCyan"
                    placeholder="https://res.cloudinary.com/..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to use the default silhouette icon.
                  </p>
                </div>

                <button
                  type="submit"
                  className="bg-collegeCyan text-white px-6 py-2 rounded font-bold hover:bg-cyan-600 transition-colors"
                >
                  Add Faculty Member
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-collegeDark mb-4 border-b pb-2">
                Active Faculty Directory
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                {facultyList.map((member) => (
                  <div
                    key={member._id}
                    className="bg-slate-50 rounded-lg shadow-sm border p-4 flex flex-col items-center text-center"
                  >
                    <img
                      src={
                        member.photoUrl ||
                        "https://placehold.co/150x150/e2e8f0/475569?text=No+Photo"
                      }
                      className="w-20 h-20 object-cover rounded-full mb-3 border-2 border-collegeCyan"
                      alt={member.name}
                    />

                    <h3 className="font-bold text-collegeDark">
                      {member.name}
                    </h3>
                    <span className="text-xs font-bold text-collegeGreen uppercase mt-1">
                      {member.designation}
                    </span>
                    <p className="text-sm text-gray-600 mt-2 font-medium">
                      {member.subject}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {member.qualification}
                    </p>

                    <button
                      onClick={async () => {
                        if (
                          !window.confirm(
                            `Are you sure you want to remove ${member.name}?`,
                          )
                        )
                          return;
                        const token = localStorage.getItem("adminToken");
                        await fetch(
                          `http://localhost:8080/api/faculty/${member._id}`,
                          {
                            method: "DELETE",
                            headers: { Authorization: `Bearer ${token}` },
                          },
                        );
                        fetchFaculty();
                      }}
                      className="mt-4 bg-red-100 text-red-600 px-4 py-2 w-full rounded text-sm hover:bg-red-600 hover:text-white transition-colors font-semibold"
                    >
                      Remove Member
                    </button>
                  </div>
                ))}

                {facultyList.length === 0 && (
                  <p className="text-gray-500 col-span-full text-center py-8">
                    No faculty members found. Add one above!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 🌟 ATTACHED COMPONENT */}
        {activeTab === "admissionsPage" && <ManageAdmissionsPage />}

        {activeTab === "admitCards" && <ManageAdmitCards />}

        {/* 🌟 ATTACHED RESULTS COMPONENT */}
        {activeTab === "results" && <ManageResults />}
      </main>
    </div>
  );
};

export default AdminDashboard;
