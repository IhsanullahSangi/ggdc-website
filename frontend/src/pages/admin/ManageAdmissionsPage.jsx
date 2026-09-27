import { useState, useEffect } from "react";
import { Save, LayoutTemplate } from "lucide-react";

const ManageAdmissionsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageData, setPageData] = useState({
    admissionHeading: "",
    admissionSubheading: "",
    formAvailableDate: "",
    lastDateToApply: "",
    preEntryTestDate: "",
    eligibilityCriteria: "",
    requiredDocuments: "",
    googleFormLink: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await fetch("http://localhost:8080/api/settings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setPageData({
            admissionHeading: data.admissionHeading || "",
            admissionSubheading: data.admissionSubheading || "",
            formAvailableDate: data.formAvailableDate || "",
            lastDateToApply: data.lastDateToApply || "",
            preEntryTestDate: data.preEntryTestDate || "",
            eligibilityCriteria: data.eligibilityCriteria || "",
            requiredDocuments: data.requiredDocuments || "",
            googleFormLink: data.googleFormLink || "",
          });
        }
      } catch (error) {
        console.error("Failed to load admissions page settings");
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
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
          body: JSON.stringify(pageData),
        },
      );
      if (response.ok) alert("Admissions Page updated successfully!");
    } catch (error) {
      alert("Failed to update page.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8 pb-20">
      <div className="flex items-center gap-3 mb-8">
        <LayoutTemplate className="text-collegeCyan" size={32} />
        <h1 className="text-3xl font-heading font-bold text-slate-800">
          Edit Admissions Page
        </h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Headers */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-collegeDark mb-4">
            Page Headers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Main Heading
              </label>
              <input
                type="text"
                value={pageData.admissionHeading}
                onChange={(e) =>
                  setPageData({ ...pageData, admissionHeading: e.target.value })
                }
                className="w-full border p-2 rounded focus:outline-collegeCyan"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Subheading
              </label>
              <input
                type="text"
                value={pageData.admissionSubheading}
                onChange={(e) =>
                  setPageData({
                    ...pageData,
                    admissionSubheading: e.target.value,
                  })
                }
                className="w-full border p-2 rounded focus:outline-collegeCyan"
              />
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-collegeDark mb-4">
            Important Dates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Forms Available
              </label>
              <input
                type="text"
                value={pageData.formAvailableDate}
                onChange={(e) =>
                  setPageData({
                    ...pageData,
                    formAvailableDate: e.target.value,
                  })
                }
                className="w-full border p-2 rounded focus:outline-collegeCyan"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Last Date
              </label>
              <input
                type="text"
                value={pageData.lastDateToApply}
                onChange={(e) =>
                  setPageData({ ...pageData, lastDateToApply: e.target.value })
                }
                className="w-full border p-2 rounded focus:outline-collegeCyan"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Entry Test
              </label>
              <input
                type="text"
                value={pageData.preEntryTestDate}
                onChange={(e) =>
                  setPageData({ ...pageData, preEntryTestDate: e.target.value })
                }
                className="w-full border p-2 rounded focus:outline-collegeCyan"
              />
            </div>
          </div>
        </div>

        {/* Bullet Points */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-collegeDark mb-4">
            Bullet Points (Put each item on a new line)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Eligibility Criteria
              </label>
              <textarea
                rows="5"
                value={pageData.eligibilityCriteria}
                onChange={(e) =>
                  setPageData({
                    ...pageData,
                    eligibilityCriteria: e.target.value,
                  })
                }
                className="w-full border p-2 rounded focus:outline-collegeCyan resize-none"
                placeholder="Item 1&#10;Item 2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Required Documents
              </label>
              <textarea
                rows="5"
                value={pageData.requiredDocuments}
                onChange={(e) =>
                  setPageData({
                    ...pageData,
                    requiredDocuments: e.target.value,
                  })
                }
                className="w-full border p-2 rounded focus:outline-collegeCyan resize-none"
                placeholder="Doc 1&#10;Doc 2"
              />
            </div>
          </div>
        </div>

        {/* Form Link */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-collegeDark mb-4">
            Google Form Embed Link
          </h2>
          <label className="block text-sm font-semibold mb-1">
            Iframe src URL
          </label>
          <input
            type="url"
            value={pageData.googleFormLink}
            onChange={(e) =>
              setPageData({ ...pageData, googleFormLink: e.target.value })
            }
            className="w-full border p-2 rounded focus:outline-collegeCyan"
            placeholder="https://docs.google.com/forms/..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-collegeCyan text-white font-bold py-3 px-8 rounded shadow-md flex items-center gap-2 hover:bg-cyan-600 transition-colors"
        >
          <Save size={20} /> {isLoading ? "Saving..." : "Update Live Page"}
        </button>
      </form>
    </div>
  );
};

export default ManageAdmissionsPage;
