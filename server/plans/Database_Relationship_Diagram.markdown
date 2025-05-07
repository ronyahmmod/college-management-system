```mermaid
erDiagram
    PreStudent ||--o{ Application : applies
    Student ||--o{ Payment : makes
    Student ||--o{ Result : has
    Student ||--o{ FeeWaiver : receives
    Application ||--o{ Document : contains
    Application ||--o{ Payment : has
    Application ||--o{ ActionLog : tracked_by
    Department ||--o{ Subject : offers
    Department ||--o{ Student : enrolls
    Department ||--o{ PreStudent : applies_to
    Subject ||--o{ Result : evaluated_in
    FeeCategory ||--o{ Payment : categorized_by
    FeeCategory ||--o{ FeeWaiver : discounted_by
    Admin ||--o{ ActionLog : performs
    Admin ||--o{ FeeWaiver : approves

    PreStudent {
        ObjectId _id
        String name
        String email
        String phone
        ObjectId appliedDepartment
        String status
        Date createdAt
    }

    Student {
        ObjectId _id
        String studentId
        String rollNumber
        String name
        String email
        String phone
        ObjectId department
        ObjectId[] subjects
        Date admissionDate
        Boolean idCardIssued
        Boolean libraryCardIssued
        String status
        String academicYear
        Date createdAt
    }

    Application {
        ObjectId _id
        ObjectId preStudent
        ObjectId applicationFee
        String status
        String remarks
        Date submittedAt
        Date updatedAt
    }

    Document {
        ObjectId _id
        ObjectId application
        String type
        String url
        Date uploadedAt
    }

    Payment {
        ObjectId _id
        ObjectId student
        ObjectId application
        ObjectId feeCategory
        Number amount
        String type
        String transactionId
        String paymentMethod
        String status
        String academicYear
        Date paymentDate
    }

    FeeCategory {
        ObjectId _id
        String name
        String type
        Number amount
        String academicYear
        Date createdAt
    }

    FeeWaiver {
        ObjectId _id
        ObjectId student
        ObjectId feeCategory
        Number amount
        String reason
        ObjectId approvedBy
        Date createdAt
    }

    ActionLog {
        ObjectId _id
        ObjectId admin
        ObjectId application
        String action
        String details
        Date createdAt
    }

    Department {
        ObjectId _id
        String name
        String code
        Date createdAt
    }

    Subject {
        ObjectId _id
        String name
        String code
        ObjectId department
        Object[] papers
        Date createdAt
    }

    Result {
        ObjectId _id
        ObjectId student
        ObjectId subject
        String academicYear
        String examType
        Object[] papers
        Number totalMarks
        String grade
        Date createdAt
    }

    Admin {
        ObjectId _id
        String name
        String email
        String password
        String role
        Date createdAt
    }
```

### ব্যাখ্যা
- **PreStudent**:
  - `appliedDepartment` ফিল্ডের মাধ্যমে `Department`-এর সাথে সম্পর্ক।
  - একজন `PreStudent` একাধিক `Application` তৈরি করতে পারে।
- **Student**:
  - `department` ফিল্ডের মাধ্যমে `Department`-এর সাথে সম্পর্ক।
  - `subjects` ফিল্ডের মাধ্যমে একাধিক `Subject`-এর সাথে সম্পর্ক।
  - একজন `Student` একাধিক `Payment`, `Result`, এবং `FeeWaiver` থাকতে পারে।
- **Application**:
  - `preStudent` ফিল্ডের মাধ্যমে `PreStudent`-এর সাথে সম্পর্ক।
  - `applicationFee` ফিল্ডের মাধ্যমে `Payment`-এর সাথে সম্পর্ক।
  - একটি `Application` একাধিক `Document` এবং `ActionLog` থাকতে পারে।
- **Document**:
  - `application` ফিল্ডের মাধ্যমে `Application`-এর সাথে সম্পর্ক।
- **Payment**:
  - `student` ফিল্ডের মাধ্যমে `Student`-এর সাথে সম্পর্ক।
  - `application` ফিল্ডের মাধ্যমে `Application`-এর সাথে সম্পর্ক (ঐচ্ছিক)।
  - `feeCategory` ফিল্ডের মাধ্যমে `FeeCategory`-এর সাথে সম্পর্ক।
- **FeeCategory**:
  - একাধিক `Payment` এবং `FeeWaiver` এর সাথে সম্পর্ক।
- **FeeWaiver**:
  - `student` ফিল্ডের মাধ্যমে `Student`-এর সাথে সম্পর্ক।
  - `feeCategory` ফিল্ডের মাধ্যমে `FeeCategory`-এর সাথে সম্পর্ক।
  - `approvedBy` ফিল্ডের মাধ্যমে `Admin`-এর সাথে সম্পর্ক।
- **ActionLog**:
  - `admin` ফিল্ডের মাধ্যমে `Admin`-এর সাথে সম্পর্ক।
  - `application` ফিল্ডের মাধ্যমে `Application`-এর সাথে সম্পর্ক।
- **Department**:
  - একাধিক `Subject`, `Student`, এবং `PreStudent` এর সাথে সম্পর্ক।
- **Subject**:
  - `department` ফিল্ডের মাধ্যমে `Department`-এর সাথে সম্পর্ক।
  - একাধিক `Result` এর সাথে সম্পর্ক।
- **Result**:
  - `student` ফিল্ডের মাধ্যমে `Student`-এর সাথে সম্পর্ক।
  - `subject` ফিল্ডের মাধ্যমে `Subject`-এর সাথে সম্পর্ক।
- **Admin**:
  - একাধিক `ActionLog` এবং `FeeWaiver` এর সাথে সম্পর্ক।

**নোট**: `Admin` মডেলটি এখনো আমরা তৈরি করিনি, কিন্তু ডায়াগ্রামে ভবিষ্যৎ ইন্টিগ্রেশনের জন্য যোগ করা হয়েছে।