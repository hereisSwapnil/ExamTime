
# Welcome ExamTime Contributors

This guide will walk you through the process of contributing to ExamTime!

## Project Setup

### Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file. You can refer to the `.env.sample` file located in both the server and client directories.

#### For server

- `PORT`
- `MONGODB_URI`
- `SECRET`
- `ORIGIN`

#### For client

- `VITE_BASE_URL`
  

## Run Locally

### Clone the project

```bash
git clone https://github.com/hereisSwapnil/ExamTime.git
```

### Navigate to the server directory

```bash
cd server
```

### Install server dependencies

```bash
npm install
```

### Start the server

```bash
npm run dev
```

### Navigate to the client directory

```bash
cd ../client
```

### Install client dependencies

```bash
npm install
```

### Start the client

```bash
npm run dev
```

Now you are done with the project setup, now you can make the changes you want or assign.

Once you are done with the changes you wanted to add, follow the steps to make the pull request.

### Create and checkout to the new branch.

`git checkout -b <branch_name>`

### Add the changes

`git add .`

### Commit your change with a proper message

`git commit -m "Enter your message here"`

### Make the Pull Request

`git push origin <branch_name>`


## Alternatively use GitHub Desktop

### 1. Open GitHub Desktop

Launch GitHub Desktop and log in to your GitHub account.

### 2. Clone the Repository

If you haven't cloned the ResourceHub repository yet, you can do so by 
1. Clicking on the "File" menu and selecting "Clone Repository."
2. Choose the ExamTime repository from the list of repositories on GitHub and clone it to your local machine.

### 3. Switch to the Correct Branch

1. Ensure you are on the branch that you want to submit a pull request for.
2. If you need to switch branches, you can do so by clicking on the "Current Branch" dropdown menu and selecting the desired branch.

### 4. Make the desired changes

Make your changes to the code or files in the repository using your preferred code editor.

### 5. Commit Changes

1. In GitHub Desktop, you'll see a list of the files you've changed.
2. Check the box next to each file you want to include in the commit.
3. Enter a summary and description for your changes in the "Summary" and "Description" fields, respectively.
4. Click the "Commit to <branch-name>" button to commit your changes to the local branch.

### 6. Push Changes to GitHub

After committing your changes, click the "Push origin" button in the top right corner of GitHub Desktop to push your changes to your forked repository on GitHub.

### 7. Create a Pull Request

1. Go to the GitHub website and navigate to your fork of the ResourceHub repository.
2. You should see a button to "Compare & pull request" between your fork and the original repository. Click on it.

### 8. Review and Submit

1. On the pull request page, review your changes and add any additional information, such as a title and description, that you want to include with your pull request.
2. Once you're satisfied, click the "Create pull request" button to submit your pull request.

### 9. Wait for Review

Your pull request will now be available for review by the project maintainers. They may provide feedback or ask for changes before merging your pull request into the main branch of the ResourceHub repository.

#### Congratulations on successfully submitting your PR to our project! 🎉 

### Documentation 📑

- Document any significant changes or additions to the codebase.
- Provide clear and concise explanations of the functionality, usage, and any relevant considerations.
- Update the `README.md` file to reflect the changes made and provide instructions on how to use the project (if needed).

### ✅ Code Reviews
- Be open to feedback and constructive criticism from other contributors.
- Participate in code reviews by reviewing and providing feedback.

### ✅ Bug Fixes and Issue Reporting

- Help identify and fix bugs in the project.
- Report any issues or bugs you encounter during your contribution by creating a new issue in the GitHub repository.

### 🚀🚀Feature Requests

- Suggest new features or improvements that you believe would enhance the project.

### ☘️ Spread the Word

- Share your experience and the project with others.
- Spread the word about the project on social media, developer forums, or any relevant community platforms.

Thank you for your valuable contribution and for being a part of the ExamTime! Together, we can make a difference. 🚀
