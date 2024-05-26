import React from "react";

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
      <p className="text-lg mb-6">
        At ExamTime, we take your privacy seriously. This privacy policy
        outlines the types of information we collect from our users, how we use
        that information, and the measures we take to protect your privacy.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
      <p className="text-lg mb-6">
        We collect information you provide directly to us when you register for
        an account, upload study materials, request documents, participate in
        discussions, or otherwise interact with our platform. This information
        may include your name, email address, and any other details you choose
        to provide.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        How We Use Your Information
      </h2>
      <p className="text-lg mb-6">
        We use the information we collect to:
        <ul className="list-disc list-inside">
          <li>Provide, maintain, and improve our services</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Send you technical notices, updates, and support messages</li>
          <li>
            Monitor and analyze trends, usage, and activities in connection with
            our services
          </li>
          <li>Personalize and improve your experience on our platform</li>
        </ul>
      </p>

      <h2 className="text-2xl font-semibold mb-4">Sharing Your Information</h2>
      <p className="text-lg mb-6">
        We do not share your personal information with third parties except as
        described in this privacy policy. We may share information with vendors
        and other service providers who need access to such information to carry
        out work on our behalf. We may also share information if we believe
        disclosure is necessary to comply with any applicable law, regulation,
        or legal process.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
      <p className="text-lg mb-6">
        We take reasonable measures to help protect information about you from
        loss, theft, misuse, and unauthorized access, disclosure, alteration,
        and destruction.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Your Choices</h2>
      <p className="text-lg mb-6">
        You have the right to access, update, and delete your personal
        information. You can do this by logging into your account or contacting
        us directly. You may also opt out of receiving promotional
        communications from us by following the instructions in those
        communications.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <p className="text-lg">
        If you have any questions about this privacy policy, please feel free to{" "}
        <a href="/contact" className="text-blue-500 underline">
          contact us
        </a>
        .
      </p>
    </div>
  );
};

export default Privacy;
