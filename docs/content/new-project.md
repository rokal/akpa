+++
title = "Forecasting a new project"
+++

This tutorial guides you on how to use PaceMaker to forecasts potential delivery dates as well as the potential number of features.

## Configurating your forecasts

Our first step is to tell PaceMaker at what rate your teams will deliver features. Some teams will go at a weekly pace while other teams  You have three options:

![Throughput frequency](/img/throughput-frequency.png)

* **Week**: Your team works on user stories or requirements that usually take a few days to complete.
* **Day**: Your features are mainly bug fixes or small demands that are resolved within a few hours.
* **Hour**: This setting is not supported yet 

Once we've set a what pace (or throughput) our team will deliver features, we have to define how many of them. PaceMaker asks us to define the minimum and maximum number of features that can be done in an mount of time.

For example, let's say we have a maintenance team getting their requests from JIRA. It takes about a day or two to open, fix and deploy the requests from their differents customers. We've picked *Week* from our previous dropdown menu.

We now have to estimate the minimum and maximum number of requests that will be completed by our team. To play it safe, let's say our team can deploy a minimum of 0 requests per week.

![Throughput frequency](/img/minimum-features.png)

And we know that on some week, the team will go quite fast so we set the maximum number of features to 5.

![Throughput frequency](/img/maximum-features.png)

It is now time to [read the generated forecasts](/understand-forecasts/).


