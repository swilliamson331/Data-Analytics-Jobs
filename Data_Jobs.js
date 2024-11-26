// Build the metadata panel
function buildMetadata(sample) {
  d3.csv("CSV Files/Salaries_with_job_categories_and_regions_cleaned_refined.csv").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let filteredMetadata = metadata.filter(obj => obj.id == sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    let metadataPanel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    metadataPanel.html("");   

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    filteredMetadata.forEach(item => {
      Object.entries(item).forEach(([key, value]) => {
        let listItem = metadataPanel.append("li");
        listItem.text(`${key}: ${value}`);
      });
    });
  });
}

// function to build charts
d3.csv("CSV Files/Clean_Data_Jobs.csv").then(function(data) {
  // Group data by year and job category
  let groupedData = {};
  data.forEach(d => {
    if (!groupedData[d.work_year]) {
      groupedData[d.work_year] = {};
    }
    if (!groupedData[d.work_year][d.Job_Category]) {
      groupedData[d.work_year][d.Job_Category] = [];
    }
    groupedData[d.work_year][d.Job_Category].push(d.salary);
  });

  // Calculate average salary for each year and job category
  let averageSalaries = {};
  for (const year in groupedData) {
    for (const jobCategory in groupedData[year]) {
      const salaries = groupedData[year][jobCategory];
      const averageSalary = d3.mean(salaries);
      averageSalaries[year] = averageSalaries[year] || {};
      averageSalaries[year][jobCategory] = averageSalary;
    }
  }

  // Prepare data for Plotly
  let traces = [];
  for (const jobCategory in averageSalaries[Object.keys(averageSalaries)[0]]) {
    const traceData = {
      x: Object.keys(averageSalaries),
      y: Object.keys(averageSalaries).map(year => averageSalaries[year][jobCategory]),
      type: 'scatter',
      mode: 'lines+markers',
      name: jobCategory
    };
    traces.push(traceData);
  }

  var layout = {
    title: 'Average Salary by Job Category Over Years',
    xaxis: {
      title: 'Year',
      tickvals: [2020, 2021, 2022, 2023, 2024], 
      ticktext: ['2020', '2021', '2022', '2023', '2024']
    },
    yaxis: {
      title: 'Average Salary (USD)'
    }
  };

  console.log(traces);
  console.log(layout);

  Plotly.newPlot('line', traces, layout);
    
// Bubble Plot HERE:

const bubbleData = {};
data.forEach(d => {
  if (!bubbleData[d.experience_level]) {
    bubbleData[d.experience_level] = {};
  }
  if (!bubbleData[d.experience_level][d.Job_Category]) {
    bubbleData[d.experience_level][d.Job_Category] = {
      count: 0,
      salaries: []
    };
  }
  bubbleData[d.experience_level][d.Job_Category].count++;
  bubbleData[d.experience_level][d.Job_Category].salaries.push(+d.salary); 
});

const experienceLevels = ['Entry', 'Mid', 'Senior', 'Executive'];


// Calculate average salary for each group
const bubbleTraces = [];
experienceLevels.forEach(expLevel => {
  for (const jobCategory in bubbleData[expLevel]) {
    const count = bubbleData[expLevel][jobCategory].count;
    const avgSalary = d3.mean(bubbleData[expLevel][jobCategory].salaries);
    bubbleTraces.push({
      x: [expLevel],
      y: [avgSalary],
      mode: 'markers',
      marker: {
        size: count * .05,
        color: getColor(jobCategory),
        opacity: 0.7
      },
      name: jobCategory
    });
  }
});


// Function to get color based on job category
function getColor(jobCategory) {
  const colors = {
    "Machine Learning Engineer": 'purple',
    "Data Engineer": 'blue',
    "Data Analyst": 'orange',
    "Data Scientist": 'green',
    "Research Scientist": 'brown',
    "Data Management": 'pink',
    "Other": 'red',
  };
  return colors[jobCategory] || 'grey';
}

const bubbleLayout = {
  title: 'Average Salary by Experience Level and Job Category',
  xaxis: {
    title: 'Experience Level'
  },
  yaxis: {
    title: 'Average Salary (USD)'
  }
};

Plotly.newPlot('bubble', bubbleTraces, bubbleLayout);

// ADD HEATMEAP HERE
function updateHeatmap(workplaceType) {
  const filteredData = data.filter(d => d.workplace_type === workplaceType || workplaceType === 'all');

  const jobCategories = [];
  const experienceLevels = ['Entry', 'Mid', 'Senior', 'Executive'];

  filteredData.forEach(d => {
    if (!jobCategories.includes(d.Job_Category)) {
      jobCategories.push(d.Job_Category);
    }
  });

  const heatmapMatrix = [];
  jobCategories.forEach((jobCategory, y) => {
    const row = [];
    experienceLevels.forEach((expLevel, x) => {
      const filteredForAvg = filteredData.filter(d => 
        d.Job_Category === jobCategory && d.experience_level === expLevel
      );
      const avgSalary = filteredForAvg.length > 0 ? d3.mean(filteredForAvg.map(d => d.salary)) : 0;
      row.push(avgSalary);
    });
    heatmapMatrix.push(row);
  });

  const heatmapTrace = {
    z: heatmapMatrix,
    x: experienceLevels,
    y: jobCategories,
    type: 'heatmap',
    colorscale: 'hot',
    colorbar: {
      title: 'Average Salary (USD)'
    }
  };

  const heatmapLayout = {
    title: 'Average Salary by Job Category and Experience Level',
    xaxis: {
      title: 'Experience Level'
    },
    yaxis: {
      title: 'Job Category',
      tickangle: -60
    }
  };

  Plotly.newPlot('heatmap', [heatmapTrace], heatmapLayout);
}

// Initial heatmap
updateHeatmap('all');

// Event listener for the dropdown
document.getElementById('workplaceTypeFilter').addEventListener('change', () => {
  const selectedType = document.getElementById('workplaceTypeFilter').value;
  updateHeatmap(selectedType);
});
});


    //OLD GRAPHS FROM PROJECT FOR REFERENCE
//     let Colorscale = 'Viridis';

//     let min_value = Math.min(...sample_values);
//     let max_value = Math.max(...sample_values);
//     let desired_size = 3000; 
//     let scaled_sample_values = sample_values.map(value => (value - min_value) / (max_value - min_value) * desired_size);

//     let bubbleTrace = {
//       x: otu_ids,
//       y: sample_values,
//       mode: 'markers',
//       marker: {
//         size: scaled_sample_values,
//         color: otu_ids,
//         colorscale: Colorscale,
//         sizemode: 'area',
//         text: otu_labels
//       }
//     }

//     let bubblelayout = {title: "Bacteria Cultures Per Sample", 
//       xaxis: {title: 'OTU ID'},
//       yaxis: {title: 'Number of Bacteria'}
//     };

//     let bubbleData = [bubbleTrace];

//     // Render the Bubble Chart
//     Plotly.newPlot('bubble', bubbleData, bubblelayout);

//     // For the Bar Chart, map the otu_ids to a list of strings for your yticks
//     let otu_labels_bar = otu_ids.map(id => `OTU ${id}`);

//     // Build a Bar Chart
//     // Don't forget to slice and reverse the input data appropriately
//     let barTrace = {
//       x: sample_values.slice(0, 10).reverse(),
//       y: otu_labels_bar.slice(0, 10).reverse(),
//       type: 'bar',
//       orientation: 'h',
//       text: otu_labels_bar.slice(0, 10).reverse()
//     };

//     let barlayout = {title: "Top 10 Bacteria Cultures Found",
//       xaxis: {title: 'Number of Bacteria'}};

//     let barData = [barTrace];

//     // Render the Bar Chart
//     Plotly.newPlot('bar', barData, barlayout);

//   });
// }

// END OF OLD GRAPHS



// OLD CODE FOR REFERENCE ON PAGE LOAD

// // Function to run on page load
// function init() {
//   d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

//     // Get the names field
//     let names = data.names;

//     // Use d3 to select the dropdown with id of `#selDataset`
//     let dropdown = d3.select("#selDataset");

//     // Use the list of sample names to populate the select options
//     // Hint: Inside a loop, you will need to use d3 to append a new
//     // option for each sample name.
//     names.forEach(name => {dropdown.append('option').text(name).attr('value', name);});

//     // Get the first sample from the list
//     let newSample = names[0];

//     // Build charts and metadata panel with the first sample
//     buildCharts(newSample);
//   });
// }

// // Function for event listener
// function optionChanged(newSample) {
//   // Build charts and metadata panel each time a new sample is selected
//   buildCharts(newSample);
//   buildMetadata(newSample)
// }

// // Initialize the dashboard
// init()
