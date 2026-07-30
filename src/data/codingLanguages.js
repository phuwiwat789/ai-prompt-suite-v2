// src/data/codingLanguages.js
export const codingLanguagesDB = {
    html: {
        name: "🌐 HTML5 (Semantic & Accessibility)",
        description: "เน้นโครงสร้าง Semantic HTML5, SEO Metadata และมาตรฐาน WAI-ARIA Accessibility",
        fields: ["featureRequirement", "frameworkOrCss", "accessibilityLevel"]
    },
    css: {
        name: "🎨 CSS3 / Tailwind / Animations",
        description: "ออกแบบ Layout (Flexbox/Grid), Responsive Design, CSS Variables และ Keyframe Animations",
        fields: ["layoutStyle", "targetComponents", "animationDetails"]
    },
    javascript: {
        name: "⚡ Modern JavaScript (ES6+)",
        description: "เขียน ES6+ Vanilla JS, DOM Manipulation, Async/Await Fetch API และ Clean Architecture",
        fields: ["featureRequirement", "asyncHandling", "errorManagement"]
    },
    python: {
        name: "🐍 Python (Clean Code & Scripting)",
        description: "เน้นมาตรฐาน PEP 8, Type Hints, Exception Handling, API (FastAPI/Flask) หรือ Automation",
        fields: ["taskGoal", "architecturePattern", "pythonVersion"]
    },
    php: {
        name: "🐘 Modern PHP (8.x & OOP)",
        description: "เน้น OOP Design Patterns, Security (Prepared Statements/PDO, CSRF, XSS) และ Clean Code",
        fields: ["featureRequirement", "securityRules", "databaseHandling"]
    },
    flutter: {
        name: "📱 Flutter & Dart (Cross-Platform)",
        description: "เน้นการสร้าง UI Widget, State Management (Provider/Riverpod/Bloc) และ Clean Architecture",
        fields: ["widgetRequirement", "stateManagement", "architectureLayer"]
    },
    react: {
        name: "⚛️ React (Hooks & Functional Components)",
        description: "เน้น Modern Functional Components, Custom Hooks, Performance Optimization (useMemo/useCallback)",
        fields: ["componentTask", "stateStrategy", "stylingMethod"]
    }
};