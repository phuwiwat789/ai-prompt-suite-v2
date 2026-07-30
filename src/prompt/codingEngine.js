// src/prompt/codingEngine.js

export function generateCodingPrompt(langKey, inputs) {
    const { codeStyle, includeTests, isCompliance } = inputs;
    const complianceRule = isCompliance ? "\n- Security Mandate: Ensure strict protection against injection, data leaks, and insecure dependencies." : "";
    const testingRule = includeTests ? "\n- Unit Tests Requirement: Include comprehensive unit tests covering edge cases." : "";

    switch (langKey) {
        case "html":
            return `### SENIOR HTML5 ARCHITECT PROMPT ###
Role: Principal Front-End Developer & Accessibility (A11y) Expert.
Objective: Build a fully compliant, production-ready HTML5 structure.

Requirements:
- Target Feature: ${inputs.featureRequirement || "Responsive Component"}
- Styling Approach: ${inputs.frameworkOrCss || "Tailwind CSS"}
- Accessibility Level: ${inputs.accessibilityLevel || "WCAG 2.1 AA Compliant"}

Output Instructions:
1. Use semantic HTML5 elements (<header>, <nav>, <main>, <section>, <article>, <footer>).
2. Ensure full keyboard navigation and correct ARIA roles/attributes.
3. Clean, well-indented code block without placeholder omissions.${complianceRule}${testingRule}`;

        case "css":
            return `### SENIOR CSS & UI ARCHITECT PROMPT ###
Role: Staff CSS & Motion Design Specialist.
Objective: Write modern, responsive, and performant CSS/Tailwind code.

Requirements:
- Layout Technique: ${inputs.layoutStyle || "Flexbox & CSS Grid"}
- Target Component: ${inputs.targetComponents || "Responsive Dashboard Cards"}
- Animation & Effects: ${inputs.animationDetails || "Smooth transitions & micro-interactions"}

Output Instructions:
1. Mobile-first responsive design principles.
2. Use CSS Variables or clean utility classes.
3. High performance rendering (minimize layout thrashing).${complianceRule}`;

        case "javascript":
            return `### SENIOR JAVASCRIPT ENGINEER PROMPT ###
Role: Principal Modern JavaScript (ES6+) Engineer.
Objective: Develop modular, scalable, and maintainable JavaScript code.

Requirements:
- Feature Task: ${inputs.featureRequirement || "Async Data Fetching & DOM Rendering"}
- Async Strategy: ${inputs.asyncHandling || "Async/Await with Fetch API"}
- Error Handling: ${inputs.errorManagement || "Try/Catch with User Notifications"}

Output Instructions:
1. Write pure ES6+ (Arrow functions, Destructuring, Modules).
2. Clean DOM manipulation with zero memory leaks.
3. Include inline documentation (JSDoc format).${complianceRule}${testingRule}`;

        case "python":
            return `### SENIOR PYTHON DEVELOPER PROMPT ###
Role: Lead Python Architect & Backend Engineer.
Objective: Write PEP 8 compliant, Pythonic, and highly readable code.

Requirements:
- Task Goal: ${inputs.taskGoal || "REST API Endpoint or Data Processing"}
- Architecture/Pattern: ${inputs.architecturePattern || "Modular / Clean Architecture"}
- Python Standard: ${inputs.pythonVersion || "Python 3.12+"}

Output Instructions:
1. Enforce strict Type Hints (typing module / Pydantic).
2. Comprehensive exception handling and logging.
3. Optimized algorithms with efficient memory complexity.${complianceRule}${testingRule}`;

        case "php":
            return `### SENIOR PHP 8+ ARCHITECT PROMPT ###
Role: Enterprise PHP Backend Specialist.
Objective: Develop secure, object-oriented PHP 8.x code.

Requirements:
- Feature Requirement: ${inputs.featureRequirement || "Secure Authentication & CRUD"}
- Security Protocol: ${inputs.securityRules || "PDO Prepared Statements, CSRF Protection, XSS Sanitization"}
- DB Handling: ${inputs.databaseHandling || "PDO Connection Class"}

Output Instructions:
1. Utilize modern PHP 8+ features (Typed properties, Match expressions, Named arguments).
2. Strict adherence to PSR-12 coding standards.
3. Zero vulnerability guarantee against SQL Injection and XSS.${complianceRule}${testingRule}`;

        case "flutter":
            return `### SENIOR FLUTTER / DART ENGINEER PROMPT ###
Role: Principal Mobile App Architect (Flutter & Dart).
Objective: Build a high-performance, cross-platform Flutter component.

Requirements:
- Widget Task: ${inputs.widgetRequirement || "Custom Animated ListView Component"}
- State Management: ${inputs.stateManagement || "Riverpod / Bloc / Provider"}
- Layer Architecture: ${inputs.architectureLayer || "Clean Architecture (Data, Domain, Presentation)"}

Output Instructions:
1. Separate UI components into reusable, const-optimized Widgets.
2. Smooth 60fps performance with efficient state updates.
3. Responsive UI supporting both iOS and Android.${complianceRule}${testingRule}`;

        case "react":
            return `### SENIOR REACT ARCHITECT PROMPT ###
Role: Lead React & Front-End Specialist.
Objective: Write modern, functional React components with optimal rendering.

Requirements:
- Component Task: ${inputs.componentTask || "Interactive Data Grid Component"}
- State Strategy: ${inputs.stateStrategy || "React Context / Zustand / Redux Toolkit"}
- Styling Approach: ${inputs.stylingMethod || "Tailwind CSS"}

Output Instructions:
1. Write 100% Functional Components with modern Hooks.
2. Optimize re-renders using useMemo, useCallback, and React.memo where appropriate.
3. Proper TypeScript interface/props definitions or prop-types validation.${complianceRule}${testingRule}`;

        default:
            return `Act as a Senior Software Engineer. Write clean, production-ready code for language: ${langKey}.`;
    }
}
