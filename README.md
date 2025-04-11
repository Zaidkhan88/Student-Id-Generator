A web application built using ReactJS that allows students to generate their smart ID cards with features like photo upload, QR code generation, data preview, and template switching. This project was built as part of Unity's internship assignment.
Features:
- 📄 Student Form with:
  - Name, Roll Number, Class & Division (dropdown)
  - Allergies (multi-select)
  - Rack Number, Bus Route (dropdown)
  - Photo Upload (with preview)

- 🆔 ID Card Preview
  - Dynamic info display
  - QR Code (with JSON student data)
  - Download as PNG (using html-to-image)

- 🎨 Template Switcher
  - Switch between two card design layouts

- 💾 Persistent Storage *(Bonus)*
  - Data saved in localStorage
  - View/download old cards

Tech Used:
- ReactJS (18+)
- TailwindCSS (for styling)
- [qrcode.react](https://www.npmjs.com/package/qrcode.react)
- [html-to-image](https://www.npmjs.com/package/html-to-image)

Thought Process:
- Broke the project into components: Form, Preview, TemplateSwitcher, etc.
- Managed state using React hooks.
- Used hooks like react-hook-form for better form management
- Focused on clean UX — preview after submission, visual feedback on upload.
- Implemented reusable components and conditionally rendered templates.
- Stored data in MongoDB 

How to Run Locally 
  
1. Clone the repo:
   git clone https://github.com/your-username/Student-Id-Generator.git

2. Navigate to the folder:
   cd student-id-generator

3. Install dependencies:
   npm install

4. connect mongoDB for backend using .env file
   
5. Start the app:
   npm start or be and npm dev for fe 

