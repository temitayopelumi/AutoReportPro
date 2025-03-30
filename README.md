# AutoReportPro: AI-Powered Data Analysis

AutoReportPro is a web application that leverages the power of OpenAI's GPT-4o to automate data analysis. Users provide a URL (currently mock data is used), and the application returns a comprehensive analysis including summaries, recommended charts, and key insights.

## Features

-   **Automated Data Analysis:** Uses AI to analyze data and provide meaningful results.
-   **Data Summaries:** Generates concise summaries of the provided data.
-   **Recommended Charts:** Suggests optimal visualizations for the data.
-   **Insight Extraction:** Identifies trends, anomalies, and key patterns.
-   **User-Friendly Interface:** Simple and intuitive web interface.
-   **JSON Output:** Displays the raw JSON output from the AI for transparency.

## Getting Started

1.  **Clone the Repository:**

    ```bash
    git clone [Your GitHub Repository Link]
    cd AutoReportPro
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**

    -   Create a `.env.local` file in the root directory.
    -   Add your OpenAI API key:

        ```
        OPENAI_API_KEY=your_openai_api_key
        ```

4.  **Run the Application:**

    ```bash
    npm run dev
    ```

    Open your browser and navigate to `http://localhost:3000`.

## Usage

1.  Enter a URL in the input field. (Currently mock data is used)
2.  Click the "Analyze Data" button.
3.  View the generated summary, recommended charts, and insights.

## Technology Stack

-   **Frontend:** React.js, Next.js
-   **Backend:** Node.js, Next.js API Routes
-   **Data Fetching:** axios
-   **AI:** OpenAI API (GPT-4o)
-   **Data Format:** JSON

## Future Enhancements

-   **Direct URL Data Fetching:** Implement functionality to fetch data directly from provided URLs.
-   **Expanded Data Format Support:** Add support for CSV, Excel, and other data formats.
-   **Interactive Chart Rendering:** Render charts directly within the application.
-   **Advanced Chart Customization:** Allow users to customize generated charts.
-   **Data Export:** Enable users to export analysis results.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bug fixes or feature requests.

## License

This project is licensed under the [Your License] License.