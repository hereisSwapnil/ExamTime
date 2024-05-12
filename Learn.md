# ExamTime

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li><a href="#1-project-description">Project Description</a></li>
    <li><a href="#2-tech-stack">Tech Stack</a></li>
    <li><a href="#3-running-the-project-locally">Running the Project Locally</a></li>
    <li><a href="#4-contributing">Contributing</a></li>
  </ol>
</details>

# <a name="1-project-description">Project Description:</a>

ExamTime is a platform designed to facilitate exam preparation by providing a centralized location for sharing and downloading notes in PDF format. Whether you're a student looking for study materials or someone willing to contribute by sharing your notes, ExamTime aims to make exam preparation more efficient and collaborative.

## <a name="2-tech-stack">Tech Stack:</a>

To be able to contribute to this project, you should learn the following technologies:

1. ReactJs
2. Node.js
3. Express.js
4. MongoDB
5. PDF.js

You can start contributing with knowledge of ReactJs and learn others on the go.

# <a name="3-running-the-project-locally">Running the Project Locally:</a>

To run the project locally, you need to set up both the server and the client. Here are the steps:

**Server Setup:**

1. Navigate to the server directory:

    ```bash
    cd ExamTime/server
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

    This command installs all the necessary dependencies for the server. It reads the `package.json` file to determine what packages are needed, and then downloads them into a `node_modules` folder.

3. Start the server:

    ```bash
    npm run dev
    ```

    This command starts the server in development mode. It looks for a script named "dev" in the `package.json` file and runs it. This usually starts up a local development server and rebuilds the app whenever you make changes.

**Client Setup:**

1. Navigate to the client directory:

    ```bash
    cd ../client
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

    This command installs all the necessary dependencies for the client. It reads the `package.json` file to determine what packages are needed, and then downloads them into a `node_modules` folder.

3. Start the client:

    ```bash
    npm run dev
    ```

    This command starts the client in development mode. It looks for a script named "dev" in the `package.json` file and runs it. This usually starts up a local development server and rebuilds the app whenever you make changes.

# <a name="4-contributing">Contributing:</a>

Contributions to this project are welcome! Here's how you can contribute:

[Note: Always create a new branch for a new PR]

Before you start coding, create a new branch for your work. This keeps your changes separate from the main codebase and makes it easier to merge your changes later.