import { UserCircle, BookOpen, GraduationCap } from "lucide-react";

// 🌟 STATIC DATA: Add your actual faculty members here
const mockStaff = [
  {
    _id: "1",
    name: "Dr. Ayesha Siddiqa",
    designation: "Assistant Professor",
    subject: "Botany",
    qualification: "Ph.D. in Botany",
    photoUrl: "",
  },
  {
    _id: "2",
    name: "Ms. Fatima Baloch",
    designation: "Lecturer",
    subject: "Computer Science",
    qualification: "MS Computer Science",
    photoUrl: "",
  },
];

const StaffMembers = () => {
  return (
    <main className="font-body w-full min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-collegeDark py-10 md:py-14 text-center border-b-4 border-collegeCyan">
        <h1 className="text-2xl md:text-4xl font-heading font-bold text-white uppercase tracking-wider">
          Faculty & Staff
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-collegeDark uppercase tracking-wide">
            Our Teaching Faculty
          </h2>
          <div className="w-24 h-1 bg-collegeGreen mx-auto mt-4 mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dedicated professionals committed to delivering quality education
            and empowering the students of Government Girls Degree College
            Ghotki.
          </p>
        </div>

        {/* Staff Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockStaff.map((member) => (
            <div
              key={member._id}
              className="bg-white p-6 rounded-lg shadow-md border-t-4 border-collegeDark hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* CONDITIONAL AVATAR: Image if exists, Icon if empty */}
              {member.photoUrl ? (
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="w-20 h-20 object-cover rounded-full mb-4 border-2 border-collegeCyan shadow-sm"
                />
              ) : (
                <div className="w-20 h-20 bg-[#f0f8fb] rounded-full flex items-center justify-center mb-4 text-collegeCyan shadow-sm">
                  <UserCircle className="w-12 h-12" />
                </div>
              )}

              {/* Name */}
              <h3 className="text-lg font-heading font-bold text-collegeDark mb-1">
                {member.name}
              </h3>

              {/* Designation */}
              <span className="text-xs font-bold text-collegeGreen uppercase tracking-wider mb-4 block">
                {member.designation}
              </span>

              {/* Department & Qualification Details */}
              <div className="w-full bg-slate-50 p-3 rounded border border-gray-100 mt-auto">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-700 mb-2">
                  <BookOpen size={16} className="text-collegeDark" />
                  <span className="font-medium">{member.subject}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <GraduationCap size={14} className="text-gray-400" />
                  <span>{member.qualification}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Show message if database is empty */}
          {mockStaff.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10">
              <p>
                No faculty records found. Please add them directly in the code.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default StaffMembers;
