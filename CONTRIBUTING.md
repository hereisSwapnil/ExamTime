## Welcome ExamTime Contributors!

This guide will walk you through the process of contributing to ExamTime.

**Project Setup**

**Environment Variables**

To run this project, you'll need to add the following environment variables to your `.env` file. Refer to the `.env.sample` file in both the server and client directories for details.

**Server**

* `PORT`
* `MONGODB_URI`
* `SECRET`
* `ORIGIN`

**Client**

* `VITE_BASE_URL`

**Running Locally**

1. **Clone the project:**

   ```bash
   git clone https://github.com/hereisSwapnil/ExamTime.git
   ```

2. **Navigate to the server directory:**

   ```bash
   cd server
   ```

3. **Install server dependencies:**

   ```bash
   npm install
   ```

4. **Start the server:**

   ```bash
   npm run dev
   ```

5. **Navigate to the client directory:**

   ```bash
   cd ../client
   ```

6. **Install client dependencies:**

   ```bash
   npm install
   ```

7. **Start the client:**

   ```bash
   npm run dev
   ```

**Making a Pull Request**

1. **Create and checkout to a new branch:**

   ```bash
   git checkout -b <branch_name>
   ```

2. **Add your changes:**

   ```bash
   git add .
   ```

3. **Commit your changes with a clear message:**

   ```bash
   git commit -m "Enter your message here"
   ```

4. **Push your branch to remote:**

   ```bash
   git push origin <branch_name>
   ```

**Contributing Guidelines**

* **Documentation:**
   * Document any significant changes or additions to the codebase.
   * Provide clear explanations of functionality, usage, and considerations.
   * Update the `README.md` file to reflect changes and provide usage instructions (if needed).
* **Code Reviews:**
   * Be open to feedback and participate in code reviews.
* **Bug Fixes and Issue Reporting:**
   * Help identify and fix bugs.
   * Report issues you encounter by creating a new GitHub repository issue.
* **Feature Requests:**
   * Suggest new features or improvements.
* **Spread the Word:**
   * Share your experience and the project with others. Promote it on social media, developer forums, or relevant communities.

Thank you for your valuable contribution to ExamTime! Together, we can make a difference. 
