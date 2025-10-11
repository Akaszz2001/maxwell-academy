import { motion } from "framer-motion";
import { BookOpen, Users, Target, Heart } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-12 px-6 md:px-16">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
          About Maxwell Academy
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Empowering students with knowledge, skills, and values since 2014.
        </p>
      </motion.div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100"
      >
        <p className="text-gray-700 leading-relaxed text-lg mb-6">
          Founded in <strong>2014</strong>, <strong>Maxwell Academy</strong> has been dedicated to shaping
          young minds with a perfect balance of academics, creativity, and overall personality development.
          We provide high-quality tuition classes for students from <strong>Class 7 to 12</strong> in
          <strong> Mathematics, Physics, Chemistry, and Biology</strong>, ensuring a strong foundation in core subjects.
        </p>

        <p className="text-gray-700 leading-relaxed text-lg mb-6">
          Along with school-level coaching, we specialize in <strong>Entrance Exam preparation</strong> for
          <strong> JEE, NEET, KEAM, CUSAT,</strong> and <strong>ICAR</strong>, guiding students towards success in
          competitive examinations.
        </p>

        <p className="text-gray-700 leading-relaxed text-lg mb-6">
          Our strength lies in our team of highly qualified and passionate faculty members, comprising
          <strong> M.Tech, B.Tech,</strong> and <strong>Postgraduate professionals</strong>, who bring expertise,
          dedication, and innovative teaching methods to every classroom session.
        </p>

        <p className="text-gray-700 leading-relaxed text-lg mb-6">
          At Maxwell Academy, we believe that education is not limited to textbooks. We actively encourage
          <strong> sports and arts</strong>, providing students with opportunities to explore their talents,
          stay active, and build confidence beyond academics.
        </p>

        <p className="text-gray-700 leading-relaxed text-lg">
          With over a decade of experience, we continue to strive toward our mission:
          <strong> empowering students with knowledge, skills, and values to achieve excellence in academics and life.</strong>
        </p>
      </motion.div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-6xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center text-center border border-gray-100"
        >
          <BookOpen className="text-blue-600 w-10 h-10 mb-3" />
          <h3 className="font-semibold text-lg text-gray-800">Quality Education</h3>
          <p className="text-gray-600 text-sm mt-2">
            Focused on strong academic foundations and conceptual clarity.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center text-center border border-gray-100"
        >
          <Users className="text-blue-600 w-10 h-10 mb-3" />
          <h3 className="font-semibold text-lg text-gray-800">Expert Faculty</h3>
          <p className="text-gray-600 text-sm mt-2">
            Experienced educators with M.Tech, B.Tech, and Postgraduate degrees.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center text-center border border-gray-100"
        >
          <Target className="text-blue-600 w-10 h-10 mb-3" />
          <h3 className="font-semibold text-lg text-gray-800">Exam Excellence</h3>
          <p className="text-gray-600 text-sm mt-2">
            Coaching for JEE, NEET, KEAM, CUSAT, ICAR, and more.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center text-center border border-gray-100"
        >
          <Heart className="text-blue-600 w-10 h-10 mb-3" />
          <h3 className="font-semibold text-lg text-gray-800">Beyond Academics</h3>
          <p className="text-gray-600 text-sm mt-2">
            Encouraging sports and arts to nurture holistic development.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
