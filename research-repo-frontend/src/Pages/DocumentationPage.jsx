import React from "react";

const DocumentationPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-gray-800 leading-relaxed">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">
        Project Documentation
      </h1>

      {/* Real World Problem */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          1. Real World Problem
        </h2>
        <p>
          In most universities, final-year research projects are stored manually or scattered across different platforms.
          This creates major issues such as duplicate topics, poor accessibility, and lack of innovation tracking.
          Faculty members struggle to identify unique ideas, and students often repeat completed projects.
        </p>
        <p className="mt-2">
          The proposed system solves these challenges by creating an{" "}
          <b>AI-powered Research Project Repository</b> that automatically
          stores, analyzes, and compares project ideas for originality.
        </p>
      </section>

      {/* Abstraction */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          2. Abstraction
        </h2>
        <p>
          The system acts as a smart, centralized digital repository where
          students can upload completed projects and submit new ideas for
          originality checks. It uses{" "}
          <b>Natural Language Processing (NLP)</b> and{" "}
          <b>Sentence-BERT embeddings</b> to analyze similarities between new and
          existing project abstracts.
        </p>
        <p className="mt-2">
          Faculty members can review, rate, and comment on projects while
          administrators access dashboards showing project statistics and
          research trends.
        </p>
      </section>

      {/* Methodology */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          3. Methodology
        </h2>

        <ul className="list-disc ml-6 space-y-2">
          <li>
            <b>Phase 1 – Core System:</b> Build Spring Boot backend + MySQL DB,
            upload module, and search/filter functionality.
          </li>
          <li>
            <b>Phase 2 – NLP Microservice:</b> Integrate Python (Flask/FastAPI)
            using Sentence-BERT to compare new ideas with stored projects via
            cosine similarity.
          </li>
          <li>
            <b>Phase 3 – Review & Dashboard:</b> Implement faculty login,
            rating, comments, and visualization with Chart.js.
          </li>
          <li>
            <b>Phase 4 – Enhancement & Deployment:</b> Add keyword extraction,
            research gap analysis, and deploy via Docker or Render.
          </li>
        </ul>
      </section>

      {/* Technology */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          4. Technology Stack
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="border px-4 py-2 text-left">Layer</th>
                <th className="border px-4 py-2 text-left">Technologies</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Frontend</td>
                <td className="border px-4 py-2">
                  React.js, Tailwind CSS / Bootstrap
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Backend</td>
                <td className="border px-4 py-2">
                  Spring Boot (Java), Spring MVC, Spring Security
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">AI / NLP Service</td>
                <td className="border px-4 py-2">
                  Python (Flask / FastAPI), Sentence-BERT, scikit-learn, spaCy
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Database</td>
                <td className="border px-4 py-2">MySQL / PostgreSQL</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Visualization</td>
                <td className="border px-4 py-2">Chart.js, Matplotlib, WordCloud</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Deployment</td>
                <td className="border px-4 py-2">Docker, Render, or Heroku</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Related Works */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          5. Related Works
        </h2>
        <p>
          Existing research repositories like Google Scholar, IEEE Xplore, and
          GitHub store projects but lack originality verification or semantic
          comparison. This system advances them by combining:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-2">
          <li>AI-based idea validation</li>
          <li>Research gap analysis</li>
          <li>Automated tagging and trend visualization</li>
          <li>Integrated review and feedback system</li>
        </ul>
      </section>

      {/* Conclusion */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          6. Conclusion
        </h2>
        <p>
          The AI-Powered Research Repository promotes academic innovation and
          integrity. By combining full-stack web development with NLP-based
          analysis, it ensures every student works on a unique, research-worthy
          idea while empowering teachers and admins with meaningful insights.
        </p>
      </section>
    </div>
  );
};

export default DocumentationPage;
