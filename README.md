# Hệ Thống Quiz Online - Ứng Dụng Web Full Stack

Hệ thống quản lý bài thi trắc nghiệm trực tuyến hoàn chỉnh được xây dựng bằng React và Node.js, bao gồm trang quản trị, xác thực người dùng và chức năng làm bài thi thời gian thực.

## Mục Lục
- [Tính Năng](#tính-năng)
- [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
- [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
- [Cài Đặt](#cài-đặt)
- [Sử Dụng](#sử-dụng)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Tích Hợp API](#tích-hợp-api)

## Tính Năng

### Tính Năng Dành Cho User
- Xác thực người dùng (Đăng nhập/Đăng ký) với JWT
- Làm bài thi với bộ đếm thời gian ngược
- Xem kết quả chi tiết sau khi hoàn thành
- Quản lý thông tin cá nhân (upload avatar, cập nhật thông tin, đổi mật khẩu)
- Theo dõi lịch sử làm bài
- Hỗ trợ đa ngôn ngữ (Tiếng Việt/English)

### Tính Năng Dành Cho Admin
- Quản lý Quiz đầy đủ (Thêm/Sửa/Xóa)
- Quản lý câu hỏi và đáp án có hỗ trợ upload hình ảnh
- Phân công bài thi cho người dùng cụ thể
- Quản lý danh sách người dùng
- Dashboard thống kê và báo cáo
- Phân quyền dựa trên vai trò

## Công Nghệ Sử Dụng

### Frontend
- React 18.2.0
- Redux + Redux Thunk để quản lý state
- React Router v6 cho routing
- React Bootstrap + SCSS cho styling
- Axios cho HTTP requests
- i18next cho đa ngôn ngữ
- React Toastify cho thông báo
- Lodash cho các hàm tiện ích
- Recharts cho biểu đồ và trực quan hóa dữ liệu
- React Select cho dropdown nâng cao
- React Paginate cho phân trang

### Tích Hợp Backend
- RESTful API
- JWT Authentication
- FormData cho upload file
- Base64 encoding cho hình ảnh

## Yêu Cầu Hệ Thống

Trước khi bắt đầu, đảm bảo bạn đã cài đặt:
- Node.js v14.17.0 trở lên
- npm hoặc yarn package manager
- Backend API server đang chạy (cần thiết cho đầy đủ chức năng)

## Cài Đặt

1. Clone repository:
```bash
git clone <repository-url>
cd React
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file environment variables:
```bash
cp .env.example .env
```

4. Cấu hình environment variables:
```
REACT_APP_API_URL=http://localhost:8081
REACT_APP_BACKEND_URL=http://localhost:8081
```

## Sử Dụng

### Chế Độ Development

Chạy ứng dụng ở chế độ development:
```bash
npm start
```
Mở [http://localhost:3000](http://localhost:3000) để xem trong trình duyệt.

Trang sẽ tự động reload khi bạn thay đổi code. Bạn cũng có thể thấy các lỗi lint trong console.

### Build Production

Build ứng dụng cho production:
```bash
npm run build
```

Build ứng dụng cho production vào thư mục `build`. Nó sẽ bundle React ở chế độ production và tối ưu hóa build để có hiệu suất tốt nhất.

Build được minify và tên file bao gồm hash. Ứng dụng của bạn đã sẵn sàng để deploy!

### Testing

Chạy test runner ở chế độ interactive watch:
```bash
npm test
```

## Cấu Trúc Dự Án

```
React/
├── public/
│   ├── index.html
│   ├── locales/         # File ngôn ngữ
│   └── ...
├── src/
│   ├── assets/          # Hình ảnh, fonts và file tĩnh
│   ├── components/      # Các React components
│   │   ├── Admin/       # Components trang quản trị
│   │   ├── Auth/        # Components đăng nhập/đăng ký
│   │   ├── Header/      # Header và navigation
│   │   ├── Home/        # Trang chủ
│   │   ├── Route/       # Protected routes
│   │   └── User/        # Components phía user
│   ├── redux/           # Redux store và actions
│   │   ├── action/      # Redux actions
│   │   ├── reducer/     # Redux reducers
│   │   └── store.js     # Store configuration
│   ├── services/        # API service layer
│   ├── utils/           # Utility functions
│   ├── Layout.js        # Component layout chính
│   ├── App.js           # Root component
│   ├── App.scss         # Global styles
│   └── index.js         # Entry point
├── package.json
└── README.md
```

## Tích Hợp API

Ứng dụng tích hợp với backend API cho các thao tác sau:

### Xác Thực
- POST `/api/v1/login` - Đăng nhập
- POST `/api/v1/register` - Đăng ký
- POST `/api/v1/logout` - Đăng xuất

### Quản Lý Quiz
- GET `/api/v1/quiz/all` - Lấy tất cả quiz
- POST `/api/v1/quiz` - Tạo quiz mới
- PUT `/api/v1/quiz` - Cập nhật quiz
- DELETE `/api/v1/quiz/:id` - Xóa quiz

### Quản Lý Câu Hỏi
- POST `/api/v1/quiz-upsert-qa` - Tạo/Cập nhật câu hỏi
- GET `/api/v1/quiz-with-qa/:id` - Lấy quiz với câu hỏi

### Quản Lý User
- GET `/api/v1/participant/all` - Lấy tất cả user
- POST `/api/v1/participant` - Tạo user
- PUT `/api/v1/participant` - Cập nhật user
- DELETE `/api/v1/participant` - Xóa user

### Phân Công Quiz
- POST `/api/v1/quiz-assign-to-user` - Phân công quiz cho user
- POST `/api/v1/quiz-submit` - Nộp bài làm

## Các Tính Năng Nổi Bật

### Xác Thực & Phân Quyền
- Xác thực dựa trên JWT token
- Protected routes với authentication guards
- Phân quyền dựa trên vai trò (Admin/User)

### Quản Lý State
- Redux cho quản lý state toàn cục
- Redux Thunk cho các thao tác bất đồng bộ
- Lưu trạng thái đăng nhập

### Xử Lý Hình Ảnh
- Preview ảnh trước khi upload
- Base64 encoding để truyền qua API
- Hỗ trợ nhiều định dạng ảnh

### Tối Ưu Hiệu Suất
- Code splitting và lazy loading
- Debounced search functionality
- Tối ưu re-renders với React.memo
- Cập nhật state hiệu quả

### Trải Nghiệm Người Dùng
- Responsive design cho mọi thiết bị
- Loading states và xử lý lỗi
- Toast notifications cho phản hồi người dùng
- Hỗ trợ đa ngôn ngữ

## Liên Hệ

Repository: [dem-react-test](https://github.com/hoanganh-k2/dem-react-test)

## Ghi Chú

Dự án được khởi tạo với [Create React App](https://github.com/facebook/create-react-app).
