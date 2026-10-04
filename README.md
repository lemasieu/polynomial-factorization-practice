# Polynomial Factorization Practice

An interactive web application designed for 8th-grade students to master polynomial factorization through 8 different problem types. It generates random problems, accepts equivalent answer forms using algebraic expression comparison, and provides instant feedback with simplified solutions.

## 🚀 Live Demo

Check out the live demo: [https://www.sieu.io.vn/github/polynomial-factorization-practice](https://www.sieu.io.vn/github/polynomial-factorization-practice)

## ✨ Features

- **8 Problem Types** – Common factor extraction, square of sum/difference, difference of squares, cube of sum/difference, sum/difference of cubes, grouping terms, quadratic trinomials (including `a ≠ 1`), and combined methods.
- **Random Problem Generation** – Each refresh generates a new set of problems – no repetition. Identity problems (square, cube, difference of squares, sum/diff of cubes) appear only **20%** of the time.
- **Smart Answer Checking** – Uses the `algebra.js` library to compare algebraic expressions, accepting equivalent forms (with/without spaces, different term order).
- **Simplified Answers** – Answers are automatically simplified. For example, `(3x-3)^2` is displayed as `9(x-1)^2`.
- **Virtual Keyboard** – Quick input for special characters like `^`, `*`, parentheses, and variables.
- **Progress Tracking** – Displays correct answers count and percentage score.
- **Responsive Design** – Works seamlessly on both desktop and mobile devices.

## 📚 Problem Types

| # | Problem Type | Example |
|---|--------------|---------|
| 1 | Common Factor Extraction | `3x² + 6x = 3x(x + 2)` |
| 2 | Square of Sum/Difference | `4x² + 12x + 9 = (2x + 3)²` |
| 3 | Difference of Squares | `9x² - 16 = (3x - 4)(3x + 4)` |
| 4 | Cube of Sum/Difference | `8x³ - 36x² + 54x - 27 = (2x - 3)³` |
| 5 | Sum/Difference of Cubes | `8x³ + 27 = (2x + 3)(4x² - 6x + 9)` |
| 6 | Grouping Terms | `x² + xy + x + y = (x + 1)(x + y)` |
| 7 | Quadratic Trinomial (including `a ≠ 1`) | `6x² + 13x + 6 = (2x + 3)(3x + 2)` |
| 8 | Combined Methods | `2x² - 18 = 2(x - 3)(x + 3)` |

> **Note:** The application generates only **factorization problems** (polynomial → product), not the reverse direction. All answers are presented in their simplest form (e.g., `9(x-1)^2` instead of `(3x-3)^2`).

## 🛠️ Technologies Used

- **HTML5** – Structure
- **CSS3** – Modern design with CSS variables and responsive layout
- **JavaScript (Vanilla)** – Core logic and interactivity
- **algebra.js** – Mathematical library for algebraic expression comparison

## 📁 Project Structure

```
polynomial-factorization-practice/
├── index.html                        # Main page
├── style.css                         # Styles and responsive design
├── script.js                         # Core logic (problem generation, grading)
└── README.md                         # Documentation
```

## 🔧 Installation & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/lemasieu/polynomial-factorization-practice.git
   ```
2. **Navigate to the project folder**   
   ```bash
   cd polynomial-factorization-practice
   ```
3. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local development server (e.g., Live Server in VS Code)

## 📝 How It Works

1. **View the Problem** – A polynomial will be displayed in expanded form.
2. **Enter Your Answer** – Type the factored form (product form) into the input field.
   - Use `^` for exponents (e.g., `x^2`)
   - Use `*` for multiplication (e.g., `(x+1)*(x+2)`) or write directly `(x+1)(x+2)`
   - Spaces are optional
3. **Check** – Click "Kiểm tra" (Check) or press Enter to see the result.
4. **View Solution** – If incorrect, the correct answer will be displayed.
5. **Next Problem** – Click "Câu tiếp ▶" (Next) to move to the next problem.

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request or open an Issue.
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open-source and available under the MIT License.

## 🙏 Acknowledgments
[algebra.js](https://algebra.js.org/) – Powerful mathematical library
Open source community and students who provided feedback
