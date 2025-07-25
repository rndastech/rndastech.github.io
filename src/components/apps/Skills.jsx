"use client"

import { useState } from "react"
import { Code2, Globe, Database, Brain, Wrench, BookOpen, Award, ChevronRight } from "lucide-react"

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0)

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code2,
      color: "from-blue-500 to-purple-600",
      skills: [
        { name: "C++", icon: "🔷" },
        { name: "C", icon: "⚡" },
        { name: "Java", icon: "☕" },
        { name: "Python", icon: "🐍" },
        { name: "JavaScript", icon: "💛" },
      ],
    },
    {
      title: "Web Development",
      icon: Globe,
      color: "from-green-500 to-teal-600",
      skills: [
        { name: "ReactJS", icon: "⚛️" },
        { name: "HTML", icon: "🌐" },
        { name: "CSS", icon: "🎨" },
        { name: "Django", icon: "🎯" },
        { name: "Flask", icon: "🍶" },
        { name: "FastAPI", icon: "⚡" },
        { name: "Tailwind CSS", icon: "💨" },
      ],
    },
    {
      title: "Cloud & Databases",
      icon: Database,
      color: "from-orange-500 to-red-600",
      skills: [
        { name: "MySQL", icon: "🔵" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "SQLite", icon: "💎" },
        { name: "MongoDB", icon: "🍃" },
        { name: "Neo4j", icon: "🔗" },
        { name: "AWS S3", icon: "☁️" },
        { name: "Cloudflare", icon: "🛡️" },
      ],
    },
    {
      title: "Machine Learning & AI",
      icon: Brain,
      color: "from-purple-500 to-pink-600",
      skills: [
        { name: "TensorFlow", icon: "🧠" },
        { name: "Keras", icon: "🧪" },
        { name: "Scikit-Learn", icon: "📊" },
        { name: "Hugging Face", icon: "🤗" },
        { name: "NumPy", icon: "🔢" },
        { name: "Pandas", icon: "🐼" },
        { name: "SciPy", icon: "📐" },
        { name: "Matplotlib", icon: "📈" },
        { name: "Seaborn", icon: "🌊" },
        { name: "OpenCV", icon: "👁️" },
      ],
    },
    {
      title: "Developer Tools",
      icon: Wrench,
      color: "from-indigo-500 to-blue-600",
      skills: [
        { name: "Git", icon: "📝" },
        { name: "GitHub", icon: "🐙" },
        { name: "VS Code", icon: "💻" },
        { name: "Figma", icon: "🎨" },
      ],
    },
  ]

  const coursework = [
    { name: "Data Structures & Algorithms", icon: "🏗️" },
    { name: "Operating Systems", icon: "💾" },
    { name: "Database Management Systems", icon: "🗄️" },
    { name: "Object Oriented Programming", icon: "🎯" },
    { name: "Computer Networks", icon: "🌐" },
  ]

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
            <Wrench className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Skills & Technologies</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            My technical expertise across various domains of software development
          </p>
        </div>

        {/* Skills Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Programming Expert</h3>
            <p className="text-gray-600">Proficient in multiple programming languages with strong foundation in DSA</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Full-Stack Developer</h3>
            <p className="text-gray-600">Experience with modern web frameworks, databases, and cloud services</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">ML & AI Enthusiast</h3>
            <p className="text-gray-600">Hands-on experience with machine learning frameworks and data science tools</p>
          </div>
        </div>

        {/* Skills Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technical Skills</h2>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.title}
                  onClick={() => setActiveCategory(index)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    activeCategory === index
                      ? "bg-gradient-to-r " + category.color + " text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="font-medium text-sm">{category.title}</span>
                </button>
              )
            })}
          </div>

          {/* Active Category Skills */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              {(() => {
                const IconComponent = skillCategories[activeCategory].icon
                return <IconComponent className="w-6 h-6 text-gray-700" />
              })()}
              <h3 className="text-2xl font-bold text-gray-900">{skillCategories[activeCategory].title}</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="group bg-gray-50 rounded-xl p-4 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 transition-all duration-300 hover:shadow-md cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    <div className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{skill.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coursework and Certifications */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Coursework */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-gray-700" />
              <h3 className="text-2xl font-bold text-gray-900">Relevant Coursework</h3>
            </div>

            <div className="space-y-3">
              {coursework.map((course, index) => (
                <div
                  key={course.name}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group cursor-pointer"
                >
                  <div className="text-xl">{course.icon}</div>
                  <span className="font-medium text-gray-700 group-hover:text-gray-900">{course.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-gray-600 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-gray-700" />
              <h3 className="text-2xl font-bold text-gray-900">Certifications</h3>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🚀</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Machine Learning Specialization</h4>
                  <p className="text-gray-600 text-sm">Stanford Online by Andrew Ng</p>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills
