import React from 'react';

function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white p-6">
        <h1 className="text-4xl font-bold text-center">Welcome to ExamTime</h1>
        <p className="text-lg text-center mt-2">Your ultimate exam preparation platform</p>
      </header>

      <main className="p-10">
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-blue-600 mb-4">Features</h2>
          <ul className="space-y-4">
            <li className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-2xl font-bold text-gray-800">Create and Organize Notes</h3>
              <p className="text-gray-600 mt-2">Easily create, edit, and organize your notes for different subjects and topics.</p>
            </li>
            <li className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-2xl font-bold text-gray-800">Download Notes as PDF</h3>
              <p className="text-gray-600 mt-2">Download your notes in PDF format to study offline or share with friends.</p>
            </li>
            <li className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-2xl font-bold text-gray-800">Collaborate with Peers</h3>
              <p className="text-gray-600 mt-2">Share your notes and collaborate with your classmates for better preparation.</p>
            </li>
            <li className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-2xl font-bold text-gray-800">Track Your Progress</h3>
              <p className="text-gray-600 mt-2">Keep track of your study progress and be well-prepared for exams.</p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-blue-600 mb-4">Why Choose ExamTime?</h2>
          <p className="text-gray-700">
            ExamTime is designed to make exam preparation easier and more efficient. Whether you're studying alone or with friends,
            ExamTime provides the tools you need to organize your notes, track your progress, and succeed in your exams.
          </p>
        </section>
      </main>

      <footer className="bg-blue-600 text-white p-6 text-center">
        <p>&copy; 2024 ExamTime. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
