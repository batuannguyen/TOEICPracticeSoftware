# TOEICPracticeSoftware
## Bài tập lớn nhập môn công nghệ phần mềm 
#### Các thành viên nhóm 5
* Nguyễn Bá Tuân (lead)
* Nguyễn Văn Quân
* Nguyễn Khắc Hiếu
* Nguyễn Quốc Tiến 


#### Nền tảng, công cụ

Backend:
* NodeJS
* [ExpressJS](https://expressjs.com/)

FrontEnd:
* Template view engine: [Handlebars](https://handlebarsjs.com/)

Cơ sở dữ liệu:
* Hệ quản trị cơ sở dữ liệu: PostgreSQL

 Các thư viện, package hỗ trợ:
* [node-sass](https://www.npmjs.com/package/node-sass): Biên dịch file .scss ra .css
* [pg](https://www.npmjs.com/package/pg): Thao tác , truy vấn đến hệ quản trị CSDL PostgreSQL
* [express-session](https://www.npmjs.com/package/express-session), [passport](https://www.npmjs.com/package/passport), [passport-local](https://www.npmjs.com/package/passport-local): Hỗ trợ xác thực và phân quyền người dùng trong 1 phiên làm việc
* [express-fileupload](https://www.npmjs.com/package/express-fileupload): Tạo chức năng upload file

#### Cấu trúc tổng quan project:
module app xử lý các sự kiện ở phía server, gồm 2 module nhỏ:
* models: Thao tác, truy vấn đến cơ sở dữ liệu
* controllers: Xử lý các sự kiện xảy ra ở trên server\\

module resource xử lý các sự kiện ở bên phía client, gồm có:
* views: chứa các file giao diện dùng để render
* route: định tuyến các trang web mà người dùng truy cập
* client: chứa các mã js dùng để xử lý các sự kiện cục bộ bên phía client
* scss: chứa các file scss dùng để biên dịch ra css

