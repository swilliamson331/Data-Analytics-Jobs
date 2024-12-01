# Data-Analytics-Jobs
Data Analytics Job Market
Overview
This project performs data analysis on the job market for various data analytics-related roles. The analysis focuses on job titles, salaries, experience levels, employment types, and workplace types, using a dataset sourced from Kaggle. The project also includes visualizations to explore trends and insights regarding the data analytics job market.
Participants
•	Anvita Iyer
•	Brian Hester
•	Crystal Gonzales
•	Emeka Osaseh
•	Sam Williamson
Data Source
The dataset used for this analysis was sourced from Kaggle and contains information about job titles, salaries, work locations, and more, specifically related to data analytics roles. The file used is Salaries_with_job_categories.csv.
Files Included
•	Salaries_with_job_categories.csv: Original dataset.
•	Clean_Data_Jobs.csv: A cleaned version of the dataset without salary and salary currency columns.
•	Updated_Clean_Data_Jobs.csv: The final cleaned dataset with country names replacing location codes.
Requirements
The following libraries are required to run the analysis and visualizations:
•	pandas: For data manipulation and analysis.
•	numpy: For numerical operations.
•	scipy: For statistical functions like linear regression.
•	matplotlib: For creating static, animated, and interactive visualizations.
•	seaborn: For making statistical graphics.
•	plotly: For interactive plots.
•	pathlib: For file path handling.
You can install the required libraries using:
bash
Copy code
pip install pandas numpy scipy matplotlib seaborn plotly 
Analysis Steps
1.	Data Loading and Preprocessing:
•	The dataset is loaded from a CSV file and initial exploratory data analysis is performed by displaying the first few rows.
2.	Job Title Categorization:
•	A custom function is used to categorize job titles into broader categories such as "Data Analyst", "Data Engineer", "Data Scientist", "Machine Learning Engineer", and "Research Scientist".
3.	Data Cleaning:
•	Columns like salary and salary_currency are dropped for simplicity.
•	Column names are renamed for better readability.
•	Categorical values like employment_type, workplace_type, and experience_level are mapped to more descriptive labels.
4.	Location Mapping:
•	Location codes (like US, NL, etc.) are replaced with full country names using a country codes CSV.
5.	Data Visualization:
•	Several plots are created to visualize various aspects of the job market:
•	Salary Distribution: Violin plots showing salary distribution by job category and workplace type (remote, in-person, hybrid).
•	Salary Heatmap: A heatmap displaying average salaries by job category and experience level.
•	Salary Trends: Line plots showing salary trends over time.
•	Job Counts: Bar plots showing the number of jobs by location and experience level.
•	Job Category Distribution: Scatter plots and bar charts to show job category distributions by experience level and salary.
Key Insights
•	Salary Trends: The analysis shows how salaries for different job categories have changed over the years, revealing important trends such as increasing demand for Machine Learning Engineers.
•	Experience Level vs. Salary: Senior roles tend to command higher salaries, but the entry-level roles are also competitive, particularly in fields like Data Engineering and Data Science.
•	Workplace Types: Remote and hybrid roles are becoming more common, with remote positions commanding a premium in certain job categories.
Example Visualizations
Salary Distribution by Job Category and Workplace Type:
A violin plot showing the salary distribution for different job categories (e.g., Data Analyst, Data Engineer, etc.) by workplace type (Remote, In-Person, Hybrid).
Heatmap for Salary by Job Category and Experience Level:
A heatmap showing average salaries for different job categories across different experience levels (Entry, Mid, Senior, Executive).
Job Distribution by Location:
Bar charts showing the number of jobs in the top 5 or 10 countries, highlighting locations like the US and others with high job counts.
How to Run
To run the analysis and visualizations:
1.	Clone or download the repository.
2.	Ensure the required libraries are installed.
3.	Place the dataset file Salaries_with_job_categories.csv in the correct directory.
4.	Execute the Python script to load the data, perform analysis, and generate the visualizations.
Future Work
•	Enhancing Data Cleaning: Further refine data preprocessing, such as handling missing values or identifying outliers.
•	Additional Analysis: Analyze trends in job titles or salary variations across other features like company size or location.
•	Prediction Models: Implement machine learning models to predict salaries based on experience, job category, or location.
License
This project is licensed under the MIT License 
