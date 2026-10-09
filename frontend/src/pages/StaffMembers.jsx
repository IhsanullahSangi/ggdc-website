import { UserCircle, BookOpen, GraduationCap } from "lucide-react";

// 🌟 STATIC DATA: Faculty members sorted and standardized for UI consistency
const mockStaff = [
  {
    _id: "1",
    name: "Mir Hassan Waseer",
    designation: "Principal & Associate Professor",
    subject: "Chemistry",
    qualification: "M.Sc. Chemistry, M.A. English",
    photoUrl: "",
  },
 {
    _id: "2",
    name: "Rafique Ahmed Kalwar",
    designation: "Associate Professor",
    subject: "English",
    qualification: "M.Phil. English",
    photoUrl: "",
  },
  {
    _id: "3",
    name: "Muhammad Ali Daudpoto",
    designation: "Associate Professor",
    subject: "Botany",
    qualification: "M.Sc. Botany",
    photoUrl: "",
  },
 {
    _id: "4",
    name: "Muhammad Kamil Mahar",
    designation: "Assistant Professor",
    subject: "Chemistry",
    qualification: "M.Sc. Chemistry",
    photoUrl: "",
  },
   {
    _id: "5",
    name: "Imtiaz Ahmed Dayo",
    designation: "Assistant Professor",
    subject: "Islamic Studies",
    qualification: "M.A. Islamic Culture",
    photoUrl: "",
  },
  {
    _id: "6",
    name: "Saeed Ahmed Shah",
    designation: "Assistant Professor",
    subject: "Botany",
    qualification: "B.A., M.Sc. (Hons)",
    photoUrl: "",
  },
  {
    _id: "7",
    name: "Sajida Parveen Shaikh",
    designation: "Assistant Professor",
    subject: "Islamic Studies",
    qualification: "M.A. Islamic Culture, Shahadat-ul-Almia",
    photoUrl: "",
  },
 {
    _id: "8",
    name: "Tahira Dayo",
    designation: "Assistant Professor",
    subject: "Sindhi",
    qualification: "M.A. Sindhi Literature",
    photoUrl: "",
  },
 {
    _id: "9",
    name: "Nargis Mughal",
    designation: "Assistant Professor",
    subject: "Mathematics",
    qualification: "BS Mathematics, B.Ed.",
    photoUrl: "",
  },
  {
    _id: "10",
    name: "Muhammad Sanwal Ghoto",
    designation: "Assistant Professor",
    subject: "Zoology",
    qualification: "M.Sc. Zoology",
    photoUrl: "",
  },
  {
    _id: "11",
    name: "Vijesh Kumar",
    designation: "Assistant Professor",
    subject: "English",
    qualification: "M.A. English",
    photoUrl: "",
  },
  {
    _id: "12",
    name: "Zulfiqar Ali Chachar",
    designation: "Assistant Professor",
    subject: "English",
    qualification: "M.A. English, B.Ed.",
    photoUrl: "",
  },
 {
    _id: "13",
    name: "Quratulain Umed Ali Chachar",
    designation: "Assistant Professor",
    subject: "English",
    qualification: "M.A., LL.B.",
    photoUrl: "",
  },
  {
    _id: "14",
    name: "Abdullah Mahar",
    designation: "Senior Director Physical Education",
    subject: "Physical Education",
    qualification: "M.H.P.Ed.",
    photoUrl: "",
  },
    {
    _id: "15",
    name: "Kalsoom Mahar",
    designation: "Lecturer",
    subject: "Commerce",
    qualification: "MBA, M.Phil.",
    photoUrl: "",
  },
  {
    _id: "16",
    name: "Mehar Raheela",
    designation: "Lecturer",
    subject: "Political Science",
    qualification: "M.A., B.Ed.",
    photoUrl: "",
  },
  {
    _id: "17",
    name: "Erum Wahid Bhutto",
    designation: "Lecturer",
    subject: "Commerce",
    qualification: "BBA (Hons)",
    photoUrl: "",
  },
  {
    _id: "18",
    name: "Rani",
    designation: "Lecturer",
    subject: "Botany",
    qualification: "M.Sc. Botany",
    photoUrl: "",
  },
   {
    _id: "19",
    name: "Azran Hussain",
    designation: "Lecturer",
    subject: "Islamic Studies",
    qualification: "M.A. Islamic Studies & Culture, English, M.Ed.",
    photoUrl: "",
  },
  {
    _id: "20",
    name: "Imran Ali",
    designation: "Lecturer",
    subject: "Physics",
    qualification: "BS Physics",
    photoUrl: "",
  },
    {
    _id: "21",
    name: "Abida Parveen Siyal",
    designation: "Lecturer",
    subject: "Sindhi",
    qualification: "M.A. Sindhi",
    photoUrl: "",
  },
  {
    _id: "22",
    name: "Fazal-ur-Rehman",
    designation: "Lecturer",
    subject: "Computer Science",
    qualification: "BSCS",
    photoUrl: "",
  },
   {
    _id: "23",
    name: "Ihsanullah",
    designation: "Lecturer",
    subject: "Computer Science",
    qualification: "BSIT",
    photoUrl: "",
  },
  {
    _id: "24",
    name: "Shazia",
    designation: "Lecturer",
    subject: "Sociology",
    qualification: "M.A. Sociology, B.Ed.",
    photoUrl: "",
  },
  {
    _id: "25",
    name: "Moula Bux Kalhoro",
    designation: "Lecturer",
    subject: "Pakistan Studies",
    qualification: "M.A. Pakistan Studies",
    photoUrl: "",
  },
  {
    _id: "26",
    name: "Farhana Hafeez",
    designation: "Lecturer",
    subject: "Zoology",
    qualification: "M.Sc. Zoology",
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
                  <BookOpen size={16} className="text-collegeDark shrink-0" />
                  <span className="font-medium">{member.subject}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <GraduationCap size={14} className="text-gray-400 shrink-0" />
                  <span className="leading-snug">{member.qualification}</span>
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
