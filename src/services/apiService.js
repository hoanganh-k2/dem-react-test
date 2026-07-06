import axios from "../utils/axiosCustomize";

const demoMode =
  process.env.REACT_APP_DEMO_MODE === "true" || !process.env.REACT_APP_API_URL;

const placeholderImage =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgP8hD0kAAAAASUVORK5CYII=";

let demoUsers = [
  {
    id: 1,
    email: "admin@demo.com",
    username: "Demo Admin",
    role: "ADMIN",
    image: placeholderImage,
  },
  {
    id: 2,
    email: "student@demo.com",
    username: "Demo Student",
    role: "USER",
    image: placeholderImage,
  },
  {
    id: 3,
    email: "teacher@demo.com",
    username: "Demo Teacher",
    role: "USER",
    image: placeholderImage,
  },
];

let demoQuizzes = [
  {
    id: 1,
    name: "React Basics",
    description: "React component, props and state",
    difficulty: "EASY",
    image: placeholderImage,
  },
  {
    id: 2,
    name: "JavaScript Core",
    description: "Scope, array methods and async JavaScript",
    difficulty: "MEDIUM",
    image: placeholderImage,
  },
  {
    id: 3,
    name: "Frontend Architecture",
    description: "Routing, state management and API integration",
    difficulty: "HARD",
    image: placeholderImage,
  },
];

let demoQuestions = {
  1: [
    {
      id: 101,
      description: "What hook is commonly used to store component state?",
      imageFile: "",
      answers: [
        { id: 1001, description: "useState", isCorrect: true },
        { id: 1002, description: "useRouter", isCorrect: false },
        { id: 1003, description: "useClass", isCorrect: false },
      ],
    },
    {
      id: 102,
      description: "Which prop should be stable when rendering a list?",
      imageFile: "",
      answers: [
        { id: 1004, description: "key", isCorrect: true },
        { id: 1005, description: "style", isCorrect: false },
        { id: 1006, description: "title", isCorrect: false },
      ],
    },
  ],
  2: [
    {
      id: 201,
      description: "Which method creates a new array from transformed items?",
      imageFile: "",
      answers: [
        { id: 2001, description: "map", isCorrect: true },
        { id: 2002, description: "push", isCorrect: false },
        { id: 2003, description: "splice", isCorrect: false },
      ],
    },
  ],
  3: [
    {
      id: 301,
      description: "What should an SPA on Vercel rewrite deep links to?",
      imageFile: "",
      answers: [
        { id: 3001, description: "index.html", isCorrect: true },
        { id: 3002, description: "robots.txt", isCorrect: false },
        { id: 3003, description: "package.json", isCorrect: false },
      ],
    },
  ],
};

const success = (DT = {}, EM = "Demo action completed") => ({
  EC: 0,
  EM,
  DT,
});

const run = (request, demoResponse) => {
  if (demoMode) {
    return Promise.resolve(demoResponse());
  }

  return request().catch(() => demoResponse());
};

const toQuestionRows = (quizId) => {
  return (demoQuestions[quizId] || []).flatMap((question) =>
    question.answers.map((answer) => ({
      id: question.id,
      description: question.description,
      image: question.imageFile,
      answers: { ...answer },
    }))
  );
};

const postCreateNewUser = (email, password, userName, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", userName);
  data.append("role", role);
  data.append("userImage", image);

  return run(
    () => axios.post("api/v1/participant", data),
    () => {
      demoUsers.unshift({
        id: Date.now(),
        email,
        username: userName,
        role,
        image: placeholderImage,
      });
      return success({}, "Create user succeed");
    }
  );
};

const getAllUsers = () => {
  return run(
    () => axios.get("api/v1/participant/all"),
    () => success(demoUsers)
  );
};

const putUpdateUser = (id, userName, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", userName);
  data.append("role", role);
  data.append("userImage", image);

  return run(
    () => axios.put("api/v1/participant", data),
    () => {
      demoUsers = demoUsers.map((user) =>
        +user.id === +id ? { ...user, username: userName, role } : user
      );
      return success({}, "Update user succeed");
    }
  );
};

const deleteUser = (userId) => {
  return run(
    () => axios.delete("api/v1/participant", { data: { id: userId } }),
    () => {
      demoUsers = demoUsers.filter((user) => +user.id !== +userId);
      return success({}, "Delete user succeed");
    }
  );
};

const getUserPaginate = (page, limit) => {
  return run(
    () => axios.get(`api/v1/participant?page=${page}&limit=${limit}`),
    () => {
      const start = (page - 1) * limit;
      return success({
        users: demoUsers.slice(start, start + limit),
        totalPages: Math.max(1, Math.ceil(demoUsers.length / limit)),
      });
    }
  );
};

const postLogin = (userEmail, userPassword) => {
  return run(
    () =>
      axios.post("api/v1/login", {
        email: userEmail,
        password: userPassword,
      }),
    () => {
      const user =
        demoUsers.find((item) => item.email === userEmail) || demoUsers[0];
      return success(
        {
          access_token: "demo-access-token",
          refresh_token: "demo-refresh-token",
          image: user.image,
          role: user.role,
          username: user.username,
          email: user.email,
        },
        "Login demo succeed"
      );
    }
  );
};

const postRegister = (userEmail, username, userPassword) => {
  return run(
    () =>
      axios.post("api/v1/register", {
        email: userEmail,
        username,
        password: userPassword,
      }),
    () => {
      demoUsers.push({
        id: Date.now(),
        email: userEmail,
        username,
        role: "USER",
        image: placeholderImage,
      });
      return success({}, "Register demo succeed");
    }
  );
};

const getListQuiz = () => {
  return run(
    () => axios.get("api/v1/quiz-by-participant"),
    () => success(demoQuizzes)
  );
};

const getQuestion = (id) => {
  return run(
    () => axios.get(`/api/v1/questions-by-quiz?quizId=${id}`),
    () => success(toQuestionRows(id))
  );
};

const postSubmitQuiz = (data) => {
  return run(
    () => axios.post("api/v1/quiz-submit", { ...data }),
    () => {
      const questions = demoQuestions[data.quizId] || [];
      let countCorrect = 0;
      questions.forEach((question) => {
        const correctIds = question.answers
          .filter((answer) => answer.isCorrect)
          .map((answer) => answer.id)
          .sort();
        const userIds =
          data.answers
            .find((answer) => +answer.questionId === +question.id)
            ?.userAnswerId.sort() || [];
        if (JSON.stringify(correctIds) === JSON.stringify(userIds)) {
          countCorrect += 1;
        }
      });

      return success({
        countCorrect,
        countTotal: questions.length,
        quizData: questions,
      });
    }
  );
};

const postCreateNewQuiz = (description, name, type, image) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", type);
  data.append("quizImage", image);

  return run(
    () => axios.post("api/v1/quiz", data),
    () => {
      const id = Date.now();
      demoQuizzes.unshift({
        id,
        name,
        description,
        difficulty: type,
        image: placeholderImage,
      });
      demoQuestions[id] = [];
      return success({}, "Create quiz succeed");
    }
  );
};

const getAllQuizForAdmin = () => {
  return run(
    () => axios.get(`/api/v1/quiz/all`),
    () => success(demoQuizzes)
  );
};

const putUpdateQuiz = (id, description, name, difficulty, quizImage) => {
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);

  return run(
    () => axios.put("api/v1/quiz", data),
    () => {
      demoQuizzes = demoQuizzes.map((quiz) =>
        +quiz.id === +id ? { ...quiz, description, name, difficulty } : quiz
      );
      return success({}, "Update quiz succeed");
    }
  );
};

const deleteQuiz = (id) => {
  return run(
    () => axios.delete(`api/v1/quiz/${id}`),
    () => {
      demoQuizzes = demoQuizzes.filter((quiz) => +quiz.id !== +id);
      delete demoQuestions[id];
      return success({}, "Delete quiz succeed");
    }
  );
};

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", questionImage);
  return run(
    () => axios.post("api/v1/question", data),
    () => {
      const id = Date.now();
      demoQuestions[quiz_id] = demoQuestions[quiz_id] || [];
      demoQuestions[quiz_id].push({
        id,
        description,
        imageFile: "",
        answers: [],
      });
      return success({ id }, "Create question succeed");
    }
  );
};

const postCreateNewAnswerForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return run(
    () =>
      axios.post("api/v1/answer", {
        description,
        correct_answer,
        question_id,
      }),
    () => {
      Object.values(demoQuestions).forEach((questions) => {
        const question = questions.find((item) => +item.id === +question_id);
        if (question) {
          question.answers.push({
            id: Date.now() + question.answers.length,
            description,
            isCorrect: correct_answer,
          });
        }
      });
      return success({}, "Create answer succeed");
    }
  );
};

const postAssignQuiz = (quizId, userId) => {
  return run(
    () =>
      axios.post("api/v1/quiz-assign-to-user", {
        quizId,
        userId,
      }),
    () => success({}, "Assign quiz succeed")
  );
};

const getQuizWithQA = (quizId) => {
  return run(
    () => axios.get(`api/v1/quiz-with-qa/${quizId}`),
    () => success({ qa: demoQuestions[quizId] || [] })
  );
};

const postUpsertQA = (data) => {
  return run(
    () => axios.post("api/v1/quiz-upsert-qa", { ...data }),
    () => {
      demoQuestions[data.quizId] = data.questions.map((question) => ({
        ...question,
        imageFile: "",
      }));
      return success({}, "Save questions succeed");
    }
  );
};

const logOut = (email, refresh_token) => {
  return run(
    () => axios.post("api/v1/logout", { email, refresh_token }),
    () => success({}, "Logout demo succeed")
  );
};

const getOverview = () => {
  return run(
    () => axios.get("api/v1/overview"),
    () =>
      success({
        users: { countUsers: demoUsers.length },
        others: {
          countQuiz: demoQuizzes.length,
          countQuestions: Object.values(demoQuestions).flat().length,
          countAnswers: Object.values(demoQuestions)
            .flat()
            .reduce((total, question) => total + question.answers.length, 0),
        },
      })
  );
};

const postUpdateProfile = (username, userImage) => {
  const data = new FormData();
  data.append("username", username);
  data.append("userImage", userImage);
  return run(
    () => axios.post("api/v1/profile", data),
    () => success({}, "Update profile succeed")
  );
};

const postChangePassword = (current_password, new_password) => {
  return run(
    () =>
      axios.post("api/v1/change-password", {
        current_password,
        new_password,
      }),
    () => success({}, "Change password succeed")
  );
};

const getHistory = () => {
  return run(
    () => axios.get("api/v1/history"),
    () =>
      success({
        data: [
          {
            id: 1,
            quizHistory: { name: "React Basics" },
            total_questions: 2,
            total_correct: 2,
          },
          {
            id: 2,
            quizHistory: { name: "JavaScript Core" },
            total_questions: 1,
            total_correct: 1,
          },
        ],
      })
  );
};

export {
  postCreateNewUser,
  getAllUsers,
  putUpdateUser,
  deleteUser,
  getUserPaginate,
  postLogin,
  postRegister,
  getListQuiz,
  getQuestion,
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuizForAdmin,
  putUpdateQuiz,
  deleteQuiz,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
  postAssignQuiz,
  getQuizWithQA,
  postUpsertQA,
  logOut,
  getOverview,
  postUpdateProfile,
  postChangePassword,
  getHistory,
};
