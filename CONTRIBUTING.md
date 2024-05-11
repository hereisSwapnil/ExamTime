<h1 style="text-align: center;">Welcome ExamTime Contributors </h1>
We're glad you're here and ready to contribute to ExamTime. This guide will help you understand our setup and how you can contribute.

## Table of Contents

- [Project Setup](#project-setup)
- [Contribution Process](#contribution-process)
- [Documentation](#documentation)
- [Code Reviews](#code-reviews)
- [Bug Fixes and Issue Reporting](#bug-fixes-and-issue-reporting)
- [Feature Requests](#feature-requests)
- [Spread the Word](#spread-the-word)


# Project setup

## Environment Variables

To run this project, you need to add the following environment variables to your `.env` file. Refer to the `.env.sample` file in both the server and client directories for examples.

#### For server

- `PORT`: The port the server will run on.
- `MONGODB_URI`: The URI of your MongoDB database.
- `SECRET`: The secret key for your application.
- `ORIGIN`: The origin URL of your application.


#### For client

- `VITE_BASE_URL`: The base URL of your application.

## Run Locally

Follow these steps to get the project up and running on your local machine:

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
## Contribution Process

Once you are done with the changes you wanted to add, follow the steps to make the pull request.

### Create and checkout to the new branch.

`git checkout -b <branch_name>`

### Add the changes

`git add .`

### Commit your change with a proper message

`git commit -m "Enter your message here"`

### Make the Pull Request

`git push origin <branch_name>`

## Documentation 📑
When you contribute, remember to:

- Document any significant changes or additions to the codebase.
- Provide clear and concise explanations of the functionality, usage, and any relevant considerations.
- Update the `README.md` file to reflect the changes made and provide instructions on how to use the project (if needed).

## ✅ Code Reviews
During code reviews:

- Be open to feedback and constructive criticism from other contributors.
- Participate in code reviews by reviewing and providing feedback.

## ✅ Bug Fixes and Issue Reporting
Help us keep the project running smoothly:

- Help identify and fix bugs in the project.
- Report any issues or bugs you encounter during your contribution by creating a new issue in the GitHub repository.

## 🚀🚀Feature Requests
Help us improve:

- Suggest new features or improvements that you believe would enhance the project.

## ☘️ Spread the Word
Help us grow:

- Share your experience and the project with others.
- Spread the word about the project on social media, developer forums, or any relevant community platforms.

Thank you for your valuable contribution and for being a part of the ExamTime! Together, we can make a difference. 🚀
