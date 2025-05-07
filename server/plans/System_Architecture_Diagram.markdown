```mermaid
graph TD
    A[Client Browser] -->|HTTPS| B[Frontend: React + Tailwind CSS]
    B -->|REST API| C[Backend: Node.js + Express]
    
    C -->|MongoDB Driver| D[MongoDB Database]
    C -->|Cloudinary API| E[Cloudinary: File Storage]
    C -->|SSLCommerz API| F[SSLCommerz: Payment Gateway]
    C -->|SMS API| G[SMS Provider: SSL Wireless]
    
    D -->|Stores| H[Collections: PreStudent, Student, Application, Payment, etc.]
    E -->|Stores| I[Documents: Photos, Certificates]
    F -->|Processes| J[Payments: Application Fee, Admission Fee]
    G -->|Sends| K[SMS Notifications]
    
    subgraph Users
        U1[Students] --> A
        U2[Admins] --> A
    end
```

### ব্যাখ্যা
- **Client Browser**: ব্যবহারকারীরা (শিক্ষার্থী এবং অ্যাডমিন) ব্রাউজার থেকে সিস্টেম অ্যাক্সেস করে।
- **Frontend**: React এবং Tailwind CSS দিয়ে তৈরি UI, যা REST API এর মাধ্যমে ব্যাকএন্ডের সাথে যোগাযোগ করে।
- **Backend**: Node.js এবং Express দিয়ে তৈরি, যা API হ্যান্ডল করে এবং MongoDB, Cloudinary, SSLCommerz, এবং SMS প্রোভাইডারের সাথে ইন্টিগ্রেট করে।
- **MongoDB Database**: সকল ডাটা (PreStudent, Student, Application, ইত্যাদি) সংরক্ষণ করে।
- **Cloudinary**: ডকুমেন্ট এবং ছবি সংরক্ষণ করে।
- **SSLCommerz**: পেমেন্ট প্রক্রিয়া করে।
- **SMS Provider**: শিক্ষার্থীদের নোটিফিকেশন পাঠায়।