import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";

const ContactUs = () => {
  const [activeTab, setActiveTab] = useState("contact"); // 'contact', 'feedback', 'grievance'

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🌟 STATIC FIX: Format the form data to open in the user's default email client
    const emailTo = "girlsdegreecollegeghotki@gmail.com";

    // Pre-fill the subject line based on the active tab
    const emailSubject =
      activeTab === "contact"
        ? `Website Inquiry: ${formData.subject || "General Contact"}`
        : activeTab === "feedback"
          ? `Website Feedback from ${formData.name}`
          : `CONFIDENTIAL Grievance from ${formData.name}`;

    // Structure the body of the email
    const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
${activeTab === "contact" ? `Phone: ${formData.phone}\n` : ""}

Message:
${formData.message}
    `;

    // Trigger the mailto link
    window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Clear the form after triggering
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <main className="font-body w-full min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-collegeDark py-10 md:py-14 text-center border-b-4 border-collegeCyan">
        <h1 className="text-2xl md:text-4xl font-heading font-bold text-white uppercase tracking-wider">
          Contact & Support
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-collegeDark uppercase tracking-wide">
            We're Here to Help
          </h2>
          <div className="w-24 h-1 bg-collegeGreen mx-auto mt-4 mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you have a question, feedback, or a formal grievance, please
            select the appropriate category below to reach out to our
            administration.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* LEFT COLUMN / MOBILE TOP: Tabbed Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-lg shadow-md border-t-4 border-collegeCyan h-full flex flex-col">
            {/* Sleek Inner Tab Selector */}
            <div className="flex flex-wrap gap-1 p-1 mb-8 bg-slate-100 rounded-lg w-fit border border-slate-200 shrink-0">
              <button
                onClick={() => handleTabChange("contact")}
                className={`px-4 py-2 rounded-md font-bold text-sm transition-all ${activeTab === "contact" ? "bg-white text-collegeDark shadow-sm" : "text-gray-500 hover:text-collegeDark"}`}
              >
                Contact
              </button>
              <button
                onClick={() => handleTabChange("feedback")}
                className={`px-4 py-2 rounded-md font-bold text-sm transition-all ${activeTab === "feedback" ? "bg-white text-collegeDark shadow-sm" : "text-gray-500 hover:text-collegeDark"}`}
              >
                Feedback
              </button>
              <button
                onClick={() => handleTabChange("grievance")}
                className={`px-4 py-2 rounded-md font-bold text-sm transition-all ${activeTab === "grievance" ? "bg-white text-collegeDark shadow-sm" : "text-gray-500 hover:text-collegeDark"}`}
              >
                Grievance
              </button>
            </div>

            {/* Dynamic Headers */}
            <div className="mb-8 shrink-0">
              {activeTab === "contact" && (
                <h3 className="text-2xl font-heading font-bold text-collegeDark">
                  Send us a Message
                </h3>
              )}
              {activeTab === "feedback" && (
                <>
                  <h3 className="text-2xl font-heading font-bold text-collegeDark mb-1">
                    Share Your Feedback
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Help us improve by sharing your thoughts and suggestions.
                  </p>
                </>
              )}
              {activeTab === "grievance" && (
                <>
                  <h3 className="text-2xl font-heading font-bold text-collegeDark mb-1">
                    Submit a Grievance
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Report issues or concerns. Your grievance will be reviewed
                    by the administration.
                  </p>
                </>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 flex flex-col flex-1"
            >
              <div className="space-y-6 flex-1">
                {/* Name Field (Always visible & required) */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-collegeCyan focus:border-transparent transition-all bg-slate-50 focus:bg-white text-gray-800"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Grid for Email & Phone */}
                <div
                  className={`grid grid-cols-1 ${activeTab === "contact" ? "md:grid-cols-2" : ""} gap-6`}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-collegeCyan focus:border-transparent transition-all bg-slate-50 focus:bg-white text-gray-800"
                      placeholder="Enter your email"
                    />
                  </div>

                  {activeTab === "contact" && (
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-collegeCyan focus:border-transparent transition-all bg-slate-50 focus:bg-white text-gray-800"
                        placeholder="03XX XXXXXXX"
                      />
                    </div>
                  )}
                </div>

                {/* Subject Field */}
                {activeTab === "contact" && (
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-collegeCyan focus:border-transparent transition-all bg-slate-50 focus:bg-white text-gray-800"
                      placeholder="What is this regarding?"
                    />
                  </div>
                )}

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-collegeCyan focus:border-transparent transition-all bg-slate-50 focus:bg-white text-gray-800 resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-collegeCyan text-white font-bold text-lg py-3 rounded flex items-center justify-center gap-2 hover:bg-collegeDark transition-colors shadow-md hover:shadow-lg mt-auto"
              >
                {activeTab === "contact" && "Open in Email to Send"}
                {activeTab === "feedback" && "Open in Email to Submit"}
                {activeTab === "grievance" && "Open in Email to Submit"}
                <Send size={20} />
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN / MOBILE BOTTOM: Contact Details & Map */}
          <div className="flex flex-col h-full gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-collegeDark shrink-0">
              <h3 className="text-xl font-heading font-bold text-collegeDark mb-6">
                College Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#f0f8fb] p-3 rounded-full text-collegeCyan">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Campus Address</h4>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                      Government Girls Degree College,
                      <br />
                      Ghotki, Sindh, Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#f0f8fb] p-3 rounded-full text-collegeCyan">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Phone Number</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      +92 (0723) XXXXXXX
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#f0f8fb] p-3 rounded-full text-collegeCyan">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Email Address</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      girlsdegreecollegeghotki@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-2 rounded-lg shadow-md flex-1 min-h-[300px]">
              <iframe
                title="College Location"
                className="w-full h-full rounded border-0"
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Government%20Girls%20Degree%20College,%20Ghotki+(Government%20Girls%20Degree%20College)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactUs;
