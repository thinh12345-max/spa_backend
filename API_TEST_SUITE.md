# API Test Suite - SPA Backend

## 📋 Chuẩn bị

### 1. Khởi động Server
```bash
npm run start:dev
```
Server chạy tại: `http://localhost:3002`

### 2. Tạo Dữ liệu Test (Seeder)

Trước khi test, cần có:
- 1 User Admin (role: admin)
- 1 User Staff (role: staff) 
- 2-3 User Customer (role: customer)
- Một số Staff records liên kết với User staff
- Một số Customer records liên kết với User customer
- Một số Appointments

**Cách tạo:**
1. Tạo users qua AuthController (register) hoặc trực tiếp DB
2. Tạo staff record với `users_id` là user staff
3. Tạo customer record với `users_id` là user customer (kiểm tra entity Customer)

---

## 🔐 Authentication

### **Login - Lấy JWT Token**

**Admin Login:**
```http
POST http://localhost:3002/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Staff Login:**
```http
POST http://localhost:3002/auth/login
Content-Type: application/json

{
  "email": "staff@example.com",
  "password": "password123"
}
```

**Customer Login:**
```http
POST http://localhost:3002/auth/login
Content-Type: application/json

{
  "email": "customer@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

---

## 👤 CUSTOMER API

### **Base URL:** `http://localhost:3002/customers`

**Headers (cho tất cả requests):**
```
Authorization: Bearer <TOKEN>
Content-Type: application/json
```

---

### **1. ADMIN - Quản lý Customers**

#### **GET /customers** - Xem tất cả customers (Admin only)
```http
GET http://localhost:3002/customers?page=1&limit=10
Authorization: Bearer {{admin_token}}
```
**Query Parameters:**
- `page` (optional): Số trang, default = 1
- `limit` (optional): Số items/trang, default = 10

**Expected:** 200 OK - Danh sách customers với phân trang
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

#### **GET /customers/:id** - Xem chi tiết customer (Admin only)
```http
GET http://localhost:3002/customers/1
Authorization: Bearer {{admin_token}}
```
**Expected:** 200 OK - Thông tin customer

#### **POST /customers** - Tạo customer mới (Admin only)
```http
POST http://localhost:3002/customers
Authorization: Bearer {{admin_token}}
Content-Type: application/json

{
  "full_name": "Nguyễn Văn B",
  "phone": "0901234567",
  "email": "nguyenvanb@example.com",
  "birthday": "1995-08-20",
  "gender": "male",
  "address": "456 Nguyễn Huệ, Q.1, TP.HCM",
  "loyalty_points": 0
}
```
**Expected:** 201 Created - Customer mới

#### **PATCH /customers/:id** - Cập nhật customer (Admin only)
```http
PATCH http://localhost:3002/customers/1
Authorization: Bearer {{admin_token}}
Content-Type: application/json

{
  "phone": "0987654321",
  "address": "Địa chỉ mới đã cập nhật"
}
```
**Expected:** 200 OK - Customer đã cập nhật

#### **DELETE /customers/:id** - Xóa customer (Admin only)
```http
DELETE http://localhost:3002/customers/1
Authorization: Bearer {{admin_token}}
```
**Expected:** 200 OK - `{ "message": "Customer #1 deleted successfully" }`

---

### **2. CUSTOMER - Self Service**

#### **GET /customers/me** - Xem thông tin cá nhân (Customer only)
```http
GET http://localhost:3002/customers/me
Authorization: Bearer {{customer_token}}
```
**Expected:** 200 OK - Thông tin customer của user

#### **PUT /customers/me** - Cập nhật thông tin cá nhân (Customer only)
```http
PUT http://localhost:3002/customers/me
Authorization: Bearer {{customer_token}}
Content-Type: application/json

{
  "phone": "0909123456",
  "address": "Địa chỉ mới của tôi"
}
```
**Expected:** 200 OK - Thông tin đã cập nhật

#### **GET /customers/dashboard** - Xem dashboard (Customer only)
```http
GET http://localhost:3002/customers/dashboard
Authorization: Bearer {{customer_token}}
```
**Expected:** 200 OK - `{ "totalAppointments": 5 }`

---

## 👥 STAFF API

### **Base URL:** `http://localhost:3002/staff`

**Headers:**
```
Authorization: Bearer {{staff_token}}
Content-Type: application/json
```

---

### **1. ADMIN - Quản lý Staff**

#### **POST /staff** - Tạo staff mới (Admin only)
```http
POST http://localhost:3002/staff
Authorization: Bearer {{admin_token}}
Content-Type: application/json

{
  "users_id": 3,
  "full_name": "Nhân viên mới",
  "phone": "0901111222",
  "position": "Therapist",
  "salary": 15000000,
  "status": "active"
}
```
**Expected:** 201 Created - Staff mới

#### **GET /staff** - Xem tất cả staff (Admin only)
```http
GET http://localhost:3002/staff?page=1&limit=10
Authorization: Bearer {{admin_token}}
```
**Query Parameters:**
- `page` (optional): Số trang, default = 1
- `limit` (optional): Số items/trang, default = 10

**Expected:** 200 OK - Danh sách staff với phân trang
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "totalPages": 2
  }
}
```

#### **DELETE /staff/:id** - Xóa staff (Admin only)
```http
DELETE http://localhost:3002/staff/1
Authorization: Bearer {{admin_token}}
```
**Expected:** 200 OK - `{ "message": "Deleted successfully" }`

---

### **2. ADMIN & STAFF - Xem/Sửa Profile**

#### **GET /staff/:id** - Xem chi tiết staff
```http
# Admin xem được bất kỳ staff nào
GET http://localhost:3002/staff/1
Authorization: Bearer {{admin_token}}

# Staff chỉ xem được chính mình
GET http://localhost:3002/staff/2
Authorization: Bearer {{staff_token}}
```
**Expected:** 200 OK - Thông tin staff

**Test 403:** Staff xem staff khác → 403 Forbidden

#### **PATCH /staff/:id** - Cập nhật staff
```http
# Admin sửa được bất kỳ staff nào
PATCH http://localhost:3002/staff/1
Authorization: Bearer {{admin_token}}
Content-Type: application/json

{
  "phone": "0909999888",
  "position": "Senior Therapist"
}

# Staff chỉ sửa được chính mình
PATCH http://localhost:3002/staff/2
Authorization: Bearer {{staff_token}}
```
**Expected:** 200 OK - Staff đã cập nhật

**Test 403:** Staff sửa staff khác → 403 Forbidden

---

### **3. STAFF - Chức năng của Staff**

#### **GET /staff/schedule** - Xem lịch làm việc (Staff only)
```http
GET http://localhost:3002/staff/schedule
Authorization: Bearer {{staff_token}}
```
**Expected:** 200 OK - Danh sách appointments của staff

#### **GET /staff/appointments** - Xem appointments của staff (Staff only)
```http
GET http://localhost:3002/staff/appointments
Authorization: Bearer {{staff_token}}
```
**Expected:** 200 OK - Danh sách appointments của staff

#### **GET /staff/services** - Xem services của staff (Staff only)
```http
GET http://localhost:3002/staff/services
Authorization: Bearer {{staff_token}}
```
**Expected:** 200 OK - Danh sách services mà staff cung cấp

#### **GET /staff/customers** - Xem tất cả khách hàng (Staff only)
```http
GET http://localhost:3002/staff/customers
Authorization: Bearer {{staff_token}}
```
**Expected:** 200 OK - Danh sách tất cả customers

#### **GET /staff/my-bookings** - Xem bookings của mình (Staff only)
```http
GET http://localhost:3002/staff/my-bookings
Authorization: Bearer {{staff_token}}
```
**Expected:** 200 OK - Danh sách appointments của staff

---

**Lưu ý:** Các endpoint staff khác (POST, DELETE) đã bị xóa, chỉ còn GET/PATCH với quyền hạn chế.

---

## 📅 APPOINTMENT API

### **Base URL:** `http://localhost:3002/appointments`

**Headers:**
```
Authorization: Bearer {{TOKEN}}
Content-Type: application/json
```

---

### **1. CUSTOMER - Quản lý lịch hẹn của mình**

#### **POST /appointments** - Tạo lịch hẹn mới (Customer only)
```http
POST http://localhost:3002/appointments
Authorization: Bearer {{customer_token}}
Content-Type: application/json

{
  "staff_id": 1,
  "service_id": 2,
  "date": "2025-04-20",
  "time": "09:00",
  "note": "Lịch dịch vụ nails"
}
```
**Expected:** 201 Created - Lịch hẹn mới

#### **GET /appointments/my** - Xem lịch hẹn của tôi (Customer only)
```http
GET http://localhost:3002/appointments/my
Authorization: Bearer {{customer_token}}
```
**Expected:** 200 OK - Danh sách appointments của customer

#### **DELETE /appointments/:id** - Hủy lịch hẹn (Customer only, chỉ hủy của mình)
```http
DELETE http://localhost:3002/appointments/1
Authorization: Bearer {{customer_token}}
```
**Expected:** 200 OK - Appointment đã hủy (status = 'cancelled')

---

### **2. ADMIN & STAFF - Quản lý tất cả/riêng**

#### **GET /appointments** - Xem danh sách appointments
```http
# Admin xem tất cả (có phân trang)
GET http://localhost:3002/appointments?page=1&limit=20
Authorization: Bearer {{admin_token}}

# Staff chỉ xem appointments của mình (có phân trang)
GET http://localhost:3002/appointments?page=1&limit=20
Authorization: Bearer {{staff_token}}
```
**Query Parameters:**
- `page` (optional): Số trang, default = 1
- `limit` (optional): Số items/trang, default = 10

**Expected:** 200 OK - Danh sách appointments với phân trang
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

#### **GET /appointments/:id** - Xem chi tiết appointment
```http
# Admin xem được bất kỳ appointment nào
GET http://localhost:3002/appointments/1
Authorization: Bearer {{admin_token}}

# Staff chỉ xem được appointment của mình
GET http://localhost:3002/appointments/1
Authorization: Bearer {{staff_token}}
```
**Expected:** 200 OK - Chi tiết appointment

**Test 403:** Staff xem appointment của staff khác → 403 Forbidden

#### **PATCH /appointments/:id** - Cập nhật appointment
```http
# Admin cập nhật bất kỳ appointment nào
PATCH http://localhost:3002/appointments/1
Authorization: Bearer {{admin_token}}
Content-Type: application/json

{
  "status": "confirmed",
  "note": "Đã xác nhận"
}

# Staff chỉ cập nhật appointment của mình
PATCH http://localhost:3002/appointments/1
Authorization: Bearer {{staff_token}}
```
**Expected:** 200 OK - Appointment đã cập nhật

**Test 403:** Staff cập nhật appointment của staff khác → 403 Forbidden

---

### **3. Public Endpoints (No Auth)**

#### **GET /appointments/available-time** - Xem slot khả dụng
```http
GET http://localhost:3002/appointments/available-time?service_id=1&date=2025-04-20
```
**Expected:** 200 OK - `["09:00", "10:00", ...]`

---

## 📊 DASHBOARD API

### **Base URL:** `http://localhost:3002/dashboard`

**Headers:**
```
Authorization: Bearer {{admin_token}} || {{staff_token}}
```

---

### **GET /dashboard?period=week/month/year** - Xem thống kê (Admin & Staff)

```http
# Theo tuần (default)
GET http://localhost:3002/dashboard?period=week
Authorization: Bearer {{admin_token}}

# Theo tháng
GET http://localhost:3002/dashboard?period=month
Authorization: Bearer {{staff_token}}

# Theo năm
GET http://localhost:3002/dashboard?period=year
Authorization: Bearer {{admin_token}}
```

**Response:**
```json
{
  "summary": {
    "totalRevenue": 150000000,
    "totalAppointments": 120,
    "totalCustomers": 45
  },
  "chart": [
    { "date": "2025-04-10", "revenue": 15000000 },
    { "date": "2025-04-11", "revenue": 12000000 },
    ...
  ]
}
```
**Expected:** 200 OK - Thống kê theo period

---

## 🧪 Test Cases - Authorization & Access Control

### **Customer Endpoints**

| Test Case | Token | Endpoint | Expected |
|-----------|-------|----------|----------|
| Admin xem tất cả customers | admin | GET /customers | 200 |
| Staff xem tất cả customers | staff | GET /customers | 403 |
| Customer xem tất cả customers | customer | GET /customers | 403 |
| Customer xem /me | customer | GET /customers/me | 200 |
| Admin xem /me | admin | GET /customers/me | 403 (không phải customer) |
| Customer xem dashboard | customer | GET /customers/dashboard | 200 |
| Admin tạo customer | admin | POST /customers | 201 |
| Staff tạo customer | staff | POST /customers | 403 |
| Customer tạo customer | customer | POST /customers | 403 |

### **Staff Endpoints**

| Test Case | Token | Endpoint | Expected |
|-----------|-------|----------|----------|
| Admin xem tất cả staff | admin | GET /staff | 200 |
| Staff xem tất cả staff | staff | GET /staff | 403 |
| Admin tạo staff | admin | POST /staff | 201 |
| Staff tạo staff | staff | POST /staff | 403 |
| Staff xem profile của mình | staff | GET /staff/:own_id | 200 |
| Staff xem profile của staff khác | staff | GET /staff/:other_id | 403 |
| Admin xem profile của bất kỳ staff | admin | GET /staff/:id | 200 |
| Staff sửa profile của mình | staff | PATCH /staff/:own_id | 200 |
| Staff sửa profile của staff khác | staff | PATCH /staff/:other_id | 403 |
| Admin xóa staff | admin | DELETE /staff/:id | 200 |
| Staff xóa staff | staff | DELETE /staff/:id | 403 |
| Staff xem /customers | staff | GET /staff/customers | 200 |
| Staff xem /appointments | staff | GET /staff/appointments | 200 |

### **Appointment Endpoints**

| Test Case | Token | Endpoint | Expected |
|-----------|-------|----------|----------|
| Customer tạo appointment | customer | POST /appointments | 201 |
| Staff tạo appointment | staff | POST /appointments | 403 |
| Customer xem appointments của mình | customer | GET /appointments/my | 200 |
| Staff xem appointments của mình | staff | GET /appointments | 200 |
| Admin xem tất cả appointments | admin | GET /appointments | 200 |
| Staff xem appointment của staff khác | staff | GET /appointments/:other_id | 403 |
| Staff cập nhật appointment của mình | staff | PATCH /appointments/:own_id | 200 |
| Staff cập nhật appointment của staff khác | staff | PATCH /appointments/:other_id | 403 |
| Customer hủy appointment của mình | customer | DELETE /appointments/:own_id | 200 |
| Customer hủy appointment của người khác | customer | DELETE /appointments/:other_id | 403 (or 404) |
| Public xem available-time | none | GET /appointments/available-time | 200 |

### **Dashboard Endpoints**

| Test Case | Token | Endpoint | Expected |
|-----------|-------|----------|----------|
| Admin xem dashboard | admin | GET /dashboard | 200 |
| Staff xem dashboard | staff | GET /dashboard | 200 |
| Customer xem dashboard | customer | GET /dashboard | 403 |
| No token xem dashboard | none | GET /dashboard | 401 |

---

## 🚨 Các lỗi thường gặp

### **404 Not Found**
- CustomersModule chưa được import vào AppModule
- Route sai path

### **401 Unauthorized**
- Thiếu token
- Token không hợp lệ/expired

### **403 Forbidden**
- User đã authenticated nhưng không có quyền truy cập endpoint/role

### **500 Internal Server Error**
- Database connection issues
- Foreign key constraints

---

## 🔧 Tips

1. **Luôn đặt token trong header:**
   ```
   Authorization: Bearer <your_token>
   ```

2. **Test với Postman/Insomnia:**
   - Tạo collection riêng cho mỗi role (Admin, Staff, Customer)
   - Sử dụng environment variables cho tokens

3. **Chạy e2e tests (nếu có):**
   ```bash
   npm run test:e2e
   ```

4. **Kiểm tra logs:**
   - Console logs sẽ hiển thị trong terminal
   - `PAYLOAD:` log trong JWTStrategy

---

## 📝 Ghi chú

- **User ↔ Staff**: User có role 'staff' có thể có 1 Staff record liên kết qua `users_id`
- **User ↔ Customer**: User có role 'customer' có thể có 1 Customer record liên kết qua `users_id`
- **Staff ↔ Appointment**: Appointment có `staff_id` tham chiếu đến Staff
- **Customer ↔ Appointment**: Appointment có `customer_id` tham chiếu đến User

---

**Chúc bạn test vui vẻ!** 🎉
