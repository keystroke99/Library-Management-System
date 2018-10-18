# Library-Management-System
Library Management System (FrontEnd + Backend)
```
STACK USED:
Front-End : Angular 6
Back-End : NodeJS + Express Framework
Database : MongoDB
IDE : Visual Studio Code
Version Management: GIT
API Management Tool : POSTMAN
```

# run backedn application
=> Navigate to backEnd folder and run below command
```
npm start
```

# run frontEnd application
=> Navigate to frontEnd folder and run below command
```
ng serve
```

# GITHUB URL : https://github.com/keystroke99/Library-Management-System.git
# POSTMAN COLLECTIONS LINK : 
# SAMPLE BOOK DATA TAKE FROM AMAZON BOOK STORE
# USER MODEL:
```
var UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    password: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});
```
# BOOKS MODEL
```
var BookSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: String,
    quantity: String,
    isbn: String,
    publisher: String,
    publishedYear: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});
```
