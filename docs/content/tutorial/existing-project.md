+++
title = "Forecasting an existing project"
banner = "img/banners/tutorial-list-existing-project.jpg"
type = "tutorial"
+++

This tutorial guides you on how to use your existing planning application to create forecast with PaceMaker. Through an Excel spreadsheet, you can export your work items and load them into PaceMaker to create your forecasts.

 <!--more--> 

## Extracting your data

Start by exporting your work items (e.g stories, features, requests, bugs, etc) from your planning application into an Excel spreadsheet. PaceMaker requires that you export at least the start and end date columns of your work items. You can add additional columns between the start and end columns if you want to generate additional forecasts.

In the following image, we see that the spreadsheet has 8 columns. The first 7 columns contains dates while the last one points to the type of work item.

![Throughput frequency](/img/tutorials/ep-excel-example.png)

PaceMaker does not differentiate between the types of each column. At this time, it reads all of the columns and let's you pick the right one for the forecasts to be correctly generated.

To get you going, here is a sample Excel 2010 file if you want to copy/paste your export into this file. 
[Sample Excel file](/sample/Excel_2010SampleSheet.xlsx)

## Loading your data

Once your data has been exported from your planning tool, you can load it into PaceMaker. To do so, click on the 'Select an Excel file' button. It will pop up a dialog window where you choose your Excel spreadsheet. 

![Load Excel file](/img/tutorials/ep-load-excel.png)

Once loaded, you will see your file being shown on the right of the button.

![Load Excel file](/img/tutorials/ep-load-excel-done.png)

## Choosing your columns

By loading your Excel spreadsheet, PaceMaker puts the title of your columns into two drop downs named **Start column** and **End column**. 

![Start and end columns](/img/tutorials/ep-columns.png)

For example, using the sample Spreadsheet provided in this tutorial, you can pick **Staging** as your start column and **Done** as your end column. 

## Creating the forecasts

Finally, click the green **Create forecasts** button to generate your forecasts. PaceMaker will read through every line of your spreadsheet  

![Create the forecasts](/img/tutorials/create-forecasts-btn.png)

Your forecasts are generated instantly below in the result panel. 

It is now time to [read the generated forecasts tutorial](/tutorial/understand-forecasts/) to understand them.
