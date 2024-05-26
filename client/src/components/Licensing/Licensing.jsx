import React from "react";

const Licensing = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Licensing Information
      </h1>
      <p className="text-lg mb-6">
        ExamTime is committed to ensuring that all content shared on our
        platform respects intellectual property rights and adheres to licensing
        agreements. This page provides information about the types of licenses
        under which content is shared on ExamTime.
      </p>

      <h2 className="text-2xl font-semibold mb-4">User-Generated Content</h2>
      <p className="text-lg mb-6">
        Content uploaded by users, including notes, study guides, and other
        educational materials, must comply with copyright laws. By uploading
        content to ExamTime, users agree that they have the right to share this
        content and grant ExamTime a non-exclusive license to display and
        distribute the content on our platform.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Creative Commons Licenses</h2>
      <p className="text-lg mb-6">
        Some content on ExamTime may be shared under Creative Commons licenses.
        These licenses allow content to be used, shared, and adapted under
        specific conditions. When using content shared under a Creative Commons
        license, please ensure you comply with the terms specified by the
        license.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Third-Party Content</h2>
      <p className="text-lg mb-6">
        ExamTime may contain links to third-party websites or resources. We do
        not control these third-party websites and are not responsible for their
        content or practices. Please review the licensing agreements of any
        third-party content you access through ExamTime.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Content Removal</h2>
      <p className="text-lg mb-6">
        If you believe that content on ExamTime infringes your copyright or
        violates our licensing policies, please contact us with detailed
        information. We will investigate and take appropriate action, including
        removing the content if necessary.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <p className="text-lg">
        For any questions or concerns regarding licensing on ExamTime, please
        feel free to{" "}
        <a href="/contact" className="text-blue-500 underline">
          contact us
        </a>
        .
      </p>
    </div>
  );
};

export default Licensing;
