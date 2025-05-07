# College Management System Plan

## Overview
The **College Management System** is a web-based application designed to streamline the admission process, student management, fee collection, and result processing for educational institutions. The system aims to provide a digital, transparent, and efficient platform for students, administrators, and faculty.

## Objectives
- Automate the admission process with online application submission, document verification, and payment integration.
- Manage student records, including academic details, fees, and results.
- Provide a user-friendly interface for students to track application status and receive notifications.
- Ensure scalability, security, and maintainability through modular design and centralized constants.

## System Architecture
- **Frontend**: React with Tailwind CSS for responsive and modern UI.
- **Backend**: Node.js with Express.js for RESTful APIs.
- **Database**: MongoDB with Mongoose for flexible and scalable data storage.
- **File Storage**: Cloudinary for document and image uploads.
- **Payment Gateway**: SSLCommerz for secure payment processing.
- **Notifications**: SMS integration (e.g., SSL Wireless) for real-time updates.

## Database Schema
Below is the current database schema, including models and their key fields:

### PreStudent
- **Purpose**: Stores information for applicants before admission confirmation.
- **Fields**:
  - `name`: String (required)
  - `email`: String (unique, validated)
  - `phone`: String
  - `appliedDepartment`: ObjectId (ref: Department)
  - `status`: String (ACTIVE, INACTIVE)
  - `createdAt`: Date

### Student
- **Purpose**: Stores confirmed students' details.
- **Fields**:
  - `studentId`: String (unique, required)
  - `rollNumber`: String (unique)
  - `name`: String (required)
  - `email`: String (unique, validated)
  - `phone`: String
  - `department`: ObjectId (ref: Department)
  - `subjects`: [ObjectId] (ref: Subject)
  - `admissionDate`: Date (required)
  - `idCardIssued`: Boolean
  - `libraryCardIssued`: Boolean
  - `status`: String (ACTIVE, INACTIVE)
  - `academicYear`: String (required)
  - `createdAt`: Date

### DepartmentHannah:
### Department
- **Purpose**: Stores department information.
- **Fields**:
  - `name`: String (unique, required)
  - `code`: String (unique, required)
  - `createdAt`: Date

### Subject
- **Purpose**: Stores subject details, including papers.
- **Fields**:
  - `name`: String (unique, required)
  - `code`: String (unique, required)
  - `department`: ObjectId (ref: Department)
  - `papers`: [{ name: String, code: String }]
  - `createdAt`: Date

### Result
- **Purpose**: Stores exam results for each subject and paper.
- **Fields**:
  - `student`: ObjectId (ref: Student)
  - `subject`: ObjectId (ref: Subject)
  - `academicYear`: String (required)
  - `examType`: String (midterm, final, quiz, other)
  - `papers`: [{ paperCode: String, marks: Number }]
  - `totalMarks`: Number (required)
  - `grade`: String (A+, A, A-, etc.)
  - `createdAt`: Date

### Application
- **Purpose**: Manages admission applications.
- **Fields**:
  - `preStudent`: ObjectId (ref: PreStudent)
  - `applicationFee`: ObjectId (ref: Payment)
  - `status`: String (PENDING, UNDER_REVIEW, APPROVED, REJECTED, COMPLETED)
  - `remarks`: String
  - `submittedAt`: Date
  - `updatedAt`: Date

### Document
- **Purpose**: Stores uploaded documents.
- **Fields**:
  - `application`: ObjectId (ref: Application)
  - `type`: String (photo, certificate, transcript, other)
  - `url`: String (Cloudinary URL)
  - `uploadedAt`: Date

### Payment
- **Purpose**: Tracks payments for fees.
- **Fields**:
  - `student`: ObjectId (ref: Student)
  - `application`: ObjectId (ref: Application, optional)
  - `feeCategory`: ObjectId (ref: FeeCategory)
  - `amount`: Number (required)
  - `type`: String (APPLICATION_FEE, ADMISSION_FEE, SESSION_CHARGE, DEVELOPMENT_FEE)
  - `transactionId`: String (unique, required)
  - `paymentMethod`: String (bkash, nagad, rocket, bank)
  - `status`: String (PENDING, COMPLETED, FAILED)
  - `academicYear`: String (required)
  - `paymentDate`: Date

### FeeCategory
- **Purpose**: Defines fee types and amounts for specific academic years.
- **Fields**:
  - `name`: String (required)
  - `type`: String (APPLICATION_FEE, ADMISSION_FEE, SESSION_CHARGE, DEVELOPMENT_FEE)
  - `amount`: Number (required)
  - `academicYear`: String (required)
  - `createdAt`: Date

### FeeWaiver
- **Purpose**: Manages fee waivers or discounts.
- **Fields**:
  - `student`: ObjectId (ref: Student)
  - `feeCategory`: ObjectId (ref: FeeCategory)
  - `amount`: Number (required)
  - `reason`: String (required)
  - `approvedBy`: ObjectId (ref: Admin)
  - `createdAt`: Date

### ActionLog
- **Purpose**: Tracks admin actions on applications.
- **Fields**:
  - `admin`: ObjectId (ref: Admin)
  - `application`: ObjectId (ref: Application)
  - `action`: String (reviewed, approved, rejected, commented)
  - `details`: String
  - `createdAt`: Date

## API Endpoints
- **Students**: Create, read, update, delete student records.
- **Applications**: Submit, review, and check status of applications.
- **Documents**: Upload and manage documents.
- **Payments**: Process payments via SSLCommerz.
- **Results**: Post and retrieve exam results.
- **Departments**: Manage department records.
- **Subjects**: Manage subjects and their papers.
- **FeeCategories**: Define and update fee structures.
- **FeeWaivers**: Manage fee waivers.
- **ActionLogs**: Log admin actions.

## Planned Features
1. **Frontend Development**:
   - Application form for students.
   - Profile page for application status and payment history.
   - Admin dashboard for application review and result management.
2. **Authentication**:
   - JWT-based login for students and admins.
   - Role-based access control.
3. **Payment Integration**:
   - Full SSLCommerz integration for secure payments.
   - Support for multiple MFS providers (bkash, nagad, rocket).
4. **Notifications**:
   - SMS notifications for application status updates and payment confirmations.
   - Integration with SMS providers like SSL Wireless.
5. **Result Management**:
   - Automated grade calculation based on paper marks.
   - Result publication and student access.
6. **Reporting**:
   - Generate reports on admissions, payments, and academic performance.
   - Exportable reports in PDF/Excel format.

## Future Enhancements
- Integration with learning management systems (LMS).
- Mobile app for students and admins.
- Advanced analytics for institutional performance.
- Multi-language support for broader accessibility.

## Development Status
- **Completed**:
  - Database schema design for core modules.
  - Backend APIs for students, applications, payments, and results.
  - Centralized constants file for maintainability.
  - Basic server setup with MongoDB and Express.
- **In Progress**:
  - Frontend development with React.
  - SSLCommerz payment integration.
- **Planned**:
  - Authentication and authorization.
  - SMS notification system.
  - Comprehensive testing and deployment.

## Deployment Plan
- **Development**: Local setup with Docker for consistent environments.
- **Testing**: Unit and integration tests using Jest and Postman.
- **Production**: Deploy on AWS/Heroku with MongoDB Atlas and Cloudinary.
- **Monitoring**: Use tools like New Relic for performance monitoring.

## Risks and Mitigation
- **Risk**: Database schema changes causing compatibility issues.
  - **Mitigation**: Versioned schemas and migration scripts.
- **Risk**: Payment gateway failures.
  - **Mitigation**: Robust error handling and retry mechanisms.
- **Risk**: Security vulnerabilities.
  - **Mitigation**: Regular security audits and HTTPS enforcement.

This document will be updated with each major system change to reflect the latest design and implementation details.