import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-8">Discover ExamTime</h1>
      <p className="text-lg mb-6">
        Welcome to ExamTime, your one-stop platform for all your study material
        needs. We understand the challenges students face in accessing quality
        study resources, and we are here to help bridge that gap. Our mission is
        to create a collaborative learning environment where students can share
        and find the materials they need to succeed.
      </p>

      <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
      <ul className="list-disc list-inside mb-6">
        <li className="mb-2">
          <strong>Upload Study Materials:</strong> Share your notes, past exam
          papers, and other study resources with fellow students. Help others by
          contributing to our growing repository of educational content.
        </li>
        <li className="mb-2">
          <strong>Request Documents:</strong> Can't find what you're looking
          for? Submit a request for specific study materials and let the
          community help you out. Our network of students and educators is here
          to support you.
        </li>
        <li className="mb-2">
          <strong>Collaborative Learning:</strong> Join study groups,
          participate in discussion forums, and collaborate with peers to
          enhance your learning experience. ExamTime is designed to foster a
          supportive and interactive learning community.
        </li>
        <li className="mb-2">
          <strong>Resource Library:</strong> Access a wide range of study
          materials across various subjects and levels. From high school to
          university, ExamTime has something for everyone.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
      <p className="text-lg mb-6">
        We envision a world where every student has access to the resources they
        need to excel academically. ExamTime is dedicated to providing a free
        and open platform where knowledge can be shared and students can thrive.
        Join us in our mission to make education accessible for all.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
      <p className="text-lg mb-6">
        ExamTime is powered by the contributions of students like you. Whether
        you're uploading materials, responding to document requests, or
        participating in discussions, your involvement makes a difference. Sign
        up today and be a part of the ExamTime community!
      </p>

      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <p className="text-lg">
        If you have any questions or feedback, please feel free to{" "}
        <a href="/contact" className="text-blue-500 underline">
          contact us
        </a>
        . We're here to help and would love to hear from you.
      </p>
    </div>
  );
};

export default About;
