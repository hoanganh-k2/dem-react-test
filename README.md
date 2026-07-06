# Frontend React Quiz App

Frontend React cho he thong quiz online, gom trang user lam bai quiz, trang admin quan ly user/quiz/cau hoi, dang nhap, profile, dashboard va lich su lam bai.

Project co san demo mode de deploy va trinh dien tren Vercel ngay ca khi chua co backend.

## Tinh Nang

- Dang nhap, dang ky va luu trang thai dang nhap bang Redux Persist
- Trang user xem danh sach quiz va lam bai quiz
- Trang admin quan ly user, quiz, cau hoi/dap an va gan quiz cho user
- Dashboard thong ke so user, quiz, cau hoi va dap an
- Profile, doi mat khau va lich su lam bai
- Ho tro routing voi React Router
- Demo mode dung mock data khi chua co backend
- Cau hinh san cho Vercel SPA routing bang `vercel.json`

## Cong Nghe

- React 18
- React Router v6
- Redux, Redux Thunk, Redux Persist
- React Bootstrap, Bootstrap, SCSS
- Axios
- React Toastify
- React Select
- React Paginate
- Recharts
- i18next

## Yeu Cau

- Node.js 16+ khuyen dung
- npm

Project co package cu `react-awesome-lightbox` khai bao peer dependency cho React 16/17, nen repo da co `.npmrc` voi:

```text
legacy-peer-deps=true
```

Nho do `npm install` co the chay on voi React 18.

## Cai Dat Local

```bash
npm install
cp .env.example .env
npm start
```

Mo ung dung tai:

```text
http://localhost:3000
```

## Demo Mode Khong Can Backend

Neu chua co backend, bat demo mode trong `.env`:

```text
REACT_APP_DEMO_MODE=true
```

Khi demo mode bat, app se dung mock data trong `src/services/apiService.js`. Cac luong chinh nhu login, danh sach quiz, lam quiz, dashboard va admin co the thao tac duoc trong phien hien tai.

Tai khoan demo:

```text
Email: admin@demo.com
Password: 123456
```

Trang login se tu dien san thong tin nay khi app dang chay demo mode.

## Ket Noi Backend That

Khi co backend that, tat demo mode va cau hinh API URL:

```text
REACT_APP_DEMO_MODE=false
REACT_APP_API_URL=https://your-backend-domain.com/
REACT_APP_BACKEND_URL=https://your-backend-domain.com/
```

Neu chay backend local:

```text
REACT_APP_API_URL=http://localhost:8081/
REACT_APP_BACKEND_URL=http://localhost:8081/
```

Luu y: khong dung `localhost` khi deploy len Vercel, vi browser cua nguoi dung se goi localhost tren may cua ho.

## Deploy Len Vercel

Trong man hinh import project cua Vercel:

```text
Framework Preset: Create React App
Root Directory: ./
Install Command: npm install
Build Command: npm run build
Output Directory: build
```

Neu chua co backend, them Environment Variable:

```text
REACT_APP_DEMO_MODE=true
```

Neu da co backend, them:

```text
REACT_APP_DEMO_MODE=false
REACT_APP_API_URL=https://your-backend-domain.com/
REACT_APP_BACKEND_URL=https://your-backend-domain.com/
```

File `vercel.json` da duoc them de React Router khong bi 404 khi refresh cac route nhu `/login`, `/users`, `/admins/manage-user` hoac `/quiz/1`.

## Scripts

```bash
npm start
```

Chay app o development mode.

```bash
npm run build
```

Build production vao thu muc `build`.

```bash
npm test
```

Chay test runner cua Create React App.

## Cau Truc Thu Muc

```text
public/
  locales/              # File ngon ngu
src/
  assets/               # Anh, video va static assets
  components/
    Admin/              # Trang va component admin
    Auth/               # Login, register
    Header/             # Header, profile, language, history
    Home/               # Trang chu
    Route/              # PrivateRoute
    User/               # Danh sach quiz, chi tiet quiz, cau hoi
  redux/                # Store, reducer, action
  services/             # API service va demo mock mode
  utils/                # Axios config, i18n
  App.js
  Layout.js
  index.js
```

## API Chinh Khi Dung Backend

- `POST /api/v1/login`
- `POST /api/v1/register`
- `POST /api/v1/logout`
- `GET /api/v1/quiz-by-participant`
- `GET /api/v1/questions-by-quiz?quizId=:id`
- `POST /api/v1/quiz-submit`
- `GET /api/v1/quiz/all`
- `POST /api/v1/quiz`
- `PUT /api/v1/quiz`
- `DELETE /api/v1/quiz/:id`
- `GET /api/v1/participant/all`
- `GET /api/v1/participant?page=:page&limit=:limit`
- `POST /api/v1/participant`
- `PUT /api/v1/participant`
- `DELETE /api/v1/participant`
- `POST /api/v1/quiz-upsert-qa`
- `GET /api/v1/quiz-with-qa/:id`
- `POST /api/v1/quiz-assign-to-user`
- `GET /api/v1/overview`
- `GET /api/v1/history`

## Ghi Chu

Project duoc khoi tao tu Create React App. Hien tai co the deploy frontend truoc voi demo mode, sau do chuyen sang backend that bang cach cap nhat Environment Variables tren Vercel.
